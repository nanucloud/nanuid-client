import Cookies from 'js-cookie';

import { AuthResponse, UserProfile } from "../types/Auth";
import { AuthType } from "./dto/request/AuthType";
import { LoginRequest } from "./dto/request/LoginRequest";
import { loginRequestViaApp } from "./dto/request/LoginRequestViaApp";
import { loginRequestViaPin } from "./dto/request/LoginRequestViaPin";
import SERVICE_API_URL from "./ServiceEndPoint";

const BASE_URL = SERVICE_API_URL.BASE_URL;

export class AuthService {
  static async login(data: LoginRequest): Promise<void> {
    const endpoint = `${BASE_URL}/auth/login`;
    const requestBody = this.buildRequestBody(data);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || "로그인 실패");
    }

    this.storeTokens(result);
    window.location.href = data.redirectUrl;
  }

  static async reissueToken(): Promise<AuthResponse> {
    const refreshToken = Cookies.get("refresh_token");
    if (!refreshToken) throw new Error("No refresh token");

    const response = await fetch(`${BASE_URL}/auth/reissue`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "토큰 재발급 실패");
    
    this.storeTokens(result);
    return result;
  }

  // 사용자 프로필 조회
  static async getProfile(): Promise<UserProfile> {
    const response = await this.authFetch(`${BASE_URL}/auth/userinfo`);
    return response.json();
  }

  // 인증된 요청 처리 래퍼
  private static async authFetch(input: RequestInfo, init?: RequestInit): Promise<Response> {
    let accessToken = Cookies.get("access_token");
    let response = await fetch(input, {
      ...init,
      headers: { ...init?.headers, Authorization: `Bearer ${accessToken}` },
    });

    if (response.status === 401) {
      await this.reissueToken();
      accessToken = Cookies.get("access_token");
      response = await fetch(input, {
        ...init,
        headers: { ...init?.headers, Authorization: `Bearer ${accessToken}` },
      });
    }
    return response;
  }

  private static buildRequestBody(data: LoginRequest) {
    if (data.authType === AuthType.APP) {
      // loginRequestViaApp 사용
      return loginRequestViaApp(data);
    } else {
      // loginRequestViaPin 사용
      return loginRequestViaPin(data);
    }
  }

  private static storeTokens(tokens: AuthResponse) {
    Cookies.set("access_token", tokens.access_token, { secure: true, expires: 1 });
    Cookies.set("refresh_token", tokens.refresh_token, { secure: true, expires: 7 });
  }
}
