/**
 * Next.js App Router API handler for tRPC
 *
 * This file exposes the tRPC API as HTTP endpoints.
 * It uses the fetch adapter for App Router compatibility.
 *
 * @see https://trpc.io/docs/server/adapters/nextjs
 */

import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { type NextRequest } from 'next/server';
import { appRouter } from '@/server/api/root';
import { createTRPCContext } from '@/server/api/context';
import { env } from '@/env';

/**
 * Handler function for all tRPC requests
 */
const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ req }),
    onError:
      env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC failed on ${path ?? '<no-path>'}: ${error.message}`);
            if (error.code === 'INTERNAL_SERVER_ERROR') {
              console.error('Error details:', error);
            }
          }
        : undefined,
  });

/**
 * Export handler for both GET and POST requests
 */
export { handler as GET, handler as POST };
