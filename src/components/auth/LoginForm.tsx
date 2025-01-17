import React from 'react';
import { Link } from 'react-router-dom';

interface LoginFormProps {
  formData: {
    email: string;
    password: string;
    rememberMe: boolean;
  };
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogin: (type: 'app' | 'pin') => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ formData, onInputChange, onLogin }) => {
  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="w-auto min-w-[280px]">
        <h1 className="text-4xl font-bold mb-8">로그인</h1>
        <form className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.email}
              onChange={onInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-0 py-2 border-b border-gray-300 focus:border-blue-500 focus:outline-none transition-colors"
              value={formData.password}
              onChange={onInputChange}
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
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600">
                로그인 정보 저장하기
              </label>
            </div>

            <Link to="https://sre.nanu.cc/nanuid/forgetpassword.html" className="text-sm text-blue-600 hover:text-blue-800">
              비밀번호를 잊으셨나요?
            </Link>
          </div>

          <div className="flex justify-between space-x-3 pt-4">
            <button
              type="button"
              onClick={() => onLogin('app')}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            >
              APP 간편인증 로그인
            </button>
            <button
              type="button"
              onClick={() => onLogin('pin')}
              className="w-[48%] bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition-colors"
            >
              PIN 인증 로그인
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          계정이 없으신가요? <Link to="/register?from=home" className="text-blue-600 hover:underline">NANU ID 생성하기</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
