import ApiService, { ApiResponse } from './apiService';
import type { User } from '../types';
import apiClient from '@/lib/apiClient';
import { storage, STORAGE_KEYS } from '@/utils/storage';
import { authService } from './authService';

class UserService extends ApiService {
  constructor() {
    super('/users');
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // In development without backend, return mock data
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        // Get user data from storage if available
        const storedUser = storage.get<User>(STORAGE_KEYS.USER);
        if (storedUser) {
          return {
            status: 'success',
            data: storedUser,
          };
        }

        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: 'Mock User',
          email: 'mock@example.com',
          role: 'personal_planner',
          avatar: undefined
        };

        return {
          status: 'success',
          data: mockUser,
        };
      }

      return await this.getById<User>('me');
    } catch (error) {
      return {
        status: 'error',
        data: {} as User,
        error: {
          code: 'GET_USER_ERROR',
          message: 'Error fetching current user',
        },
      };
    }
  }

  async login(credentials: { email: string; password: string }): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      // In development without backend, return mock data
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: 'Mock User',
          email: credentials.email,
          role: 'personal_planner', // Default role for mock
          avatar: undefined
        };

        return {
          status: 'success',
          data: {
            user: mockUser,
            token: 'mock-token-for-development'
          },
        };
      }

      const response = await apiClient.post<{ user: User; token: string }>('/auth/login', credentials);
      return {
        status: 'success',
        data: response.data,
      };
    } catch (error) {
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
      // In development without backend, return mock data
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        const mockUser: User = {
          id: `user-${Date.now()}`,
          name: userData.name || 'New User',
          email: userData.email || 'mock@example.com',
          role: userData.role || 'personal_planner',
          avatar: undefined
        };

        return {
          status: 'success',
          data: mockUser,
        };
      }

      const response = await apiClient.post<User>('/auth/register', userData);
      return {
        status: 'success',
        data: response.data,
      };
    } catch (error) {
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
      // In development without backend, just clear storage
      if (typeof window !== 'undefined' && window.location.hostname === 'localhost') {
        authService.logout();
        return {
          status: 'success',
          data: undefined as unknown as void,
        };
      }

      await apiClient.post('/auth/logout');
      authService.logout();
      return {
        status: 'success',
        data: undefined as unknown as void,
      };
    } catch (error) {
      // Still logout locally even if API call fails
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
