/**
 * Event Catalog (Complete List)
 *
 * RULE: Maximum 15 events total
 * RULE: Every event must map to a core question
 * RULE: Human-readable names only
 */

export const EVENT_CATALOG = {
  // Page views (automatic via Vercel Analytics)
  PAGE_VIEW: {
    name: 'page_view',
    question: 'Employer understanding + Proof effectiveness',
    properties: ['path', 'referrer'],
  },

  // Primary interactions
  CTA_CLICK: {
    name: 'cta_click',
    question: 'Employer understanding',
    properties: ['cta_id', 'destination'],
    example: 'Click "View Work" from homepage',
  },

  PROJECT_VIEW: {
    name: 'project_view',
    question: 'Proof effectiveness',
    properties: ['project_slug'],
  },

  ESSAY_VIEW: {
    name: 'essay_view',
    question: 'Proof effectiveness',
    properties: ['essay_slug'],
  },

  RESOURCE_VIEW: {
    name: 'resource_view',
    question: 'Commerce health',
    properties: ['resource_slug'],
  },

  // Commerce
  CHECKOUT_INITIATED: {
    name: 'checkout_initiated',
    question: 'Commerce health',
    properties: ['product_id', 'price'],
  },

  CHECKOUT_COMPLETED: {
    name: 'checkout_completed',
    question: 'Commerce health',
    properties: ['order_id', 'product_id'],
  },

  ACCESS_RECOVERY: {
    name: 'access_recovery',
    question: 'Operational health',
    properties: ['product_id'],
  },

  // Engagement signals
  SCROLL_DEPTH: {
    name: 'scroll_depth',
    question: 'Proof effectiveness',
    properties: ['depth', 'page'],
    milestones: [25, 50, 75, 100],
  },

  TIME_ON_PAGE: {
    name: 'time_on_page',
    question: 'Proof effectiveness',
    properties: ['duration', 'page'],
    threshold: '> 10 seconds',
  },
} as const;

// Total events: 10 (well under 15 limit)

export function validateEventCatalog(): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];
  const totalEvents = Object.keys(EVENT_CATALOG).length;

  if (totalEvents > 15) {
    errors.push(`Too many events: ${totalEvents}/15`);
  }

  // Check that all events have questions
  for (const [key, event] of Object.entries(EVENT_CATALOG)) {
    if (!event.question) {
      errors.push(`Event ${key} missing question mapping`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
