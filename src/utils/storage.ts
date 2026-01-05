/**
 * Storage Service - Abstraction layer for localStorage
 * Provides type-safe storage operations with error handling
 */

class StorageService {
  /**
   * Get item from localStorage
   */
  get<T>(key: string): T | null {
    try {
      if (typeof window === 'undefined') {
        return null;
      }
      const item = localStorage.getItem(key);
      if (item === null) {
        return null;
      }
      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Storage get error for key "${key}":`, error);
      return null;
    }
  }

  /**
   * Set item in localStorage
   */
  set<T>(key: string, value: T): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Storage set error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   */
  remove(key: string): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error(`Storage remove error for key "${key}":`, error);
      return false;
    }
  }

  /**
   * Clear all localStorage
   */
  clear(): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Check if key exists in localStorage
   */
  has(key: string): boolean {
    try {
      if (typeof window === 'undefined') {
        return false;
      }
      return localStorage.getItem(key) !== null;
    } catch {
      return false;
    }
  }
}

export const storage = new StorageService();

// Storage keys constants
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'authToken',
  USER: 'user',
  THEME: 'theme',
  DEMO_MODE: 'demoMode',
} as const;

