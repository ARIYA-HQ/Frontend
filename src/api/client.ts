import { Api } from "./AriyaApi";

/**
 * Global API instance sharing configuration like baseURL
 * This instance is used across the entire Ariya 2.0 frontend to ensure
 * unified security headers and consistent endpoints.
 */
const getBaseURL = () => {
    try {
        return (process.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL) || "http://localhost:8080/api";
    } catch {
        return "http://localhost:8080/api";
    }
};

export const api = new Api({
    baseURL: getBaseURL(),
});

/**
 * Global Request Interceptor
 * Ensures every request sent via the generated API client includes the 
 * JWT token from localStorage, avoiding 401 Unauthorized errors.
 */
api.instance.interceptors.request.use(
    (config) => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken') || localStorage.getItem('token');
            if (token) {
                let finalToken = token;
                try {
                    // Handle JSON-encoded strings from storage.ts
                    if (token.startsWith('"') && token.endsWith('"')) {
                        finalToken = JSON.parse(token);
                    }
                } catch {
                    // Use raw token if parse fails
                }
                config.headers.Authorization = `Bearer ${finalToken}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * Global Response Interceptor
 * Handles common error scenarios like 401 Unauthorized.
 */
api.instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.warn("Unauthorized access - clearing session");
            // Optionally: authService.logout() or redirect to login
        }
        return Promise.reject(error);
    }
);

// Tip: api.setSecurityData is still available but interceptor is the primary mechanism
