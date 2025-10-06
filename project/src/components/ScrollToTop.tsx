import { useScrollToTop } from '../hooks/useScrollToTop';

/**
 * Component that automatically scrolls to top when route changes
 * This ensures users always see the page content from the beginning
 */
const ScrollToTop = () => {
  useScrollToTop();
  return null;
};

export default ScrollToTop;
