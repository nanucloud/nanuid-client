import { TokenService } from "./TokenService";

export interface LoginHistory {
  date: string;
  service: string;
  device: string;
  tokenId: string;
}
export interface Status {
  title: string;
  subtitle: string;
  active: boolean;
}

export class HomeService {
  static async getLoginHistory(page: number = 0): Promise<any> {
    try {
      const response = await TokenService.getAllTokens(page);
      return response.content.map((token: any) => ({
        date: token.authTime,
        service: token.applicationName,
        device: token.deviceType,
        tokenId: token.refreshTokenId
      }));
    } catch (error) {
      console.error("로그인 기록 조회 실패", error);
      throw error;
    }
  }

  static async getStatusList(): Promise<Status[]> {
    return [
      {
        title: "NANU ID APP MFA",
        subtitle: "앱이 연결되지 않음",
        active: false,
      },
      {
        title: "이메일 사용 인증",
        subtitle: "이메일이 인증되지 않음",
        active: false,
      },
      {
        title: "계정 보안",
        subtitle: "로그인 공격 없음",
        active: true,
      },
    ];
  }
}
