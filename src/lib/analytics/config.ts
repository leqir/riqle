/**
 * Analytics Configuration
 *
 * Philosophy: Minimal, intentional, privacy-respecting
 * Provider: Vercel Analytics (cookieless, privacy-first)
 */

export const ANALYTICS_CONFIG = {
  // Provider
  provider: 'vercel' as const,

  // Privacy settings
  respectDoNotTrack: true,
  cookieless: true,
  anonymizeIp: true,

  // Performance
  scriptLoad: 'async' as const,
  maxEventQueueSize: 50,

  // Sampling (optional - reduce load)
  sampleRate: 1.0, // 100% (reduce if high traffic)
} as const;

// Core success questions mapped to metrics
export const SUCCESS_QUESTIONS = {
  employerUnderstanding: {
    question: 'Do employers understand me quickly?',
    metrics: ['homepage_bounce_rate', 'time_to_first_interaction', 'navigation_to_work_or_writing'],
    interpretation: {
      good: 'Low bounce + quick routing = successful identity compression',
      bad: 'High bounce + no interaction = unclear positioning',
    },
  },

  proofEffectiveness: {
    question: 'Which proof surfaces are working?',
    metrics: [
      'project_page_views',
      'time_on_project_pages',
      'writing_scroll_depth',
      'writing_completion_rate',
    ],
    interpretation: {
      good: 'High dwell time = credibility resonance',
      bad: 'Low engagement = weak framing or wrong placement',
    },
  },

  commerceHealth: {
    question: 'Is commerce functioning healthily (not aggressively)?',
    metrics: [
      'conversion_rate',
      'refund_rate',
      'support_requests_per_order',
      'repeat_access_events',
    ],
    interpretation: {
      good: 'Low refunds + low support = trust intact',
      note: 'High conversion is NOT the primary success signal',
    },
  },

  operationalHealth: {
    question: 'Is anything broken?',
    metrics: ['checkout_failures', 'webhook_failures', 'access_recovery_usage', 'error_rate'],
    interpretation: {
      note: 'Spikes indicate reliability issues, not marketing issues',
    },
  },
} as const;
