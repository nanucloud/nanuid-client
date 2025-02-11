import { Application } from "../types/Application";
import SERVICE_API_URL from "./ServiceEndPoint";

const API_BASE_URL = SERVICE_API_URL.BASE_URL;

export class ApplicationService {
  static async getApplications(): Promise<Application[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/application/list`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
      });

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
      const response = await fetch(`${API_BASE_URL}/application/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

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
    console.log("Delete application called with ID:", applicationId);
    return Promise.resolve(true);
  }

  static async updateApplication(
    application: Partial<Application>
  ): Promise<boolean> {
    return Promise.resolve(true);
  }
}
