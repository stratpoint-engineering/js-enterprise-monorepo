import { z } from 'zod';

/**
 * Email validation schema
 */
export const emailSchema = z.string().email();

/**
 * Password validation schema (min 8 chars, at least 1 uppercase, 1 lowercase, 1 number)
 */
export const passwordSchema = z
  .string()
  .min(8)
  .regex(/[A-Z]/, 'Password must contain at least 1 uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least 1 lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least 1 number');

/**
 * User schema for validation
 */
export const userSchema = z.object({
  email: emailSchema,
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  password: passwordSchema,
});

/**
 * Validates an email string
 */
export const isValidEmail = (email: string): boolean => {
  const result = emailSchema.safeParse(email);
  return result.success;
};

/**
 * Validates a password string
 */
export const isValidPassword = (password: string): boolean => {
  const result = passwordSchema.safeParse(password);
  return result.success;
};

/**
 * Returns validation errors for a password
 */
export const getPasswordValidationErrors = (password: string): string[] => {
  const result = passwordSchema.safeParse(password);
  if (result.success) return [];

  return result.error.errors.map(err => err.message);
};
