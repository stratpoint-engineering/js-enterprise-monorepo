/**
 * Utility functions for styling components
 */

/**
 * Concatenates class names
 * @param classes Class names to concatenate
 * @returns Concatenated class names
 */
export const classNames = (
  ...classes: (string | boolean | undefined | null)[]
): string => {
  return classes.filter(Boolean).join(" ");
};

/**
 * Utility function for generating responsive classes
 * @param base Base class name
 * @param sm Small screen class name
 * @param md Medium screen class name
 * @param lg Large screen class name
 * @param xl Extra large screen class name
 * @returns Responsive class names
 */
export const responsive = (
  base?: string,
  sm?: string,
  md?: string,
  lg?: string,
  xl?: string
): string => {
  return classNames(
    base,
    sm && `sm:${sm}`,
    md && `md:${md}`,
    lg && `lg:${lg}`,
    xl && `xl:${xl}`
  );
};

/**
 * Utility function for generating variant classes
 * @param variants Object mapping variant names to class names
 * @param variant Selected variant
 * @param defaultVariant Default variant if none selected
 * @returns Variant class names
 */
export const getVariantClasses = <T extends string>(
  variants: Record<string, string>,
  variant: T | undefined,
  defaultVariant: T
): string => {
  return variants[variant || defaultVariant] || "";
};

/**
 * Utility function for generating size classes
 * @param sizes Object mapping size names to class names
 * @param size Selected size
 * @param defaultSize Default size if none selected
 * @returns Size class names
 */
export const getSizeClasses = <T extends string>(
  sizes: Record<string, string>,
  size: T | undefined,
  defaultSize: T
): string => {
  return sizes[size || defaultSize] || "";
};

import "./globals.css";

export const styles = {
  // Export any style-related constants or utilities here
};

export default {
  classNames,
  responsive,
  getVariantClasses,
  getSizeClasses,
};
