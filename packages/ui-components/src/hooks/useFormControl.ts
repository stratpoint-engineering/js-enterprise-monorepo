import { useState, useCallback } from 'react';

export interface FormControlState<T> {
  /**
   * Current value of the form field
   */
  value: T;

  /**
   * Error message, if any
   */
  error?: string;

  /**
   * Whether the field has been touched
   */
  touched: boolean;

  /**
   * Whether the field is currently focused
   */
  focused: boolean;

  /**
   * Whether the field is being submitted
   */
  isSubmitting: boolean;
}

export interface FormControlOptions<T> {
  /**
   * Initial value
   */
  initialValue: T;

  /**
   * Validation function
   */
  validate?: (value: T) => string | undefined;

  /**
   * Whether to validate on change
   * @default false
   */
  validateOnChange?: boolean;

  /**
   * Whether to validate on blur
   * @default true
   */
  validateOnBlur?: boolean;
}

export interface FormControlResult<T> {
  /**
   * State of the form control
   */
  state: FormControlState<T>;

  /**
   * Set the value of the form control
   */
  setValue: (value: T) => void;

  /**
   * Handle change event
   */
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;

  /**
   * Handle focus event
   */
  handleFocus: () => void;

  /**
   * Handle blur event
   */
  handleBlur: () => void;

  /**
   * Reset the form control to its initial state
   */
  reset: () => void;

  /**
   * Programmatically set an error
   */
  setError: (error?: string) => void;

  /**
   * Set the submitting state
   */
  setSubmitting: (isSubmitting: boolean) => void;

  /**
   * Validate the current value
   */
  validate: () => boolean;
}

/**
 * Hook for managing form control state
 * @param options Form control options
 * @returns Form control state and handlers
 */
export const useFormControl = <T>(options: FormControlOptions<T>): FormControlResult<T> => {
  const {
    initialValue,
    validate,
    validateOnChange = false,
    validateOnBlur = true,
  } = options;

  // State for the form control
  const [state, setState] = useState<FormControlState<T>>({
    value: initialValue,
    error: undefined,
    touched: false,
    focused: false,
    isSubmitting: false,
  });

  // Set the value
  const setValue = useCallback((value: T) => {
    setState((prev) => ({
      ...prev,
      value,
      touched: true,
      // If validateOnChange is true, validate when the value changes
      ...(validateOnChange && validate
        ? { error: validate(value) }
        : {}),
    }));
  }, [validate, validateOnChange]);

  // Handle change event
  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const value = e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked as unknown as T
      : e.target.value as unknown as T;

    setValue(value);
  }, [setValue]);

  // Handle focus event
  const handleFocus = useCallback(() => {
    setState((prev) => ({
      ...prev,
      focused: true,
    }));
  }, []);

  // Handle blur event
  const handleBlur = useCallback(() => {
    setState((prev) => {
      const newState = {
        ...prev,
        focused: false,
        touched: true,
      };

      // If validateOnBlur is true, validate when the field loses focus
      if (validateOnBlur && validate) {
        newState.error = validate(prev.value);
      }

      return newState;
    });
  }, [validate, validateOnBlur]);

  // Reset the form control
  const reset = useCallback(() => {
    setState({
      value: initialValue,
      error: undefined,
      touched: false,
      focused: false,
      isSubmitting: false,
    });
  }, [initialValue]);

  // Set an error programmatically
  const setError = useCallback((error?: string) => {
    setState((prev) => ({
      ...prev,
      error,
    }));
  }, []);

  // Set submitting state
  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setState((prev) => ({
      ...prev,
      isSubmitting,
    }));
  }, []);

  // Validate the current value
  const validateField = useCallback((): boolean => {
    if (!validate) return true;

    const error = validate(state.value);
    setState((prev) => ({
      ...prev,
      error,
      touched: true,
    }));

    return !error;
  }, [state.value, validate]);

  return {
    state,
    setValue,
    handleChange,
    handleFocus,
    handleBlur,
    reset,
    setError,
    setSubmitting,
    validate: validateField,
  };
};

export default useFormControl;
