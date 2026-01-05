import { storage, STORAGE_KEYS } from '../storage';

describe('Storage Service', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('should return null for non-existent key', () => {
      expect(storage.get('non-existent')).toBeNull();
    });

    it('should return parsed value for existing key', () => {
      const testData = { name: 'Test', id: 1 };
      localStorage.setItem('test-key', JSON.stringify(testData));
      expect(storage.get('test-key')).toEqual(testData);
    });

    it('should return null for invalid JSON', () => {
      localStorage.setItem('invalid-key', 'invalid-json{');
      expect(storage.get('invalid-key')).toBeNull();
    });
  });

  describe('set', () => {
    it('should store value in localStorage', () => {
      const testData = { name: 'Test' };
      const result = storage.set('test-key', testData);
      expect(result).toBe(true);
      expect(localStorage.getItem('test-key')).toBe(JSON.stringify(testData));
    });

    it('should handle storage errors gracefully', () => {
      // Mock localStorage.setItem to throw error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn(() => {
        throw new Error('Storage quota exceeded');
      });

      const result = storage.set('test-key', { data: 'test' });
      expect(result).toBe(false);

      localStorage.setItem = originalSetItem;
    });
  });

  describe('remove', () => {
    it('should remove item from localStorage', () => {
      localStorage.setItem('test-key', 'test-value');
      const result = storage.remove('test-key');
      expect(result).toBe(true);
      expect(localStorage.getItem('test-key')).toBeNull();
    });
  });

  describe('clear', () => {
    it('should clear all localStorage', () => {
      localStorage.setItem('key1', 'value1');
      localStorage.setItem('key2', 'value2');
      const result = storage.clear();
      expect(result).toBe(true);
      expect(localStorage.length).toBe(0);
    });
  });

  describe('has', () => {
    it('should return true for existing key', () => {
      localStorage.setItem('test-key', 'test-value');
      expect(storage.has('test-key')).toBe(true);
    });

    it('should return false for non-existent key', () => {
      expect(storage.has('non-existent')).toBe(false);
    });
  });
});

