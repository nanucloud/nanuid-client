export interface LoginHistory {
  date: string;
  service: string;
  device: string;
}

export interface Status {
  title: string;
  subtitle: string;
  active: boolean;
}

export class HomeService {
  static async getLoginHistory(): Promise<LoginHistory[]> {
    return [
      {
        date: "2024.1.23 AM 9:00 KST",
        service: "DASHBOARD(NANUID)",
        device: "Android Web",
      },
      {
        date: "2024.1.21 AM 2:00 KST",
        service: "VocaVault Service",
        device: "Windows Web",
      },
    ];
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
