import { Application } from "../types/Application";
import Cookies from "js-cookie";
import SERVICE_API_URL from "./ServiceEndPoint";
import { AuthService } from "./AuthService";

const BASE_URL = SERVICE_API_URL.BASE_URL;

export class ApplicationService {
  static async getApplications(): Promise<Application[]> {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/list`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "애플리케이션 목록 조회 실패");

    return result;
  }

  static async createApplication(data: { name: string; description: string; isPublic: boolean }): Promise<Application> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      throw new Error("Invalid authentication");
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "애플리케이션 생성 실패");

    return result;
  }

  static async getApplication(applicationId: string): Promise<Application | null> {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/${applicationId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "애플리케이션 조회 실패");

    return result;
  }

  static async updateApplication(
    applicationId: string,
    data: { name?: string; description?: string; isPublic?: boolean }
  ): Promise<Application | null> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      throw new Error("Invalid authentication");
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/${applicationId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "애플리케이션 수정 실패");

    return result;
  }

  static async deleteApplication(applicationId: string): Promise<void> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      throw new Error("Invalid authentication");
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/${applicationId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "애플리케이션 삭제 실패");
  }

  static async inviteUser(applicationId: string, data: { email: string; role: string }): Promise<void> {
    const isValid = await AuthService.isValid();
    if (!isValid) {
      throw new Error("Invalid authentication");
    }

    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/${applicationId}/invite`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "사용자 초대 실패");
  }

  static async getInvitedUsers(applicationId: string): Promise<any[]> {
    const accessToken = Cookies.get("access_token");
    if (!accessToken) throw new Error("Access token not found");

    const response = await fetch(`${BASE_URL}/application/${applicationId}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "초대된 사용자 목록 조회 실패");

    return result;
  }
}