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
}

// Get environment from process.env or webpack DefinePlugin
const getEnv = (): 'development' | 'production' | 'test' => {
  if (typeof process !== 'undefined' && process.env) {
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv === 'production' || nodeEnv === 'test') {
      return nodeEnv;
    }
  }
  return 'development';
};

const environment = getEnv();

export const config: AppConfig = {
  apiBaseURL: 'http://localhost:8080/api',
  apiTimeout: 30000, // 30 seconds
  environment,
  enableLogging: environment === 'development',
  enableAnalytics: environment === 'production',
};

export default config;

