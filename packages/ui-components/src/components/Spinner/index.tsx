import React from 'react';

export type SpinnerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type SpinnerColor = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';

export interface SpinnerProps {
  /**
   * The size of the spinner
   * @default 'md'
   */
  size?: SpinnerSize;

  /**
   * The color of the spinner
   * @default 'primary'
   */
  color?: SpinnerColor;

  /**
   * Label for screen readers
   * @default 'Loading...'
   */
  label?: string;

  /**
   * Additional CSS class names
   */
  className?: string;
}

/**
 * Spinner component for loading states
 */
export const Spinner: React.FC<SpinnerProps> = ({
  size = 'md',
  color = 'primary',
  label = 'Loading...',
  className = '',
}) => {
  // Size mappings
  const sizeMap = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-12 h-12',
  };

  // Color mappings
  const colorMap = {
    primary: 'text-blue-600',
    secondary: 'text-gray-600',
    success: 'text-green-600',
    danger: 'text-red-600',
    warning: 'text-amber-600',
    info: 'text-blue-600',
    light: 'text-gray-300',
    dark: 'text-gray-800',
  };

  // Combined classes
  const spinnerClasses = [
    'inline-block animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
    sizeMap[size],
    colorMap[color],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div role="status" className="inline-flex items-center">
      <svg
        className={spinnerClasses}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          opacity="0.25"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
          fill="currentColor"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 22C17.5228 22 22 17.5228 22 12H19C19 15.866 15.866 19 12 19V22Z"
          fill="currentColor"
        />
      </svg>
      <span className="sr-only">{label}</span>
    </div>
  );
};

export default Spinner;
