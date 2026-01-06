/**
 * Environment Configuration
 * Centralized configuration for the application
 */

interface AppConfig {
  apiBaseURL: string;
  apiTimeout: number;
  environment: 'development' | 'production' | 'test';
  enableLogging: boolean;
  enableAnalytics: boolean;
  sentryDsn?: string;
  googleAnalyticsId?: string;
}

// Get environment from Vite's import.meta.env
const environment = (import.meta.env.VITE_ENV as 'development' | 'production' | 'test') || 'development';

export const config: AppConfig = {
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  apiTimeout: parseInt(import.meta.env.VITE_API_TIMEOUT || '30000', 10), // 30 seconds default
  environment,
  enableLogging: environment === 'development',
  enableAnalytics: environment === 'production',
  sentryDsn: import.meta.env.VITE_SENTRY_DSN,
  googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID,
};

// Validate required environment variables in production
if (config.environment === 'production') {
  const requiredVars = ['VITE_API_BASE_URL'];
  const missingVars = requiredVars.filter(varName => !import.meta.env[varName]);
  if (missingVars.length > 0) {
    console.error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

export default config;

