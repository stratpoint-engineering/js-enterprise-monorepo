// Common type definitions for the entire monorepo
import { UserRole } from "../constants/user-roles.enum";

// Auth types
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// Re-export UserRole to maintain backward compatibility
export { UserRole };

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: ApiError;
  meta?: {
    page?: number;
    perPage?: number;
    total?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Common domain types
export interface Pagination {
  page: number;
  perPage: number;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterOptions {
  [key: string]: unknown;
}
