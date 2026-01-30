/**
 * TRPC Client Configuration
 *
 * Sets up the TRPC client for use in client components
 */

import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@/server/api/root';

/**
 * TRPC React client
 * Use this in client components with api.routerName.procedureName.useQuery()
 */
export const api = createTRPCReact<AppRouter>();
