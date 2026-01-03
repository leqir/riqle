/**
 * Server-side tRPC client
 *
 * This is used to call tRPC procedures from React Server Components.
 * It provides type-safe access to all tRPC procedures without HTTP overhead.
 *
 * @see https://trpc.io/docs/client/nextjs/server-side-calls
 */

import 'server-only';
import { cache } from 'react';
import { headers } from 'next/headers';
import { createTRPCContext } from '@/server/api/context';
import { appRouter } from '@/server/api/root';
import { createCallerFactory } from '@/server/api/trpc';

/**
 * Creates tRPC context for server-side calls
 * Cached per request to avoid recreating context
 */
const createContext = cache(async () => {
  const heads = await headers();

  return createTRPCContext({
    req: {
      headers: heads,
    },
  });
});

/**
 * Server-side API caller
 * Use this in React Server Components to call tRPC procedures
 *
 * @example
 * ```tsx
 * import { api } from '@/trpc/server'
 *
 * export default async function Page() {
 *   const posts = await api.posts.getAll({ limit: 10 })
 *   return <div>{posts.posts.map(...)}</div>
 * }
 * ```
 */
export const api = createCallerFactory(appRouter)(createContext);
