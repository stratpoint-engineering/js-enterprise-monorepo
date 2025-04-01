import { format, parse, isValid, addDays, addMonths } from 'date-fns';

/**
 * Format a date using the date-fns format function
 */
export const formatDate = (date: Date | string | number, formatStr = 'yyyy-MM-dd'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, formatStr);
};

/**
 * Parse a date string into a Date object
 */
export const parseDate = (dateStr: string, formatStr = 'yyyy-MM-dd'): Date | null => {
  const parsedDate = parse(dateStr, formatStr, new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

/**
 * Add days to a date
 */
export const addDaysToDate = (date: Date | string | number, days: number): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return addDays(dateObj, days);
};

/**
 * Add months to a date
 */
export const addMonthsToDate = (date: Date | string | number, months: number): Date => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return addMonths(dateObj, months);
};

/**
 * Check if a date string is valid
 */
export const isValidDateString = (dateStr: string, formatStr = 'yyyy-MM-dd'): boolean => {
  const parsedDate = parse(dateStr, formatStr, new Date());
  return isValid(parsedDate);
};
