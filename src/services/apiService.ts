import apiClient from '@/lib/apiClient';
import { AxiosResponse } from 'axios';
import { ApiError, isApiError, getErrorMessage } from '@/utils/errors';

/**
 * API Response structure matching backend format
 */
export interface ApiResponse<T> {
  status: 'success' | 'error';
  data: T;
  meta?: {
    requestId?: string;
    timestamp?: string;
    pagination?: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  };
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Base API Service class
 * Provides common CRUD operations with consistent error handling
 */
class ApiService {
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  /**
   * Transform axios response to ApiResponse format
   */
  protected transformResponse<T>(response: AxiosResponse<T>): ApiResponse<T> {
    // If backend already returns ApiResponse format, use it
    if (response.data && typeof response.data === 'object' && 'status' in response.data) {
      return response.data as unknown as ApiResponse<T>;
    }

    // Otherwise, wrap the response
    return {
      status: 'success',
      data: response.data,
      meta: {
        timestamp: new Date().toISOString(),
      },
    };
  }

  /**
   * Handle errors and return consistent ApiResponse format
   */
  protected handleError<T>(error: unknown, defaultMessage: string): ApiResponse<T> {
    if (isApiError(error)) {
      return {
        status: 'error',
        data: {} as T,
        error: {
          code: error.code,
          message: error.message,
          details: error.details,
        },
      };
    }

    return {
      status: 'error',
      data: {} as T,
      error: {
        code: 'UNKNOWN_ERROR',
        message: getErrorMessage(error) || defaultMessage,
      },
    };
  }

  async getAll<T>(params?: Record<string, unknown>): Promise<ApiResponse<T[]>> {
    try {
      const response = await apiClient.get<T[]>(this.endpoint, { params });
      return this.transformResponse(response);
    } catch (error) {
      return this.handleError<T[]>(error, 'Error fetching data');
    }
  }

  async getById<T>(id: string, params?: Record<string, unknown>): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.get<T>(`${this.endpoint}/${id}`, { params });
      return this.transformResponse(response);
    } catch (error) {
      return this.handleError<T>(error, 'Error fetching data');
    }
  }

  async create<T>(data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.post<T>(this.endpoint, data);
      return this.transformResponse(response);
    } catch (error) {
      return this.handleError<T>(error, 'Error creating data');
    }
  }

  async update<T>(id: string, data: Partial<T>): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.put<T>(`${this.endpoint}/${id}`, data);
      return this.transformResponse(response);
    } catch (error) {
      return this.handleError<T>(error, 'Error updating data');
    }
  }

  async delete<T>(id: string): Promise<ApiResponse<T>> {
    try {
      const response = await apiClient.delete<T>(`${this.endpoint}/${id}`);
      return this.transformResponse(response);
    } catch (error) {
      return this.handleError<T>(error, 'Error deleting data');
    }
  }
}

export default ApiService;