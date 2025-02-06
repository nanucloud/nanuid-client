import { AuthService } from "./AuthService";
import Cookies from "js-cookie";
import SERVICE_API_URL from "./ServiceEndPoint";
import Token from "../types/Token";

const BASE_URL = SERVICE_API_URL.BASE_URL;
export class TokenService {
  
  static async getAllTokens(): Promise<Token[]> {
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
  
    const convertToKST = (utcTime: string): string => {
      const date = new Date(utcTime);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: 'Asia/Seoul',
        timeZoneName: 'short',
      };
      return date.toLocaleString("ko-KR", options);
    };
  
    // 원본 authTime을 저장해두고 표시용 시간만 변환
    const updatedTokens: Token[] = result.map((token: Token) => {
      const originalAuthTime = token.authTime; // 원본 시간 저장
      return {
        ...token,
        originalAuthTime, // 정렬용 원본 시간 보존
        authTime: convertToKST(token.authTime), // 표시용 변환된 시간
      };
    });
  
    // 원본 시간을 기준으로 정렬
    updatedTokens.sort((a: Token, b: Token) => {
      const dateA = new Date(a.originalAuthTime || a.authTime);
      const dateB = new Date(b.originalAuthTime || b.authTime);
      return dateB.getTime() - dateA.getTime();
    });
  
    // 정렬 후 원본 시간 필드 제거
    return updatedTokens.map(({ originalAuthTime, ...token }) => token);
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