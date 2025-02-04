import SERVICE_API_URL from "./ServiceEndPoint";
const BASE_URL = SERVICE_API_URL.BASE_URL;

export class RegisterService {
  static async register(data: {
    email: string;
    password: string;
    name: string;
    birthDate: string;
    pin: string;
    redirectUrl?: string;
  }) {
    const deviceToken = window.nanu_androidgw?.devicetoken || "WEB_NONE";

    const response = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, deviceToken }),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "회원가입 실패");

    window.location.href = data.redirectUrl || "/login";
  }
}