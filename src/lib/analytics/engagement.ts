/**
 * Track engagement signals
 * Used for: Proof effectiveness
 */

import { AnalyticsEvent } from './events';
import { trackEvent } from './tracking';

export function trackScrollDepth(percentage: number) {
  // Only track meaningful depths
  const milestones = [25, 50, 75, 100];

  if (milestones.includes(percentage)) {
    trackEvent(AnalyticsEvent.SCROLL_DEPTH, {
      depth: percentage,
      page: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }
}

export function trackTimeOnPage() {
  if (typeof window === 'undefined') return;

  const startTime = Date.now();
  let reported = false;

  // Report time on page when user leaves
  const handleBeforeUnload = () => {
    if (reported) return;

    const timeOnPage = Math.floor((Date.now() - startTime) / 1000); // seconds

    // Only track if significant (> 10 seconds)
    if (timeOnPage > 10) {
      trackEvent(AnalyticsEvent.TIME_ON_PAGE, {
        duration: timeOnPage,
        page: window.location.pathname,
      });

      reported = true;
    }
  };

  window.addEventListener('beforeunload', handleBeforeUnload);

  // Cleanup function
  return () => {
    window.removeEventListener('beforeunload', handleBeforeUnload);
  };
}
