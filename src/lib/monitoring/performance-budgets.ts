/**
 * Performance Budgets
 *
 * Defines acceptable limits for page performance metrics
 */

export const PERFORMANCE_BUDGETS = {
  // Time budgets (milliseconds)
  timing: {
    TTFB: 300, // Time to First Byte
    FCP: 1000, // First Contentful Paint
    LCP: 1500, // Largest Contentful Paint
    TTI: 2000, // Time to Interactive
  },

  // Size budgets (bytes)
  size: {
    totalJS: 50000, // 50 KB total JavaScript
    totalCSS: 20000, // 20 KB total CSS
    totalImages: 500000, // 500 KB total images (per page)
    totalFonts: 100000, // 100 KB fonts
  },

  // Request budgets
  requests: {
    total: 25, // Max 25 requests per page
    thirdParty: 3, // Max 3 third-party requests
  },

  // Core Web Vitals thresholds
  coreWebVitals: {
    LCP: {
      good: 1500,
      needsImprovement: 2500,
      poor: Infinity,
    },
    FID: {
      good: 100,
      needsImprovement: 300,
      poor: Infinity,
    },
    CLS: {
      good: 0.05,
      needsImprovement: 0.15,
      poor: Infinity,
    },
  },
} as const;

export function checkBudget(
  metric: keyof typeof PERFORMANCE_BUDGETS.timing,
  value: number
): {
  passing: boolean;
  budget: number;
  actual: number;
  difference: number;
} {
  const budget = PERFORMANCE_BUDGETS.timing[metric];
  const passing = value <= budget;
  const difference = value - budget;

  return { passing, budget, actual: value, difference };
}

export function checkCoreWebVital(
  metric: keyof typeof PERFORMANCE_BUDGETS.coreWebVitals,
  value: number
): {
  rating: 'good' | 'needs-improvement' | 'poor';
  value: number;
  thresholds: { good: number; needsImprovement: number; poor: number };
} {
  const thresholds = PERFORMANCE_BUDGETS.coreWebVitals[metric];

  let rating: 'good' | 'needs-improvement' | 'poor' = 'poor';

  if (value <= thresholds.good) {
    rating = 'good';
  } else if (value <= thresholds.needsImprovement) {
    rating = 'needs-improvement';
  }

  return { rating, value, thresholds };
}
