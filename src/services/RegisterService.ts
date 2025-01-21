import SERVICE_API_URL from "./ServiceEndPoint";
const BASE_URL = SERVICE_API_URL.BASE_URL;

export class RegisterService {
  static async register(data: {
    redirectUrl?: string;
    email: string;
    password: string;
    name: string;
    birthDate: string;
    pin: string;
  }): Promise<void> {
    const deviceToken = window.nanu_androidgw?.devicetoken || "WEB_NONE";
    const requestBody = {
      deviceToken: deviceToken,
      pin: data.pin,
      password: data.password,
      name: data.name,
      email: data.email,
      birthDate: data.birthDate,
    };

    const endpoint = `${BASE_URL}/auth/register`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
      mode: "cors",
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "회원가입 중 오류가 발생했습니다.");
    }

    if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        window.location.href = "/home";
      }
  }
}
