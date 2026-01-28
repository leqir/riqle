/**
 * Core Analytics Tracking Functions
 *
 * Philosophy: Track only what answers core questions
 */

import { AnalyticsEvent } from './events';
import { shouldTrack } from './privacy';

// Global type declarations for Vercel Analytics
declare global {
  interface Window {
    va?: (event: string, data?: Record<string, string | number | boolean>) => void;
  }
}

/**
 * Track page view
 * Used for: Employer understanding, proof effectiveness
 */
export function trackPageView(path: string) {
  if (!shouldTrack()) return;

  // Vercel Analytics (automatic page view tracking)
  // Custom implementation for additional context
  if (typeof window !== 'undefined' && window.va) {
    window.va('pageview', { path });
  }

  // For custom analytics
  trackEvent(AnalyticsEvent.PAGE_VIEW, {
    path,
    referrer: typeof document !== 'undefined' ? document.referrer || 'direct' : 'unknown',
  });
}

/**
 * Track custom event
 * Generic function for all custom events
 */
export function trackEvent(event: string, properties?: Record<string, string | number | boolean>) {
  if (!shouldTrack()) return;

  // Send to Vercel Analytics
  if (typeof window !== 'undefined' && window.va) {
    window.va('event', { event, ...properties });
  }

  // Log in development
  if (process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', event, properties);
  }
}
