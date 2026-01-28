/**
 * Event Taxonomy (Small, Intentional)
 *
 * Rules:
 * - No custom event explosion
 * - Events map directly to real questions
 * - Event names are human-readable
 */

export enum AnalyticsEvent {
  // Page views
  PAGE_VIEW = 'page_view',

  // Primary interactions
  CTA_CLICK = 'cta_click',
  PROJECT_VIEW = 'project_view',
  ESSAY_VIEW = 'essay_view',
  RESOURCE_VIEW = 'resource_view',

  // Commerce
  CHECKOUT_INITIATED = 'checkout_initiated',
  CHECKOUT_COMPLETED = 'checkout_completed',
  ACCESS_RECOVERY = 'access_recovery',

  // Engagement signals
  SCROLL_DEPTH = 'scroll_depth',
  TIME_ON_PAGE = 'time_on_page',
}

export interface AnalyticsEventData {
  event: AnalyticsEvent;
  properties?: Record<string, string | number | boolean>;
  timestamp?: Date;
}

// Banned event types (explicitly not tracked)
export const BANNED_EVENTS = [
  'mouse_movement',
  'click_heatmap',
  'session_replay',
  'form_field_tracking',
  'scroll_heatmap',
  'user_identification',
] as const;
