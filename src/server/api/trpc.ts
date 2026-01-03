/**
 * tRPC initialization and procedure definitions.
 *
 * This is the core tRPC setup that defines:
 * - The tRPC instance with context
 * - Base procedures (public, protected, admin)
 * - Error formatting
 * - Middleware for authentication and authorization
 *
 * @see https://trpc.io/docs/server/routers
 */

import { initTRPC, TRPCError } from '@trpc/server';
import { type Context } from './context';
import superjson from 'superjson';
import { ZodError } from 'zod';

/**
 * Initialize tRPC with context type and transformer.
 * SuperJSON allows passing Date, Map, Set, etc. through tRPC
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Reusable middleware to check if user has a specific role.
 */
const checkUserRole = async (userId: string, roleName: string, db: Context['db']) => {
  const userRole = await db.userRole.findFirst({
    where: {
      userId,
      role: {
        name: roleName,
      },
    },
    include: {
      role: true,
    },
  });

  return !!userRole;
};

/**
 * Public procedure - anyone can call this
 */
export const publicProcedure = t.procedure;

/**
 * Protected procedure - requires authentication
 * Throws UNAUTHORIZED error if user is not logged in
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session?.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  return next({
    ctx: {
      // Infers the `session` as non-nullable
      session: { ...ctx.session, user: ctx.session.user },
      db: ctx.db,
      headers: ctx.headers,
    },
  });
});

/**
 * Admin procedure - requires authentication + admin role
 * Throws UNAUTHORIZED if not logged in
 * Throws FORBIDDEN if logged in but not an admin
 */
export const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const isAdmin = await checkUserRole(ctx.session.user.id, 'admin', ctx.db);

  if (!isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be an admin to access this resource',
    });
  }

  return next({
    ctx: {
      session: ctx.session,
      db: ctx.db,
      headers: ctx.headers,
    },
  });
});

/**
 * Editor procedure - requires authentication + editor or admin role
 * Throws UNAUTHORIZED if not logged in
 * Throws FORBIDDEN if logged in but not an editor or admin
 */
export const editorProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  const isEditor = await checkUserRole(ctx.session.user.id, 'editor', ctx.db);
  const isAdmin = await checkUserRole(ctx.session.user.id, 'admin', ctx.db);

  if (!isEditor && !isAdmin) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You must be an editor or admin to access this resource',
    });
  }

  return next({
    ctx: {
      session: ctx.session,
      db: ctx.db,
      headers: ctx.headers,
    },
  });
});

/**
 * Export router and procedure creator
 */
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
