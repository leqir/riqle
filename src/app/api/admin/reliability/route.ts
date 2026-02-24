/**
 * Reliability Monitoring Endpoint
 *
 * Provides visibility into circuit breakers, bulkheads, and feature flags.
 * Admin-only endpoint for monitoring system health and reliability patterns.
 */

import { NextResponse } from 'next/server';
import { circuitBreakers } from '@/lib/reliability/circuit-breaker';
import { bulkheads } from '@/lib/reliability/fault-isolation';
import { featureFlags } from '@/lib/reliability/graceful-degradation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET(_request: Request) {
  try {
    // Collect circuit breaker states
    const circuitBreakerStates = Array.from(circuitBreakers.getAll().entries()).map(
      ([name, breaker]) => ({
        name,
        state: breaker.getState(),
      })
    );

    // Collect bulkhead stats
    const bulkheadStats = bulkheads.getAllStats();

    // Collect feature flags
    const flags = featureFlags.getAll();

    const response = {
      timestamp: new Date().toISOString(),
      circuitBreakers: circuitBreakerStates,
      bulkheads: bulkheadStats,
      featureFlags: flags,
      summary: {
        totalCircuitBreakers: circuitBreakerStates.length,
        openCircuits: circuitBreakerStates.filter((cb) => cb.state === 'OPEN').length,
        halfOpenCircuits: circuitBreakerStates.filter((cb) => cb.state === 'HALF_OPEN').length,
        totalBulkheads: bulkheadStats.length,
        activeBulkheads: bulkheadStats.filter((b) => b.activeCount > 0).length,
        disabledFeatures: Object.entries(flags)
          .filter(([_, enabled]) => !enabled)
          .map(([name]) => name),
      },
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    console.error('[Reliability Monitor] Failed to fetch stats:', error);

    return NextResponse.json(
      {
        error: 'Failed to retrieve reliability stats',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

/**
 * Reset a specific circuit breaker or all circuit breakers
 * POST /api/admin/reliability?action=reset&circuit=<name>
 * POST /api/admin/reliability?action=reset&circuit=all
 */
export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const circuit = searchParams.get('circuit');
    const feature = searchParams.get('feature');
    const enabled = searchParams.get('enabled');

    // Reset circuit breaker
    if (action === 'reset' && circuit) {
      if (circuit === 'all') {
        circuitBreakers.resetAll();
        return NextResponse.json({
          success: true,
          message: 'All circuit breakers reset',
        });
      } else {
        circuitBreakers.reset(circuit);
        return NextResponse.json({
          success: true,
          message: `Circuit breaker '${circuit}' reset`,
        });
      }
    }

    // Toggle feature flag
    if (action === 'toggle-feature' && feature && enabled !== null) {
      const isEnabled = enabled === 'true';
      if (isEnabled) {
        featureFlags.enable(feature);
      } else {
        featureFlags.disable(feature);
      }

      return NextResponse.json({
        success: true,
        message: `Feature '${feature}' ${isEnabled ? 'enabled' : 'disabled'}`,
        feature,
        enabled: isEnabled,
      });
    }

    return NextResponse.json({ error: 'Invalid action or parameters' }, { status: 400 });
  } catch (error) {
    console.error('[Reliability Monitor] Action failed:', error);

    return NextResponse.json(
      {
        error: 'Failed to perform action',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Usage:
 *
 * GET /api/admin/reliability
 * Returns current state of all reliability patterns
 *
 * POST /api/admin/reliability?action=reset&circuit=stripe-api
 * Resets the 'stripe-api' circuit breaker
 *
 * POST /api/admin/reliability?action=reset&circuit=all
 * Resets all circuit breakers
 *
 * POST /api/admin/reliability?action=toggle-feature&feature=analytics&enabled=false
 * Disables the 'analytics' feature flag
 */
