import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that automatically scrolls to the top of the page
 * when the route changes. This ensures users see the page content
 * from the beginning without having to manually scroll up.
 */
export const useScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top when location changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location]);
};

/**
 * Utility function to scroll to top immediately
 * Useful for navigation links that need instant scroll
 */
export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
};
