import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginContainer from "../components/auth/LoginContainer";
import LoginBanner from "../components/auth/LoginBanner";
import RegisterForm from "../components/auth/RegisterForm";
import { RegisterFormData } from "../types/Auth";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    birthDate: '',
    pin: '',
    confirmPin: '',
    termsAccepted: false
  });
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePinChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = () => {
    console.log('Register:', formData);
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
