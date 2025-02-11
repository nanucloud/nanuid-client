import { Application } from "../types/Application";
import Cookies from "js-cookie";
import SERVICE_API_URL from "./ServiceEndPoint";
import { AuthService } from "./AuthService";

const API_BASE_URL = SERVICE_API_URL.BASE_URL;

export class ApplicationService {
  private static async authFetch(
    url: string,
    options: RequestInit = {}
  ): Promise<Response> {
    try {
      const isValid = await AuthService.isValid();
      if (!isValid) {
        throw new Error("Invalid session");
      }

      const accessToken = Cookies.get("access_token");
      const response = await fetch(url, {
        ...options,
        headers: {
          ...options.headers,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 401) {
        await AuthService.reissueToken();
        const newAccessToken = Cookies.get("access_token");
        if (!newAccessToken)
          throw new Error("Access token not found after refresh");

        return fetch(url, {
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${newAccessToken}`,
            "Content-Type": "application/json",
          },
        });
      }

      return response;
    } catch (error) {
      console.error("Auth fetch failed:", error);
      throw error;
    }
  }

  static async getApplications(): Promise<Application[]> {
    try {
      const response = await this.authFetch(`${API_BASE_URL}/application/list`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to fetch applications:", error);
      throw error;
    }
  }

  static async createApplication(data: {
    name: string;
    isPublic: boolean;
    description: string;
  }): Promise<Application> {
    try {
      const response = await this.authFetch(
        `${API_BASE_URL}/application/create`,
        {
          method: "POST",
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to create application:", error);
      throw error;
    }
  }

  static async deleteApplication(applicationId: string): Promise<boolean> {
    try {
      const response = await this.authFetch(
        `${API_BASE_URL}/application/${applicationId}`,
        {
          method: "DELETE",
        }
      );

      return response.ok;
    } catch (error) {
      console.error("Failed to delete application:", error);
      throw error;
    }
  }

  static async updateApplication(
    application: Partial<Application>
  ): Promise<Application> {
    try {
      const response = await this.authFetch(
        `${API_BASE_URL}/application/${application.applicationId}`,
        {
          method: "PUT",
          body: JSON.stringify(application),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error("Failed to update application:", error);
      throw error;
    }
  }
}
