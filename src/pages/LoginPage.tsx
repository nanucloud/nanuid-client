import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginContainer from '../components/auth/LoginContainer';
import LoginBanner from '../components/auth/LoginBanner';
import LoginForm from '../components/auth/LoginForm';

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false
  });
  
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleLogin = (type: 'app' | 'pin') => {
    // TODO: Implement login logic
    console.log(`Logging in with ${type}`, formData);
  };

  return (
    <LoginContainer>
      <LoginBanner />
      <LoginForm 
        formData={formData}
        onInputChange={handleInputChange}
        onLogin={handleLogin}
      />
    </LoginContainer>
  );
};

export default LoginPage;