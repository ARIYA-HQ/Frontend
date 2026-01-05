import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { authService } from '@/services/authService';
import { ApiError, NetworkError, getErrorMessage } from '@/utils/errors';

// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';
const API_TIMEOUT = 30000; // 30 seconds

// Create an axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = authService.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common response scenarios
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    // Handle network errors
    if (!error.response) {
      return Promise.reject(new NetworkError('Network error. Please check your connection.'));
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response.status === 401) {
      authService.logout();
      // Note: Navigation will be handled by authService logout callback
      return Promise.reject(
        new ApiError('Session expired. Please login again.', 'UNAUTHORIZED', 401)
      );
    }

    // Handle other API errors
    const errorMessage = getErrorMessage(error.response.data) || 'An error occurred';
    const errorCode = (error.response.data as { code?: string })?.code || 'API_ERROR';
    
    return Promise.reject(
      new ApiError(errorMessage, errorCode, error.response.status, error.response.data)
    );
  }
);

export default apiClient;
export { API_BASE_URL, API_TIMEOUT };