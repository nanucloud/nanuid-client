import { LoginRequest } from "./LoginRequest";

export function loginRequestViaApp(data: LoginRequest): any {
  return {
    email: data.email,
    password: data.password
  };
}
