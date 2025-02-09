import Cookies from "js-cookie";
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

  static async getProfile(): Promise<UserProfile> {
    const isValid = await this.isValid();
    if (!isValid) throw new Error("세션 만료됨. 다시 로그인 필요");

    return this.authFetch(`${BASE_URL}/auth/userinfo`).then((res) =>
      res.json()
    );
  }

  private static async authFetch(
    input: RequestInfo,
    init?: RequestInit
  ): Promise<Response> {
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
    return data.authType === AuthType.APP
      ? loginRequestViaApp(data)
      : loginRequestViaPin(data);
  }

  private static storeTokens(tokens: AuthResponse) {
    Cookies.set("access_token", tokens.access_token, {
      secure: true,
      expires: 2,
    });
    Cookies.set("refresh_token", tokens.refresh_token, {
      secure: true,
      expires: 99999,
    });

    this.scheduleTokenRefresh();
  }

  static async logout(redirectUrl: string = "/login"): Promise<void> {
    Cookies.remove("access_token");
    Cookies.remove("refresh_token");
    window.location.href = redirectUrl;
  }

  private static parseJwt(token: string): { exp: number } | null {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch {
      return null;
    }
  }

  private static isTokenExpired(): boolean {
    let token = Cookies.get("access_token");
    if (!token) {
      return true;
    }
    const decoded = this.parseJwt(token);
    if (!decoded || !decoded.exp) return true;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  }

  private static getRemainingTime(token: string): number {
    const decoded = this.parseJwt(token);
    if (!decoded || !decoded.exp) return 0;
    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  }

  private static scheduleTokenRefresh() {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) return;

    const remainingTime = this.getRemainingTime(accessToken);
    const timeout = remainingTime > 60 ? (remainingTime - 60) * 1000 : 0;

    setTimeout(async () => {
      try {
        await this.reissueToken();
      } catch (error) {
        console.error("토큰 자동 갱신 실패", error);
      }
    }, timeout);
  }

  static async isValid(redirectUrl: string = "/login"): Promise<boolean> {
    let accessToken = Cookies.get("access_token");
    if (!accessToken || this.isTokenExpired()) {
      try {
        await this.reissueToken();
        accessToken = Cookies.get("access_token");
        return accessToken ? !this.isTokenExpired() : false;
      } catch {
        this.logout(redirectUrl);
      }
    }
    return true;
  }
}
