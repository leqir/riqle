import { type FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { db } from '@/lib/db';
import { getServerAuthSession } from '@/server/auth';

/**
 * Creates context for tRPC requests.
 * This runs for every request and provides:
 * - Database client (db)
 * - User session (if authenticated)
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: FetchCreateContextFnOptions) => {
  const session = await getServerAuthSession();

  return {
    db,
    session,
    headers: opts.req.headers,
  };
};

export type Context = Awaited<ReturnType<typeof createTRPCContext>>;
