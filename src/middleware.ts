import { type NextRequest, NextResponse } from 'next/server';
import { generateRequestId } from './lib/request-id';
import NextAuth from 'next-auth';
import { authConfig } from '@/auth.config';

const { auth } = NextAuth(authConfig);

/**
 * Combined Middleware
 *
 * This middleware:
 * 1. Runs NextAuth authentication checks (via the auth callback)
 * 2. Injects request ID into all requests for tracing
 *
 * The order is important:
 * - Auth runs first to handle authentication/authorization
 * - Then request ID is added for observability
 */
export default auth(async function middleware(request: NextRequest) {
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
});

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
