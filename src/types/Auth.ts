export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
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

export interface UserProfile {
  email: string;
  name: string;
  accountStatus: boolean;
}