import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthType } from "../services/dto/request/AuthType";
import { RequestType } from "../services/dto/request/RequestType";
import { AuthService } from "../services/AuthService";
import OAuthPermissionDialog from "../components/auth/OAuthPermissionDialog";
import LoginContainer from "../components/auth/LoginContainer";
import LoginBanner from "../components/auth/LoginBanner";
import LoginForm from "../components/auth/LoginForm";
import { LoginFormData } from "../types/Auth";
import OAuthLoginForm from "../components/auth/OAuthLoginForm";
import { AnimatePresence, motion } from "framer-motion";

const OAuthLoginPage = () => {
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const appName = params.get("app_name");
  const authScope = params.get("auth_scope");
  const redirectUri = params.get("redirect_uri");
  const appId = params.get("app_id");

  useEffect(() => {
    if (!appName || !authScope || !redirectUri || !appId) {
      alert(
        "[ 서비스 연결 오류 ] 인증 정보가 전달되지 않았습니다. 개발자에게 문의 바랍니다."
      );
      navigate(-1);
    }
  }, [appName, authScope, redirectUri, appId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePermissionApprove = () => {
    setIsTransitioning(true);
    // 슬라이더가 끝까지 간 후에 약간의 지연을 두고 전환
    setTimeout(() => {
      setShowPermissionDialog(false);
    }, 500);
  };
  const handleOAuthLogin = async () => {
    try {
    //   setIsLoading(true);
    //   setError(null);

    //   const loginData = {
    //     email: formData.email,
    //     password: formData.password,
    //     rememberMe: formData.rememberMe,
    //     authType: AuthType.OAUTH,
    //     requestType: RequestType.DASHBOARD,
    //     redirectUrl: redirectUri,
    //   };

    //   await AuthService.oauthLogin(loginData);
    //   toast.success("인증 성공!");
    } catch (err) {
    //   setError(
    //     err instanceof Error ? err.message : "인증 중 오류가 발생했습니다."
    //   );
    //   toast.error("인증 실패! 다시 시도해주세요.");
    // } finally {
    //   setIsLoading(false);
    }
  };

  const handlePinSubmit = async (pin: string, captchaToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      if (!captchaToken) {
        toast.error("리캡챠가 만료되었습니다. 다시 시도해주세요.");
        return;
      }

      const loginData = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        pin,
        recaptchaToken: captchaToken,
        requestType: RequestType.DASHBOARD,
        authType: AuthType.PIN,
        redirectUrl: redirectUri,
      };

      //await AuthService.oauthLogin(loginData);
      toast.success("인증 성공!");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "인증 중 오류가 발생했습니다."
      );
      toast.error("인증 실패! 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaTokenChange = (newToken: string) => {
    setCaptchaToken(newToken);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <AnimatePresence mode="wait">
        {showPermissionDialog ? (
          <motion.div
            key="permission-dialog"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              y: -20,
              transition: { duration: 0.3 }
            }}
          >
            <OAuthPermissionDialog
              serviceName={appName || "Unknown Service"}
              permissions={["이메일", "이름"]}
              onConfirm={handlePermissionApprove}
              isLoading={isLoading}
            />
          </motion.div>
        ) : (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.4,
              ease: "easeOut",
              delay: 0.2
            }}
            className="absolute inset-0"
          >
            <LoginContainer>
              <LoginBanner />
              <OAuthLoginForm
                formData={formData}
                onInputChange={handleInputChange}
                onAppLogin={handleOAuthLogin}
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