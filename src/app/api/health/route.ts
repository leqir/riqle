import { db } from '@/lib/db';
import { NextResponse } from 'next/server';

/**
 * Database Health Check Endpoint
 * Epic 0 Story 0.4 - Database healthcheck requirement
 *
 * Returns 200 if database is reachable, 503 if not
 * Response time should be < 1 second
 */
export async function GET() {
  try {
    const start = Date.now();

    // Simple query to test database connectivity
    await db.$queryRaw`SELECT 1`;

    const duration = Date.now() - start;

    return NextResponse.json(
      {
        status: 'healthy',
        database: 'connected',
        responseTime: `${duration}ms`,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);

    return NextResponse.json(
      {
        status: 'unhealthy',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 503 }
    );
  }
}
