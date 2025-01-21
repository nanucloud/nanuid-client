import { LoginRequest } from './LoginRequest';

export function loginRequestViaPin(data: LoginRequest): any {
  return {
    email: data.email,
    password: data.password,
    recaptchaToken: data.recaptchaToken,
    pin: data.password,
  };
}