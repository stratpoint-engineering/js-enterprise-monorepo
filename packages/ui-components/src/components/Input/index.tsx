import React, { forwardRef } from 'react';

export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input label
   */
  label?: string;

  /**
   * Error message to display
   */
  error?: string;

  /**
   * Helper text to display below the input
   */
  helperText?: string;

  /**
   * The size of the input
   * @default 'md'
   */
  size?: InputSize;

  /**
   * Whether the input takes up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Left icon component
   */
  leftIcon?: React.ReactNode;

  /**
   * Right icon component
   */
  rightIcon?: React.ReactNode;
}

/**
 * Input component for form inputs
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className = '',
      id,
      ...props
    }: InputProps,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

    // Size variations
    const sizeClasses: Record<InputSize, string> = {
      sm: 'px-2 py-1 text-sm',
      md: 'px-3 py-2 text-base',
      lg: 'px-4 py-3 text-lg',
    };

    // Base styles
    const baseInputClasses = 'bg-white border rounded-md focus:outline-none focus:ring-2 transition';

    // State variations
    const stateClasses = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-200 text-red-900 placeholder-red-300'
      : 'border-gray-300 focus:border-blue-500 focus:ring-blue-200';

    // Width
    const widthClass = fullWidth ? 'w-full' : '';

    // Disabled state
    const disabledClass = disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : '';

    // Icon adjustments
    const leftIconClass = leftIcon ? 'pl-10' : '';
    const rightIconClass = rightIcon ? 'pr-10' : '';

    const inputClasses = [
      baseInputClasses,
      sizeClasses[size as InputSize],
      stateClasses,
      widthClass,
      disabledClass,
      leftIconClass,
      rightIconClass,
      className,
    ].filter(Boolean).join(' ');

    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={inputClasses}
            {...props}
          />
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              {rightIcon}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
