import { LoginFormData, AuthResponse } from "../types/Auth";
import { AuthType } from "./dto/request/AuthType";
import { LoginRequest } from "./dto/request/LoginRequest";
import { loginRequestViaApp } from "./dto/request/LoginRequestViaApp";
import { loginRequestViaPin } from "./dto/request/LoginRequestViaPin";
import { RequestType } from "./dto/request/RequestType";
import { LoginResponse } from "./dto/response/LoginResponse";
import SERVICE_API_URL from "./ServiceEndPoint";

const BASE_URL = SERVICE_API_URL.BASE_URL;

export class AuthService {
  static async execute(data: LoginRequest): Promise<void> {
    let endpoint = "";

    if (data.requestType === RequestType.DASHBOARD) {
      endpoint = `${BASE_URL}/auth/login`;
    } else {
      endpoint = `${BASE_URL}/auth/oauth_login`;
    }

    console.log(endpoint);
    console.log(data);

    const requestBody = this.getRequestDtoByAuthType(data);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "로그인 중 오류가 발생했습니다.");
    }

    if (data.requestType !== RequestType.DASHBOARD) {
      this.handleOAuthSuccess(result, data.redirectUrl);
      return;
    }

    this.storeTokens(result);
    window.location.href = data.redirectUrl;
  }

  private static getRequestDtoByAuthType(data: LoginRequest): any {
    if (data.authType === AuthType.APP) {
      return loginRequestViaApp(data);
    } else {
      return loginRequestViaPin(data);
    }
  }

  private static handleOAuthSuccess(result: any, redirectUrl?: string): void {
    if (!redirectUrl) {
      throw new Error("리디렉션 URL이 필요합니다.");
    }

    const authCode = result.code;
    if (!authCode) {
      throw new Error("응답에 인증 코드가 포함되어 있지 않습니다.");
    }

    const redirectWithAuthCode = `${redirectUrl}?AUTH_CODE=${authCode}`;
    window.location.href = redirectWithAuthCode;
  }

  private static storeTokens(result: LoginResponse): void {
    document.cookie = `access_token=${result.access_token}; path=/; secure; HttpOnly`;
    document.cookie = `refresh_token=${result.refresh_token}; path=/; secure; HttpOnly`;
  }
}
