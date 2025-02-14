import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import OAuthPermissionDialog from "../components/auth/OAuthPermissionDialog";
import LoginContainer from "../components/auth/LoginContainer";
import LoginBanner from "../components/auth/LoginBanner";
import OAuthLoginForm from "../components/auth/OAuthLoginForm";
import { parseAuthScope, getScopeList } from "../util/AuthScope";
import { AuthService } from "../services/AuthService";
import { LoginFormData } from "../types/OAuth";
import { DeviceType } from "../types/DeviceType";

const OAuthLoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [showPermissionDialog, setShowPermissionDialog] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const appName = params.get("app_name")?.replace(/^"|"$/g, "");
  const authScopeStr = params.get("auth_scope");
  const redirectUri = params.get("redirect_uri")?.replace(/^"|"$/g, "");
  const appId = params.get("app_id");
  const authScope = params.get("auth_scope");

  useEffect(() => {
    if (!appName || !authScopeStr || !redirectUri || !appId || !authScope) {
      toast.error(
        "인증 정보(AUTH SCOPE)가 올바르지 않습니다.NANU ID 개발 문서를 확인하시기 바랍니다"
      );
      console.error("Missing OAuth parameters:", {
        appName,
        authScopeStr,
        redirectUri,
        appId,
      });
      navigate(-1);
      return;
    }

    const scopeBits = parseAuthScope(authScopeStr);
    if (scopeBits === 0) {
      toast.error("요청된 권한이 없습니다.");
      navigate(-1);
    }
  }, [appName, authScopeStr, redirectUri, appId, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePermissionApprove = () => {
    setShowPermissionDialog(false);
  };

  const handlePinSubmit = async (pin: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!captchaToken) {
        toast.error("리캡챠 인증이 필요합니다.");
        return;
      }

      if (!authScopeStr) {
        toast.error("권한 정보가 없습니다.");
        return;
      }

      const authScope = parseAuthScope(authScopeStr);
      if (authScope === 0) {
        toast.error("유효하지 않은 권한 요청입니다.");
        return;
      }

      const loginData = {
        email: formData.email,
        password: formData.password,
        recaptchaToken: captchaToken,
        pin,
        applicationId: appId!,
        applicationRedirectUri: redirectUri!,
        authScope,
        deviceType: getDeviceType(),
      };

      const response = await AuthService.oauthLogin(loginData);
      toast.success("인증이 완료되었습니다!");

      const redirectURL = new URL(redirectUri!);
      redirectURL.searchParams.append("code", response.code);
      window.location.href = redirectURL.toString();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "인증 중 오류가 발생했습니다."
      );
      toast.error("인증에 실패했습니다. 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const getDeviceType = (): DeviceType => {
    const userAgent = navigator.userAgent;

    if (/Android/i.test(userAgent)) {
      return DeviceType.ANDROID;
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
      return DeviceType.IOS;
    } else if (/Windows NT/i.test(userAgent)) {
      return DeviceType.WINDOWS;
    } else if (/Macintosh/i.test(userAgent)) {
      return DeviceType.MAC;
    } else {
      return DeviceType.WEB_UNKNOWN;
    }
  };

  const handleCaptchaTokenChange = (token: string) => {
    setCaptchaToken(token);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showPermissionDialog ? (
          <motion.div
            key="permission-dialog"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20, transition: { duration: 0.3 } }}
          >
            <OAuthPermissionDialog
              serviceName={appName || "Unknown Service"}
              permissions={
                authScopeStr ? getScopeList(parseAuthScope(authScopeStr)) : []
              }
              onConfirm={handlePermissionApprove}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="absolute inset-0"
          >
            <LoginContainer>
              <LoginBanner />
              <OAuthLoginForm
                onAppLogin={() => {}}
                formData={formData}
                onInputChange={handleInputChange}
                onPinSubmit={handlePinSubmit}
                isLoading={isLoading}
                error={error}
                isPinModalOpen={isPinModalOpen}
                setIsPinModalOpen={setIsPinModalOpen}
                onCaptchaChange={handleCaptchaTokenChange}
              />
            </LoginContainer>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default OAuthLoginPage;
