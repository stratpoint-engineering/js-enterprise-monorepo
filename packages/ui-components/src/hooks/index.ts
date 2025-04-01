import { useState, useEffect, useCallback, useRef } from 'react';

/**
 * Hook for managing toggling state (e.g., modal/dropdown visibility)
 * @param initialState Initial toggle state
 * @returns Toggle state and handlers
 */
export const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState);

  const toggle = useCallback(() => setIsOpen(state => !state), []);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, toggle, open, close, setIsOpen };
};

/**
 * Hook for detecting clicks outside of a component
 * @param callback Function to call when clicked outside
 * @returns Ref to attach to the element
 */
export const useOutsideClick = (callback: () => void) => {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  return ref;
};

/**
 * Hook for handling keyboard events
 * @param key Key to listen for (e.g., 'Escape')
 * @param callback Function to call when key is pressed
 */
export const useKeyPress = (key: string, callback: () => void) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [key, callback]);
};

/**
 * Hook for debouncing a value/function
 * @param value Value to debounce
 * @param delay Delay in milliseconds
 * @returns Debounced value
 */
export const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

/**
 * Hook for managing local storage
 * @param key Storage key
 * @param initialValue Initial value
 * @returns Current value and setter
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
};

export * from './useMediaQuery';
export * from './useFormControl';

export default {
  useToggle,
  useOutsideClick,
  useKeyPress,
  useDebounce,
  useLocalStorage,
};
