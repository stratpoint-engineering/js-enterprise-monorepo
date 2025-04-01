import React from 'react';

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  /**
   * Form content
   */
  children: React.ReactNode;

  /**
   * Function called when the form is submitted
   */
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;

  /**
   * Adds margin between form elements
   * @default true
   */
  spacing?: boolean | 'sm' | 'md' | 'lg';

  /**
   * Additional CSS class names
   */
  className?: string;
}

export interface FormControlProps {
  /**
   * Form control content
   */
  children: React.ReactNode;

  /**
   * Label text
   */
  label?: string;

  /**
   * Help text
   */
  helpText?: string;

  /**
   * Error message
   */
  error?: string;

  /**
   * Whether the field is required
   * @default false
   */
  required?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * ID for the form element
   */
  id?: string;
}

/**
 * Form component for creating forms
 */
export const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  spacing = true,
  className = '',
  ...props
}) => {
  // Space between form elements
  const spacingClasses = {
    true: 'space-y-4',
    false: '',
    sm: 'space-y-2',
    md: 'space-y-4',
    lg: 'space-y-6',
  };

  // Get the appropriate spacing class
  const spacingClass =
    typeof spacing === 'boolean'
      ? spacingClasses[spacing ? 'true' : 'false']
      : spacingClasses[spacing];

  // Combine classes
  const formClasses = [spacingClass, className].filter(Boolean).join(' ');

  return (
    <form
      className={formClasses}
      onSubmit={(e) => {
        if (onSubmit) {
          e.preventDefault();
          onSubmit(e);
        }
      }}
      {...props}
    >
      {children}
    </form>
  );
};

/**
 * FormControl component for wrapping form elements with labels and error messages
 */
export const FormControl: React.FC<FormControlProps> = ({
  children,
  label,
  helpText,
  error,
  required = false,
  className = '',
  id,
}) => {
  // Generate a unique ID if not provided
  const fieldId = id || `field-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={fieldId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      )}

      {React.isValidElement(children)
        ? React.cloneElement(children, {
            id: fieldId,
            'aria-describedby': error
              ? `${fieldId}-error`
              : helpText
              ? `${fieldId}-help`
              : undefined,
            'aria-invalid': error ? 'true' : undefined,
          } as React.HTMLAttributes<HTMLElement>)
        : children}

      {(error || helpText) && (
        <p
          id={error ? `${fieldId}-error` : `${fieldId}-help`}
          className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}
        >
          {error || helpText}
        </p>
      )}
    </div>
  );
};

export default {
  Form,
  FormControl,
};
