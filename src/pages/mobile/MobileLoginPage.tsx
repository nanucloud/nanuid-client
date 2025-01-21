import React from "react";
import MobileContainer from "../../components/mobile/MobileContainer";
import { Link } from "react-router-dom";
import PinAuthModal from "../../components/auth/PinAuthModal";

const MobileLoginPage = () => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isPinModalOpen, setIsPinModalOpen] = React.useState(false);

  const handleInputChange = (e: {
    target: { name: any; value: any; type: any; checked: any };
  }) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleLogin = (type: string) => {
    console.log(`Logging in with ${type}`, formData);
    if (type === "pin") {
      setIsPinModalOpen(true);
    }
  };

  const handlePinSubmit = (pin: string, captchaToken: string) => {
    setIsPinModalOpen(false);
  };

  const handleCaptchaChange = (newToken: string) => {
    console.log("Captcha token changed:", newToken);
  };

  return (
    <MobileContainer>
      <div className="p-6 pt-12">
        <h1 className="text-3xl font-bold mb-8">로그인</h1>
        <form className="space-y-6">
          <div className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:outline-none"
              value={formData.password}
              onChange={handleInputChange}
            />
          </div>
          <a
            href="https://sre.nanu.cc/nanuid/forgetpassword.html"
            className="block text-center text-sm text-blue-600"
          >
            비밀번호를 잊으셨나요?
          </a>

          <div className="space-y-3 pt-4">
            <button
              type="button"
              onClick={() => handleLogin("pin")}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              PIN 인증 로그인
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-gray-600">
          계정이 없으신가요?{" "}
          <Link to="/app/register" className="text-blue-600 hover:underline">
            NANU ID 생성하기
          </Link>
        </div>
      </div>

      <PinAuthModal
        isOpen={isPinModalOpen}
        onClose={() => setIsPinModalOpen(false)}
        onSubmit={handlePinSubmit}
        onCaptchaChange={handleCaptchaChange}
      />
    </MobileContainer>
  );
};

export default MobileLoginPage;
