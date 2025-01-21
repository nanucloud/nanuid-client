import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../../components/auth/LoginContainer";
import LoginBanner from "../../components/auth/LoginBanner";
import RegisterForm from "../../components/auth/RegisterForm";
import { RegisterFormData } from "../../types/Auth";
import MobileContainer from "../../components/mobile/MobileContainer";
import { RegisterService } from "../../services/RegisterService";
import { toast } from "react-toastify";

const MobileRegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    birthDate: "",
    pin: "",
    confirmPin: "",
    termsAccepted: false,
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePinChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async () => {
    try {
      await RegisterService.register({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        birthDate: formData.birthDate,
        pin: formData.pin,
        redirectUrl: "/app/login",
      });
    } catch (error) {
      toast.error("회원가입에 실패했습니다.");
    }
  };

  return (
    <MobileContainer>
      <div className="w-full sm:w-[370px] p-2 pt-6">
        <RegisterForm
          formData={formData}
          onInputChange={handleInputChange}
          onPinChange={handlePinChange}
          onRegister={handleRegister}
          isMobile={true}
        />
      </div>
    </MobileContainer>
  );
};

export default MobileRegisterPage;
