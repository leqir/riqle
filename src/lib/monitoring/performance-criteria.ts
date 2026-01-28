/**
 * Performance Success Criteria
 *
 * These are the non-negotiable standards for site performance.
 * If any metric falls below these thresholds, it's a critical issue.
 */

export const PERFORMANCE_CRITERIA = {
  // User-facing metrics
  userExperience: {
    // "Users never comment on performance"
    subjectiveSpeed: 'instant', // < 1s perceived load time

    // "Failures are rare"
    errorRate: 0.001, // < 0.1% error rate

    // "Recoverable"
    errorRecovery: 'graceful', // No user panic
  },

  // Technical metrics (Lighthouse)
  lighthouse: {
    performance: 90, // Minimum score
    accessibility: 95,
    bestPractices: 95,
    seo: 95,
  },

  // Core Web Vitals
  coreWebVitals: {
    LCP: 1.5, // Largest Contentful Paint (seconds)
    FID: 0.1, // First Input Delay (seconds)
    CLS: 0.05, // Cumulative Layout Shift
  },

  // Availability
  uptime: {
    target: 0.999, // 99.9% uptime (43 minutes downtime/month)
    measurement: 'monthly',
  },

  // Alert thresholds
  alerts: {
    // Alert if error rate exceeds threshold
    errorRateThreshold: 0.01, // 1%

    // Alert if response time exceeds threshold
    p95ResponseTime: 1000, // 1 second (95th percentile)

    // Alert if availability drops
    availabilityThreshold: 0.99, // 99%
  },
} as const;

export function checkPerformanceCriteria(metrics: {
  errorRate: number;
  p95ResponseTime: number;
  availability: number;
}): {
  passing: boolean;
  failures: string[];
} {
  const failures: string[] = [];

  if (metrics.errorRate > PERFORMANCE_CRITERIA.alerts.errorRateThreshold) {
    failures.push(`Error rate ${(metrics.errorRate * 100).toFixed(2)}% exceeds threshold`);
  }

  if (metrics.p95ResponseTime > PERFORMANCE_CRITERIA.alerts.p95ResponseTime) {
    failures.push(`P95 response time ${metrics.p95ResponseTime}ms exceeds threshold`);
  }

  if (metrics.availability < PERFORMANCE_CRITERIA.alerts.availabilityThreshold) {
    failures.push(`Availability ${(metrics.availability * 100).toFixed(2)}% below threshold`);
  }

  return {
    passing: failures.length === 0,
    failures,
  };
}
