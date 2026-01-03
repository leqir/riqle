import { handlers } from '@/auth';

/**
 * NextAuth.js v5 API Route Handler
 *
 * This file exports the GET and POST handlers for NextAuth.
 * These handle all authentication requests including:
 * - Sign in
 * - Sign out
 * - Callback
 * - Session
 * - CSRF token
 * - Providers
 *
 * The [...nextauth] catch-all route handles all these endpoints automatically.
 *
 * Endpoints:
 * - GET  /api/auth/session - Get current session
 * - GET  /api/auth/providers - Get configured providers
 * - GET  /api/auth/csrf - Get CSRF token
 * - POST /api/auth/signin/:provider - Sign in with provider
 * - POST /api/auth/signout - Sign out
 * - GET  /api/auth/callback/:provider - OAuth callback
 */
export const { GET, POST } = handlers;
