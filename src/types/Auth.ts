export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
  };
}

export interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  birthDate: string;
  pin: string;
  confirmPin: string;
  termsAccepted: boolean;
}
