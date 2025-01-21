import { AuthType } from "./AuthType";
import { RequestType } from "./RequestType";

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe: boolean;
  requestType: RequestType;
  authType: AuthType;

  recaptchaToken?: string; // 일반 PIN인증 DTO
  pin? : string;

  applicationId? : string; // OAuth 인증 DTO
  redirectUrl : string;
}
