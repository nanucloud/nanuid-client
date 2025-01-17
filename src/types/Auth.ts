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
