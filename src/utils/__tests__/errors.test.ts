import {
  AppError,
  ApiError,
  NetworkError,
  ValidationError,
  isApiError,
  isAppError,
  getErrorMessage,
  getErrorCode,
} from '../errors';

describe('Error Utilities', () => {
  describe('AppError', () => {
    it('should create AppError with message and code', () => {
      const error = new AppError('Test error', 'TEST_CODE', 400);
      expect(error.message).toBe('Test error');
      expect(error.code).toBe('TEST_CODE');
      expect(error.statusCode).toBe(400);
    });
  });

  describe('ApiError', () => {
    it('should create ApiError with default code', () => {
      const error = new ApiError('API error');
      expect(error.message).toBe('API error');
      expect(error.code).toBe('API_ERROR');
      expect(error.name).toBe('ApiError');
    });
  });

  describe('NetworkError', () => {
    it('should create NetworkError with default message', () => {
      const error = new NetworkError();
      expect(error.message).toBe('Network error occurred');
      expect(error.code).toBe('NETWORK_ERROR');
    });
  });

  describe('ValidationError', () => {
    it('should create ValidationError with details', () => {
      const details = { field: 'email' };
      const error = new ValidationError('Validation failed', details);
      expect(error.message).toBe('Validation failed');
      expect(error.statusCode).toBe(400);
      expect(error.details).toEqual(details);
    });
  });

  describe('isApiError', () => {
    it('should return true for ApiError', () => {
      const error = new ApiError('Test');
      expect(isApiError(error)).toBe(true);
    });

    it('should return false for other errors', () => {
      const error = new Error('Test');
      expect(isApiError(error)).toBe(false);
    });
  });

  describe('isAppError', () => {
    it('should return true for AppError', () => {
      const error = new AppError('Test', 'CODE');
      expect(isAppError(error)).toBe(true);
    });

    it('should return false for standard Error', () => {
      const error = new Error('Test');
      expect(isAppError(error)).toBe(false);
    });
  });

  describe('getErrorMessage', () => {
    it('should extract message from Error', () => {
      const error = new Error('Test error');
      expect(getErrorMessage(error)).toBe('Test error');
    });

    it('should extract message from string', () => {
      expect(getErrorMessage('String error')).toBe('String error');
    });

    it('should extract message from object with message property', () => {
      const error = { message: 'Object error' };
      expect(getErrorMessage(error)).toBe('Object error');
    });

    it('should return default message for unknown error', () => {
      expect(getErrorMessage(null)).toBe('An unexpected error occurred');
    });
  });

  describe('getErrorCode', () => {
    it('should extract code from AppError', () => {
      const error = new AppError('Test', 'TEST_CODE');
      expect(getErrorCode(error)).toBe('TEST_CODE');
    });

    it('should return UNKNOWN_ERROR for standard Error', () => {
      const error = new Error('Test');
      expect(getErrorCode(error)).toBe('UNKNOWN_ERROR');
    });
  });
});

