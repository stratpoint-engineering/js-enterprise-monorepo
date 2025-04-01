import { UserRole } from '../constants/user-roles.enum';

/**
 * Common User interface shared between client and server
 */
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

/**
 * Get user's full name
 */
export const getUserFullName = (user: User): string => {
  if (!user.firstName && !user.lastName) {
    return user.email;
  }

  return [user.firstName, user.lastName].filter(Boolean).join(' ');
};

/**
 * Check if user has the specified role
 */
export const hasRole = (user: User, roles: UserRole | UserRole[]): boolean => {
  const rolesToCheck = Array.isArray(roles) ? roles : [roles];
  return rolesToCheck.includes(user.role);
};

/**
 * Check if user is an administrator
 */
export const isAdmin = (user: User): boolean => {
  return user.role === UserRole.ADMIN;
};

/**
 * Check if user is a manager
 */
export const isManager = (user: User): boolean => {
  return user.role === UserRole.MANAGER || user.role === UserRole.ADMIN;
};
