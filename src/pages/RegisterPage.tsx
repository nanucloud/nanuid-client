import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/auth/LoginContainer";
import LoginBanner from "../components/auth/LoginBanner";
import RegisterForm from "../components/auth/RegisterForm";
import { RegisterFormData } from "../types/Auth";
import { RegisterService } from "../services/RegisterService";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
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
        redirectUrl: "/login",
      });
    } catch (error) {
      toast.error("회원가입에 실패했습니다. 잠시 후 시도해 주세요.");
    }
  };

  return (
    <LoginContainer>
      <LoginBanner />
      <RegisterForm
        formData={formData}
        onInputChange={handleInputChange}
        onPinChange={handlePinChange}
        onRegister={handleRegister}
      />
    </LoginContainer>
  );
};

export default RegisterPage;
