/**
 * Analytics Success Questions
 *
 * Philosophy: Every metric must answer a core question
 * Questions map to meaningful business/UX insights
 */

export interface SuccessQuestion {
  id: string;
  question: string;
  why: string;
  metrics: Array<{
    name: string;
    threshold: string;
    interpretation: string;
  }>;
  actions: string[];
}

export const SUCCESS_QUESTIONS: SuccessQuestion[] = [
  {
    id: 'employer_understanding',
    question: 'Do employers understand me quickly?',
    why: 'Homepage must compress identity effectively in 30-45 seconds',
    metrics: [
      {
        name: 'homepage_bounce_rate',
        threshold: '< 70%',
        interpretation: 'Lower is better - indicates clear positioning',
      },
      {
        name: 'time_to_first_interaction',
        threshold: '< 5s',
        interpretation: 'Quick engagement = content resonates',
      },
      {
        name: 'navigation_to_work_or_writing',
        threshold: '> 30%',
        interpretation: 'Successful routing to proof surfaces',
      },
    ],
    actions: ['Review homepage copy', 'Test with real employers', 'Simplify above-fold content'],
  },
  {
    id: 'proof_effectiveness',
    question: 'Which proof surfaces are working?',
    why: 'Proof must resonate without overwhelming',
    metrics: [
      {
        name: 'project_page_views',
        threshold: 'Relative to homepage visits',
        interpretation: 'High relative views = successful routing',
      },
      {
        name: 'time_on_project_pages',
        threshold: '> 60s',
        interpretation: 'High dwell time = credibility resonance',
      },
      {
        name: 'writing_scroll_depth',
        threshold: '> 50%',
        interpretation: 'Deep scrolling = engaged reading',
      },
      {
        name: 'writing_completion_rate',
        threshold: '> 25%',
        interpretation: 'Completing articles = resonant content',
      },
    ],
    actions: ['Review project framing', 'Check content quality', 'Simplify navigation'],
  },
  {
    id: 'commerce_health',
    question: 'Is commerce functioning healthily?',
    why: 'Commerce must feel safe, not aggressive',
    metrics: [
      {
        name: 'conversion_rate',
        threshold: 'Directional only',
        interpretation: 'Track trends, not absolute optimization',
      },
      {
        name: 'refund_rate',
        threshold: '< 5%',
        interpretation: 'Low refunds = trust intact',
      },
      {
        name: 'support_requests_per_order',
        threshold: '< 10%',
        interpretation: 'Low support = clear delivery',
      },
      {
        name: 'repeat_access_events',
        threshold: 'Increasing trend',
        interpretation: 'Repeat access = value delivered',
      },
    ],
    actions: [
      'Review checkout clarity',
      'Check access delivery',
      'Improve post-purchase communication',
    ],
  },
  {
    id: 'operational_health',
    question: 'Is anything broken?',
    why: 'Reliability failures must be caught quickly',
    metrics: [
      {
        name: 'checkout_failure_rate',
        threshold: '< 1%',
        interpretation: 'Checkout system functioning properly',
      },
      {
        name: 'webhook_failure_rate',
        threshold: '< 1%',
        interpretation: 'Stripe integration healthy',
      },
      {
        name: 'access_recovery_usage',
        threshold: '< 10%',
        interpretation: 'Initial delivery working well',
      },
      {
        name: 'error_rate',
        threshold: '< 0.1%',
        interpretation: 'Application stability',
      },
    ],
    actions: ['Check error logs immediately', 'Review failed jobs', 'Test critical flows'],
  },
];
