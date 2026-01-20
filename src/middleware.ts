import { type NextRequest, NextResponse } from 'next/server';
import { generateRequestId } from './lib/request-id';

/**
 * Middleware
 *
 * This middleware:
 * 1. Injects request ID into all requests for tracing
 *
 * Note: NextAuth v5 handles authentication automatically via the API routes.
 * We don't need auth middleware for route protection - that's handled by
 * the authorized() callback in auth.config.ts
 */
export function middleware(request: NextRequest) {
  // Get existing request ID or generate a new one
  const requestId = request.headers.get('x-request-id') || generateRequestId();

  // Clone the request headers and add the request ID
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-request-id', requestId);

  // Create the response with the request ID header
  const response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Also expose request ID in response for client-side tracking
  response.headers.set('x-request-id', requestId);

  return response;
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth endpoints - handled by NextAuth)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (static files)
     * - public files (images, etc)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
