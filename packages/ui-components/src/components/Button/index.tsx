import React from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The variant of the button
   * @default 'primary'
   */
  variant?: ButtonVariant;

  /**
   * The size of the button
   * @default 'md'
   */
  size?: ButtonSize;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  isLoading?: boolean;

  /**
   * Whether the button takes up the full width of its container
   * @default false
   */
  fullWidth?: boolean;

  /**
   * The content of the button
   */
  children: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  fullWidth = false,
  children,
  disabled,
  className,
  ...props
}) => {
  // This is a simplified component that would normally include more styles
  // In a real application, you might use a CSS-in-JS library or utility-first CSS like Tailwind

  // Simple styles based on variants
  const baseStyle = 'inline-flex items-center justify-center rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    outline: 'border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
    ghost: 'bg-transparent text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizeStyles = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-4 py-2 text-sm',
    lg: 'px-5 py-2.5 text-base',
  };

  const widthStyle = fullWidth ? 'w-full' : '';
  const loadingStyle = isLoading ? 'opacity-70 cursor-not-allowed' : '';
  const disabledStyle = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const classes = [
    baseStyle,
    variantStyles[variant],
    sizeStyles[size],
    widthStyle,
    loadingStyle,
    disabledStyle,
    className,
  ].filter(Boolean).join(' ');

  return (
    <button
      className={classes}
      disabled={disabled || isLoading}
      type="button"
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          {/* This would be a spinner component in the full implementation */}
          ⟳
        </span>
      )}
      {children}
    </button>
  );
};

export default Button;
