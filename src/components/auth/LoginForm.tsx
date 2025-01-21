import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthService } from "../../services/AuthService";
import { RequestType } from "../../services/dto/request/RequestType";
import { AuthType } from "../../services/dto/request/AuthType";
import PinAuthModal from "./PinAuthModal";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null); // 리캡챠 토큰 상태 추가

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
        redirectUrl: "/home",
      };

      await AuthService.execute(loginData);
      toast.success("로그인 성공!");
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
        toast.error("리캡챠 만료되었습니다. 다시 시도해주세요.");
        return;
      }

      await AuthService.execute(loginData);
      toast.success("로그인 성공!");
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
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-auto min-w-[280px]">
        <h1 className="text-4xl font-bold mb-8">로그인</h1>
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {error && (
            <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.email}
              onChange={onInputChange}
              disabled={isLoading}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.password}
              onChange={onInputChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={onInputChange}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
                disabled={isLoading}
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-600"
              >
                로그인 정보 저장하기
              </label>
            </div>

            <Link
              to="https://sre.nanu.cc/nanuid/forgetpassword.html"
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <div className="flex justify-between space-x-3 pt-4">
            <button
              type="button"
              onClick={handleAppLogin}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "처리중..." : "APP 간편인증 로그인"}
            </button>
            <button
              type="button"
              onClick={() => setIsPinModalOpen(true)}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={isLoading}
            >
              {isLoading ? "처리중..." : "PIN 인증 로그인"}
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link
            to="/register?from=home"
            className="text-blue-600 hover:underline"
          >
            NANU ID 생성하기
          </Link>
        </div>

        <PinAuthModal
          isOpen={isPinModalOpen}
          onClose={() => setIsPinModalOpen(false)}
          onSubmit={(pin, captchaToken) => handlePinSubmit(pin, captchaToken)}
          onCaptchaChange={handleCaptchaTokenChange} // 리캡챠 토큰 변경시 호출
        />
      </div>
    </div>
  );
};

export default LoginForm;
