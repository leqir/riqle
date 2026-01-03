import { type NextRequest, NextResponse } from 'next/server';
import { createRequestLogger } from '@/lib/logger';
import { getRequestId } from '@/lib/request-id';
import { handleApiError } from '@/lib/api-error-handler';

export async function GET(req: NextRequest) {
  const requestId = req.headers.get('x-request-id') || (await getRequestId());
  const logger = createRequestLogger(requestId || '');

  try {
    logger.info('health_check_started', {
      path: req.nextUrl.pathname,
    });

    // TODO: Add database health check when Prisma is set up
    // await db.$queryRaw`SELECT 1`;

    const response = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      requestId,
      checks: {
        api: 'ok',
        database: 'pending', // Will be 'ok' after DB setup
      },
    };

    logger.info('health_check_passed', {
      checks: response.checks,
    });

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    logger.error(
      'health_check_failed',
      error instanceof Error ? error : new Error('Unknown error'),
      {
        timestamp: new Date().toISOString(),
      }
    );

    return handleApiError(error, {
      action: 'health_check',
      metadata: {
        requestId,
      },
    });
  }
}
