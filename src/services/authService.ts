/**
 * Authentication Service
 * Handles authentication state and navigation
 */

import { storage, STORAGE_KEYS } from '@/utils/storage';
import type { User } from '@/types';
import { api } from '@/api/client';

class AuthService {
  private logoutCallback?: () => void;

  constructor() {
    // Initialize API security data if token exists
    const token = this.getToken();
    if (token) {
      api.setSecurityData(token);
    }
  }

  /**
   * Set logout callback (typically navigate function from React Router)
   */
  setLogoutCallback(callback: () => void) {
    this.logoutCallback = callback;
  }

  /**
   * Get authentication token
   */
  getToken(): string | null {
    const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
    if (token) return token;

    // Fallback for raw 'token' key or non-JSON 'authToken'
    try {
      if (typeof window !== 'undefined') {
        const rawToken = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN) || localStorage.getItem('token');
        if (rawToken) {
          // If it starts with '{' or '"', it might be JSON-encoded, but storage.get failed
          // If it's a raw JWT, it usually starts with 'ey'
          if (rawToken.startsWith('ey')) {
            return rawToken;
          }
          // Try to strip quotes if it's a simple JSON string that JSON.parse might have failed on
          return rawToken.replace(/^"(.*)"$/, '$1');
        }
      }
    } catch {
      // Ignore storage errors
    }
    return null;
  }

  /**
   * Set authentication token
   */
  setToken(token: string): boolean {
    const success = storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
    if (success) {
      api.setSecurityData(token);
    }
    return success;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return storage.get<User>(STORAGE_KEYS.USER);
  }

  /**
   * Set current user
   */
  setCurrentUser(user: User): boolean {
    return storage.set(STORAGE_KEYS.USER, user);
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  /**
   * Logout user
   */
  logout(): void {
    storage.remove(STORAGE_KEYS.AUTH_TOKEN);
    storage.remove(STORAGE_KEYS.USER);
    api.setSecurityData(null);

    // Call logout callback if set (for React Router navigation)
    if (this.logoutCallback) {
      this.logoutCallback();
    }
  }

  /**
   * Clear all auth data
   */
  clearAuth(): void {
    this.logout();
  }
}

export const authService = new AuthService();

