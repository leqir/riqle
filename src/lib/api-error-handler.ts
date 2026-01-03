import * as Sentry from '@sentry/nextjs';
import { type NextRequest, NextResponse } from 'next/server';
import { logErrorEvent, createRequestLogger } from './logger';
import { getRequestId } from './request-id';
import 'server-only';

export type ApiErrorHandlerOptions = {
  userId?: string;
  action?: string;
  metadata?: Record<string, unknown>;
};

/**
 * Wraps API route handlers with error handling and Sentry integration
 */
export function withApiErrorHandler<
  T extends (req: NextRequest, ...args: any[]) => Promise<NextResponse | Response>,
>(handler: T) {
  return async (req: NextRequest, ...args: any[]): Promise<NextResponse> => {
    const requestId = req.headers.get('x-request-id') || (await getRequestId());
    const logger = createRequestLogger(requestId || '');

    try {
      // Execute the handler
      const response = await handler(req, ...args);

      // Log successful API call
      if (response instanceof NextResponse && response.status >= 400) {
        logger.warn('api_error_response', {
          status: response.status,
          url: req.nextUrl.pathname,
        });
      }

      return response;
    } catch (error) {
      // Log the error
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';

      logger.error('api_handler_error', new Error(errorMessage), {
        url: req.nextUrl.pathname,
        method: req.method,
      });

      // Capture in Sentry with full context
      Sentry.captureException(error, {
        contexts: {
          request: {
            url: req.nextUrl.pathname,
            method: req.method,
            requestId,
          },
        },
        tags: {
          type: 'api_error',
        },
      });

      // Return error response
      return NextResponse.json(
        {
          error: {
            message: 'Internal server error',
            requestId,
          },
        },
        { status: 500 }
      );
    }
  };
}

/**
 * Handle specific error types and return appropriate HTTP responses
 */
export function handleApiError(error: unknown, options: ApiErrorHandlerOptions = {}): NextResponse {
  const requestId = options.metadata?.requestId as string | undefined;

  // Log the error
  if (error instanceof Error) {
    logErrorEvent(error, {
      userId: options.userId,
      requestId,
      action: options.action,
      metadata: options.metadata,
    });
  }

  // Determine status code based on error type
  let status = 500;
  let message = 'Internal server error';

  if (error instanceof Error) {
    if (error.message.includes('Not found') || error.message.includes('not found')) {
      status = 404;
      message = 'Not found';
    } else if (error.message.includes('Unauthorized') || error.message.includes('unauthorized')) {
      status = 401;
      message = 'Unauthorized';
    } else if (error.message.includes('Forbidden') || error.message.includes('forbidden')) {
      status = 403;
      message = 'Forbidden';
    } else if (error.message.includes('Validation') || error.message.includes('validation')) {
      status = 400;
      message = 'Validation error';
    }
  }

  return NextResponse.json(
    {
      error: {
        message,
        requestId,
      },
    },
    { status }
  );
}

/**
 * Validate request and return early if invalid
 */
export async function validateRequest(
  req: NextRequest,
  options: {
    method?: string | string[];
    contentType?: string;
  } = {}
): Promise<{ valid: boolean; error?: NextResponse }> {
  if (options.method) {
    const allowedMethods = Array.isArray(options.method) ? options.method : [options.method];
    if (!allowedMethods.includes(req.method)) {
      return {
        valid: false,
        error: NextResponse.json({ error: { message: 'Method not allowed' } }, { status: 405 }),
      };
    }
  }

  if (options.contentType) {
    const contentType = req.headers.get('content-type');
    if (!contentType?.includes(options.contentType)) {
      return {
        valid: false,
        error: NextResponse.json({ error: { message: 'Invalid content type' } }, { status: 400 }),
      };
    }
  }

  return { valid: true };
}
