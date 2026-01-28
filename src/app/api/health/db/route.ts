/**
 * Database Health Check Endpoint
 *
 * Returns database connection status and basic metrics.
 * Used by monitoring services and load balancers.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db/prisma';
import { withTimeout } from '@/lib/db/with-timeout';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface HealthCheckResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  timestamp: string;
  database: {
    connected: boolean;
    responseTimeMs?: number;
    error?: string;
  };
  details?: {
    version?: string;
  };
}

export async function GET(request: Request) {
  const startTime = Date.now();

  try {
    // Simple query to check database connectivity
    // Using timeout to prevent hanging requests
    await withTimeout(prisma.$queryRaw`SELECT 1 as health_check`, 2000);

    const responseTimeMs = Date.now() - startTime;

    // Get database version (optional)
    let version: string | undefined;
    try {
      const result = await withTimeout(
        prisma.$queryRaw<Array<{ version: string }>>`SELECT version()`,
        1000
      );
      version = result[0]?.version;
    } catch {
      // Version query failed, but main health check passed
      version = undefined;
    }

    const response: HealthCheckResponse = {
      status: responseTimeMs < 1000 ? 'healthy' : 'degraded',
      timestamp: new Date().toISOString(),
      database: {
        connected: true,
        responseTimeMs,
      },
      details: version ? { version } : undefined,
    };

    return NextResponse.json(response, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  } catch (error) {
    const responseTimeMs = Date.now() - startTime;

    const response: HealthCheckResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: {
        connected: false,
        responseTimeMs,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
    };

    console.error('[Health Check] Database health check failed:', error);

    return NextResponse.json(response, {
      status: 503,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },
    });
  }
}

/**
 * Usage:
 *
 * Health check endpoint: GET /api/health/db
 *
 * Response (healthy):
 * {
 *   "status": "healthy",
 *   "timestamp": "2024-01-27T12:00:00.000Z",
 *   "database": {
 *     "connected": true,
 *     "responseTimeMs": 45
 *   }
 * }
 *
 * Response (unhealthy):
 * {
 *   "status": "unhealthy",
 *   "timestamp": "2024-01-27T12:00:00.000Z",
 *   "database": {
 *     "connected": false,
 *     "responseTimeMs": 2050,
 *     "error": "Database query exceeded timeout of 2000ms"
 *   }
 * }
 *
 * Configure your monitoring service (e.g., UptimeRobot, Pingdom) to poll this endpoint.
 */
