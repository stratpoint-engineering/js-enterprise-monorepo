import { useState, useEffect } from 'react';

/**
 * Hook to detect if a media query matches
 * @param query Media query string (e.g. '(min-width: 768px)')
 * @returns Whether the media query matches
 */
export const useMediaQuery = (query: string): boolean => {
  // Check if SSR
  const getMatches = (): boolean => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  };

  const [matches, setMatches] = useState<boolean>(getMatches());

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    // Define a callback function to handle matches
    const handleChange = (): void => {
      setMatches(mediaQuery.matches);
    };

    // Attach event listener for future changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    // Call the handleChange function once to set the initial state
    handleChange();

    // Clean up function
    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, [query]); // Re-run if the query changes

  return matches;
};

/**
 * Predefined breakpoint hooks based on common screen sizes
 */
export const useIsMobile = (): boolean => useMediaQuery('(max-width: 639px)');
export const useIsTablet = (): boolean => useMediaQuery('(min-width: 640px) and (max-width: 1023px)');
export const useIsDesktop = (): boolean => useMediaQuery('(min-width: 1024px)');
export const useIsLargeDesktop = (): boolean => useMediaQuery('(min-width: 1280px)');

export default useMediaQuery;
