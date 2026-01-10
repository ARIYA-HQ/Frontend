import { api } from '@/api/client';
import { getErrorMessage } from '@/utils/errors';
import type { User } from '@/types';
import { authService } from './authService';

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  error?: {
    code: string;
    message: string;
  };
}

class UserService {

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await api.users.usersControllerGetMe();
      return {
        status: 'success',
        data: response.data as unknown as User,
      };
    } catch (error: any) {
      return {
        status: 'error',
        data: {} as User,
        error: {
          code: 'GET_USER_ERROR',
          message: getErrorMessage(error) || 'Error fetching current user',
        },
      };
    }
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await api.auth.authControllerLogin(credentials);
      const data = response.data as unknown as { access_token: string, user: User }; // Adjust based on actual backend response shape if different

      // Map backend response to expected format if needed
      // Assuming backend returns { access_token: string, user: ... } based on typical NestJS JWT flow
      // But based on implementation of `apiClient.post` it seemed to expect { user, token }

      const token = (data as any).access_token || (data as any).token;

      return {
        status: 'success',
        data: {
          user: data.user || (data as any), // Fallback if structure differs
          token: token
        },
      };
    } catch (error: any) {
      return {
        status: 'error',
        data: { user: {} as User, token: '' },
        error: {
          code: 'LOGIN_ERROR',
          message: 'Login failed',
        },
      };
    }
  }

  async register(userData: Partial<User>): Promise<ApiResponse<User>> {
    try {
      // Cast to any to adapt to RegisterDto requirements
      const registerData = {
        email: userData.email!,
        password: (userData as any).password || 'password123', // TODO: Handle password properly in frontend flow
        firstName: userData.name?.split(' ')[0] || 'User',
        lastName: userData.name?.split(' ')[1] || 'Name',
        role: userData.role as any || 'personal_planner'
      };

      const response = await api.auth.authControllerRegister(registerData);
      return {
        status: 'success',
        data: response.data as unknown as User,
      };
    } catch (error: any) {
      return {
        status: 'error',
        data: {} as User,
        error: {
          code: 'REGISTRATION_ERROR',
          message: 'Registration failed',
        },
      };
    }
  }

  async logout(): Promise<ApiResponse<void>> {
    try {
      // API might not have a logout endpoint if stateless JWT, but let's check
      // api.auth.logout is not in the list from view_file of AriyaApi.ts
      // So we just clear local state.

      authService.logout();
      return {
        status: 'success',
        data: undefined as unknown as void,
      };
    } catch (error: any) {
      authService.logout();
      return {
        status: 'error',
        data: undefined as unknown as void,
        error: {
          code: 'LOGOUT_ERROR',
          message: 'Logout failed',
        },
      };
    }
  }
}

export default new UserService();
