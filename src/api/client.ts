import { Api } from "./AriyaApi";
import { storage, STORAGE_KEYS } from "@/utils/storage";
import { authService } from "@/services/authService";
import { ApiError } from "@/utils/errors";

/**
 * Global API instance sharing configuration like baseURL
 * This instance is used across the entire Ariya 2.0 frontend to ensure
 * unified security headers and consistent endpoints.
 */
const getBaseURL = () => {
    let url;
    try {
        url = (process.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL) || "http://localhost:8080/api";
    } catch {
        url = "http://localhost:8080/api";
    }

    // Append /v1 if not present (simple check)
    if (!url.endsWith('/v1')) {
        url = url.endsWith('/') ? `${url}v1` : `${url}/v1`;
    }
    return url;
};

export const api = new Api({
    baseURL: getBaseURL(),
    securityWorker: (token) => {
        return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
    },
});

/**
 * Global Request Interceptor
 * Ensures every request sent via the generated API client includes the 
 * JWT token from storage, avoiding 401 Unauthorized errors.
 */
api.instance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = storage.get<string>(STORAGE_KEYS.AUTH_TOKEN);
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Global Response Interceptor
 * Handles common error scenarios like 401 Unauthorized.
 * Parses new standardized backend error format.
 */
api.instance.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle 401 Unauthorized
        if (error.response?.status === 401) {
            console.warn("Unauthorized access - clearing session");
            authService.logout();
        }

        // Handle Standardized Backend Errors
        if (error.response?.data) {
            const { status, message, code, statusCode, details } = error.response.data;

            // Check if it matches the new error shape
            if (status === 'error' && message) {
                const apiError = new ApiError(
                    message,
                    code || 'API_ERROR',
                    statusCode || error.response.status,
                    details
                );
                return Promise.reject(apiError);
            }
        }

        return Promise.reject(error);
    }
);
