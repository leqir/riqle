/**
 * Root Router
 *
 * This is the primary router for the tRPC server.
 * It combines all domain routers into a single API.
 *
 * All routers added in /api/routers should be manually added here.
 */

import { createTRPCRouter } from './trpc';
import { postsRouter } from './routers/posts';
import { productsRouter } from './routers/products';
import { ordersRouter } from './routers/orders';
import { adminRouter } from './routers/admin';
import { checkoutRouter } from './routers/checkout';
import { resourcesRouter } from './routers/resources';

/**
 * Root application router
 */
export const appRouter = createTRPCRouter({
  posts: postsRouter,
  products: productsRouter,
  orders: ordersRouter,
  admin: adminRouter,
  checkout: checkoutRouter,
  resources: resourcesRouter,
});

/**
 * Export type definition of API
 * This type is used by the client to get full type safety
 */
export type AppRouter = typeof appRouter;
