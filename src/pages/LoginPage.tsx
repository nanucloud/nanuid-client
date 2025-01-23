import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/auth/LoginContainer";
import LoginBanner from "../components/auth/LoginBanner";
import LoginForm from "../components/auth/LoginForm";
import { LoginFormData } from "../types/Auth";
import { toast } from "react-toastify";
import { AuthType } from "../services/dto/request/AuthType";
import { RequestType } from "../services/dto/request/RequestType";
import { AuthService } from "../services/AuthService";

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAppLogin = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const loginData = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        authType: AuthType.APP,
        requestType: RequestType.DASHBOARD,
        redirectUrl: "/app/home",
      };

      await AuthService.execute(loginData);
      toast.success("로그인 성공!");
      navigate("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다."
      );
      toast.error("로그인 실패! 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePinSubmit = async (pin: string, captchaToken: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const loginData = {
        email: formData.email,
        password: formData.password,
        rememberMe: formData.rememberMe,
        pin,
        recaptchaToken: captchaToken,
        requestType: RequestType.DASHBOARD,
        authType: AuthType.PIN,
        redirectUrl: "/home",
      };

      if (!captchaToken) {
        toast.error("리캡챠가 만료되었습니다. 다시 시도해주세요.");
        return;
      }

      await AuthService.execute(loginData);
      toast.success("로그인 성공!");
      navigate("/home");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다."
      );
      toast.error("로그인 실패! 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCaptchaTokenChange = (newToken: string) => {
    setCaptchaToken(newToken);
  };

  return (
    <LoginContainer>
      <LoginBanner />
      <LoginForm
        formData={formData}
        onInputChange={handleInputChange}
        onAppLogin={handleAppLogin}
        onPinSubmit={handlePinSubmit}
        isLoading={isLoading}
        error={error}
        isPinModalOpen={isPinModalOpen}
        setIsPinModalOpen={setIsPinModalOpen}
        onCaptchaChange={handleCaptchaTokenChange}
      />
    </LoginContainer>
  );
};

export default LoginPage;
