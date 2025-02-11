export enum AuthScope {
  FULL_ACCESS = 1 << 0,
  NAME_ACCESS = 1 << 1,
  EMAIL_ACCESS = 1 << 2,
  USERID_ACCESS = 1 << 3,
  BIRTH_ACCESS = 1 << 4,
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface OAuthLoginRequest {
  email: string;
  password: string;
  recaptchaToken: string;
  pin: string;
  applicationId: string;
  applicationRedirectUri: string;
  authScope: number;
}
