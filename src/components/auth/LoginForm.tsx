import React from "react";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import PinAuthModal from "./PinAuthModal";

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAppLogin: () => void;
  onPinSubmit: (pin: string, captchaToken: string) => void;
  isLoading: boolean;
  error: string | null;
  isPinModalOpen: boolean;
  setIsPinModalOpen: (value: boolean) => void;
  onCaptchaChange: (newToken: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  formData,
  onInputChange,
  onAppLogin,
  onPinSubmit,
  isLoading,
  error,
  isPinModalOpen,
  setIsPinModalOpen,
  onCaptchaChange,
}) => {
  const isEmailValid = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(
    formData.email
  );
  const isPasswordValid = formData.password.length >= 8;
  const isFormValid =
    isEmailValid &&
    isPasswordValid &&
    formData.email !== "" &&
    formData.password !== "";

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-auto min-w-[280px]">
        <h1 className="text-4xl font-bold mb-4">
          NANU ID<br />
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-purple-500 to-pink-500 font-bold text-4xl">
            대시보드 로그인
          </span>
        </h1>
        <p className="text-sm text-gray-600 mb-6">
          대시보드에서 로그인 기록 확인 , 회원정보 관리 등을 할 수 있습니다.
        </p>
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
              onClick={onAppLogin}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={isLoading || !isFormValid}
            >
              {isLoading ? "처리중..." : "APP 간편인증 로그인"}
            </button>
            <button
              type="button"
              onClick={() => {
                setIsPinModalOpen(true);
              }}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300"
              disabled={isLoading || !isFormValid}
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
          onSubmit={onPinSubmit}
          onCaptchaChange={onCaptchaChange}
        />
      </div>
    </div>
  );
};

export default LoginForm;
