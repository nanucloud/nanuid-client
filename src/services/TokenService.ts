import { AuthService } from "./AuthService";
import Cookies from "js-cookie";
import SERVICE_API_URL from "./ServiceEndPoint";

const BASE_URL = SERVICE_API_URL.BASE_URL;
export class TokenService {
  static async getAllTokens(): Promise<any[]> {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");
    const response = await fetch(`${BASE_URL}/token/getAll`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "토큰 정보 조회 실패");

    return result;
  }

  static async deleteToken(tokenId: string): Promise<void> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      return;
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/auth/delete-token/${tokenId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "토큰 삭제 실패");

    console.log(`Token ${tokenId} deleted successfully`);
  }

  static async blockIP(ip: string): Promise<void> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      return;
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/auth/block-ip`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ip }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "IP 차단 실패");

    console.log(`IP ${ip} blocked successfully`);
  }
}
