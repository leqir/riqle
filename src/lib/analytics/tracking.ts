/**
 * Core Analytics Tracking Functions
 *
 * Philosophy: Track only what answers core questions
 */

import { AnalyticsEvent } from './events';
import { shouldTrack } from './privacy';
import { db } from '@/lib/db';
import { createId } from '@paralleldrive/cuid2';

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

/**
 * Server-side event tracking
 * Use this in API routes and server components
 */
export async function trackServerEvent(options: {
  eventName: string;
  path?: string;
  userId?: string;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  try {
    await db.analyticsEvent.create({
      data: {
        id: createId(),
        eventName: options.eventName,
        path: options.path,
        userId: options.userId,
        metadata: options.metadata ? (options.metadata as object) : null,
      },
    });
  } catch (error) {
    // Fail silently - don't break user experience if analytics fails
    console.error('Failed to track server event:', error);
  }
}

/**
 * Get event counts for analytics dashboard
 */
export async function getEventCount(
  eventName: string,
  startDate: Date,
  endDate: Date
): Promise<number> {
  return db.analyticsEvent.count({
    where: {
      eventName,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
  });
}

/**
 * Get events with metadata for analysis
 */
export async function getEvents(eventName: string, startDate: Date, endDate: Date, limit = 100) {
  return db.analyticsEvent.findMany({
    where: {
      eventName,
      createdAt: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Predefined event names for consistency
 */
export const SERVER_EVENTS = {
  // Resource interactions
  RESOURCE_VIEWED: 'resource_viewed',
  RESOURCE_DOWNLOADED: 'resource_downloaded',
  RESOURCE_PURCHASED: 'resource_purchased',

  // Navigation
  MARKPOINT_CLICKED: 'markpoint_clicked',
  RESOURCES_BUTTON_CLICKED: 'resources_button_clicked',
  WORK_PAGE_VIEWED: 'work_page_viewed',

  // Commerce
  CHECKOUT_STARTED: 'checkout_started',
  CHECKOUT_COMPLETED: 'checkout_completed',
  PAYMENT_SUCCESS: 'payment_success',
  PAYMENT_FAILED: 'payment_failed',

  // User actions
  USER_SIGNUP: 'user_signup',
  EMAIL_VERIFIED: 'email_verified',
  PASSWORD_RESET: 'password_reset',
} as const;
