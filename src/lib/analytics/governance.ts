/**
 * Analytics Governance
 *
 * Ensures analytics remain minimal and intentional
 */

import { AnalyticsEvent } from './events';

export interface MetricGovernance {
  totalMetrics: number;
  maxMetrics: number;
  lastReview: Date;
  unusedMetrics: string[];
}

export async function reviewAnalyticsGovernance(): Promise<MetricGovernance> {
  // Get current metrics
  const currentMetrics = Object.values(AnalyticsEvent);

  // Check against maximum
  const maxMetrics = 15;

  // Identify unused metrics (not logged in last 30 days)
  const unusedMetrics = await identifyUnusedMetrics();

  return {
    totalMetrics: currentMetrics.length,
    maxMetrics,
    lastReview: new Date(),
    unusedMetrics,
  };
}

async function identifyUnusedMetrics(): Promise<string[]> {
  // Query analytics to find events not logged in 30 days
  // Return list of unused event names
  // TODO: Implement based on analytics provider
  return [];
}

// Quarterly review checklist
export function generateQuarterlyReview(): string {
  const totalEvents = Object.values(AnalyticsEvent).length;

  return `
# Quarterly Analytics Review

## Current State
- Total metrics tracked: ${totalEvents}
- Maximum allowed: 15

## Questions
1. Can I explain why every metric exists?
2. Have I reviewed every metric this quarter?
3. Are there unused metrics to remove?
4. Do metrics still answer core questions?
5. Am I checking analytics too frequently?

## Actions
- [ ] Remove unused metrics
- [ ] Update metric definitions if needed
- [ ] Verify privacy compliance
- [ ] Document any changes
  `;
}
