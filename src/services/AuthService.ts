import { LoginFormData, AuthResponse } from '../types/Auth';

export const authService = {
  async login(credentials: LoginFormData): Promise<AuthResponse> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      if (!response.ok) {
        throw new Error('Login failed');
      }
      
      return response.json();
    } catch (error) {
      throw error;
    }
  },
};