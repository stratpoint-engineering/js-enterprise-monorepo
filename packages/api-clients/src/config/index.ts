import axios from 'axios';

// Default API configuration
export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers?: Record<string, string>;
}

// Default configuration values
export const defaultApiConfig: ApiConfig = {
  baseUrl: process.env.API_BASE_URL || 'http://localhost:3001/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Create an axios instance with default configuration
export const createApiClient = (config: Partial<ApiConfig> = {}) => {
  const apiConfig = {
    ...defaultApiConfig,
    ...config,
  };

  const instance = axios.create({
    baseURL: apiConfig.baseUrl,
    timeout: apiConfig.timeout,
    headers: apiConfig.headers,
  });

  return instance;
};

// Default API client instance
export const apiClient = createApiClient();
