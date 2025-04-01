declare module '@enterprise-monorepo/shared' {
  // API constants
  export const API_ENDPOINTS: {
    AUTH: {
      LOGIN: string;
      REGISTER: string;
      REFRESH_TOKEN: string;
      LOGOUT: string;
      FORGOT_PASSWORD: string;
      RESET_PASSWORD: string;
    };
    USERS: {
      BASE: string;
      ME: string;
    };
  };

  // User role enum
  export enum UserRole {
    ADMIN = 'admin',
    MANAGER = 'manager',
    USER = 'user',
    GUEST = 'guest',
  }

  // User interface
  export interface User {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    isActive: boolean;
    lastLogin?: Date | string;
    createdAt: Date | string;
    updatedAt: Date | string;
  }

  // User DTO
  export interface UserDto {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role: UserRole;
    createdAt: string;
    updatedAt: string;
  }

  // Create User DTO
  export interface CreateUserDto {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role?: UserRole;
  }

  // Update User DTO
  export interface UpdateUserDto {
    firstName?: string;
    lastName?: string;
    email?: string;
  }

  // Login DTO
  export interface LoginDto {
    email: string;
    password: string;
  }

  // Auth Response DTO
  export interface AuthResponseDto {
    accessToken: string;
    refreshToken: string;
    user: UserDto;
  }

  // Refresh Token DTO
  export interface RefreshTokenDto {
    refreshToken: string;
  }

  // API Response
  export interface ApiResponse<T> {
    data?: T;
    error?: ApiError;
    meta?: {
      page?: number;
      perPage?: number;
      total?: number;
    };
  }

  // API Error
  export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  }

  // User utility functions
  export function getUserFullName(user: User): string;
  export function hasRole(user: User, roles: UserRole | UserRole[]): boolean;
  export function isAdmin(user: User): boolean;
  export function isManager(user: User): boolean;
}
