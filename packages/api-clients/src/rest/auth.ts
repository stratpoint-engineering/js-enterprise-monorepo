import { apiClient } from '../config';
import { API_ENDPOINTS } from '@enterprise-monorepo/shared';
import type {
  LoginDto,
  CreateUserDto,
  AuthResponseDto,
  RefreshTokenDto,
  ApiResponse
} from '@enterprise-monorepo/shared';

/**
 * Authentication API client
 */
export const authApi = {
  /**
   * Login a user
   */
  login: async (loginDto: LoginDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, loginDto);
    return response.data;
  },

  /**
   * Register a new user
   */
  register: async (createUserDto: CreateUserDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, createUserDto);
    return response.data;
  },

  /**
   * Refresh the access token using a refresh token
   */
  refreshToken: async (refreshTokenDto: RefreshTokenDto): Promise<ApiResponse<AuthResponseDto>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH_TOKEN, refreshTokenDto);
    return response.data;
  },

  /**
   * Logout a user
   */
  logout: async (): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
    return response.data;
  },

  /**
   * Request a password reset
   */
  forgotPassword: async (email: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
    return response.data;
  },

  /**
   * Reset a password with a token
   */
  resetPassword: async (token: string, password: string): Promise<ApiResponse<void>> => {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password,
    });
    return response.data;
  },
};
