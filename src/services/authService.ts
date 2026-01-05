/**
 * Authentication Service
 * Handles authentication state and navigation
 */

import { storage, STORAGE_KEYS } from '@/utils/storage';
import { User } from '@/types';

class AuthService {
  private logoutCallback?: () => void;

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
    return storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Set authentication token
   */
  setToken(token: string): boolean {
    return storage.set(STORAGE_KEYS.AUTH_TOKEN, token);
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

