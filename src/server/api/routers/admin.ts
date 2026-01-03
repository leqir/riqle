/**
 * Admin Router
 *
 * Handles all admin-only operations:
 * - User management (roles, entitlements)
 * - System stats and analytics
 * - Audit logs
 */

import { z } from 'zod';
import { createTRPCRouter, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Validation schemas
const getUsersSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().cuid().optional(),
  search: z.string().optional(),
});

const assignRoleSchema = z.object({
  userId: z.string().cuid(),
  roleName: z.enum(['admin', 'editor', 'customer']),
});

const grantEntitlementSchema = z.object({
  userId: z.string().cuid(),
  productId: z.string().cuid(),
  expiresAt: z.date().optional().nullable(),
  reason: z.string().optional(),
});

const revokeEntitlementSchema = z.object({
  userId: z.string().cuid(),
  productId: z.string().cuid(),
  reason: z.string(),
});

const getAuditLogsSchema = z.object({
  limit: z.number().min(1).max(100).default(50),
  cursor: z.string().cuid().optional(),
  action: z.string().optional(),
  entity: z.string().optional(),
  userId: z.string().cuid().optional(),
});

export const adminRouter = createTRPCRouter({
  /**
   * ADMIN: Get system statistics
   */
  getStats: adminProcedure.query(async ({ ctx }) => {
    const [
      totalUsers,
      totalOrders,
      totalRevenue,
      totalProducts,
      totalPosts,
      activeEntitlements,
      recentOrders,
    ] = await Promise.all([
      ctx.db.user.count(),
      ctx.db.order.count(),
      ctx.db.order.aggregate({
        where: { status: 'completed' },
        _sum: { total: true },
      }),
      ctx.db.product.count({ where: { status: 'published' } }),
      ctx.db.post.count({ where: { status: 'published' } }),
      ctx.db.entitlement.count({ where: { active: true } }),
      ctx.db.order.count({
        where: {
          createdAt: {
            gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Last 30 days
          },
        },
      }),
    ]);

    return {
      users: {
        total: totalUsers,
      },
      orders: {
        total: totalOrders,
        recent: recentOrders,
      },
      revenue: {
        total: totalRevenue._sum.total || 0,
      },
      products: {
        total: totalProducts,
      },
      posts: {
        total: totalPosts,
      },
      entitlements: {
        active: activeEntitlements,
      },
    };
  }),

  /**
   * ADMIN: Get all users with pagination
   */
  getUsers: adminProcedure.input(getUsersSchema).query(async ({ ctx, input }) => {
    const { limit, cursor, search } = input;

    const where = search
      ? {
          OR: [
            { email: { contains: search, mode: 'insensitive' as const } },
            { name: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const users = await ctx.db.user.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        userRoles: {
          include: {
            role: true,
          },
        },
        orders: {
          select: {
            id: true,
            total: true,
            status: true,
            createdAt: true,
          },
        },
        entitlements: {
          where: { active: true },
          include: {
            product: true,
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (users.length > limit) {
      const nextItem = users.pop();
      nextCursor = nextItem!.id;
    }

    return {
      users,
      nextCursor,
    };
  }),

  /**
   * ADMIN: Get a specific user by ID
   */
  getUserById: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { id: input.id },
        include: {
          userRoles: {
            include: {
              role: true,
            },
          },
          orders: {
            include: {
              items: {
                include: {
                  product: true,
                },
              },
            },
            orderBy: { createdAt: 'desc' },
          },
          entitlements: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with id "${input.id}" not found`,
        });
      }

      return user;
    }),

  /**
   * ADMIN: Assign a role to a user
   */
  assignRole: adminProcedure.input(assignRoleSchema).mutation(async ({ ctx, input }) => {
    const { userId, roleName } = input;

    // Check if user exists
    const user = await ctx.db.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `User with id "${userId}" not found`,
      });
    }

    // Get role
    const role = await ctx.db.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Role "${roleName}" not found`,
      });
    }

    // Check if user already has this role
    const existingUserRole = await ctx.db.userRole.findUnique({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });

    if (existingUserRole) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `User already has role "${roleName}"`,
      });
    }

    // Assign role
    const userRole = await ctx.db.userRole.create({
      data: {
        userId,
        roleId: role.id,
      },
      include: {
        role: true,
        user: true,
      },
    });

    // Create audit log
    await ctx.db.auditLog.create({
      data: {
        userId: ctx.session.user.id,
        action: 'role_assign',
        entity: 'user',
        entityId: userId,
        details: { roleName },
      },
    });

    return userRole;
  }),

  /**
   * ADMIN: Remove a role from a user
   */
  removeRole: adminProcedure.input(assignRoleSchema).mutation(async ({ ctx, input }) => {
    const { userId, roleName } = input;

    // Get role
    const role = await ctx.db.role.findUnique({
      where: { name: roleName },
    });

    if (!role) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Role "${roleName}" not found`,
      });
    }

    // Check if user has this role
    const userRole = await ctx.db.userRole.findUnique({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });

    if (!userRole) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `User does not have role "${roleName}"`,
      });
    }

    // Remove role
    await ctx.db.userRole.delete({
      where: {
        userId_roleId: {
          userId,
          roleId: role.id,
        },
      },
    });

    // Create audit log
    await ctx.db.auditLog.create({
      data: {
        userId: ctx.session.user.id,
        action: 'role_remove',
        entity: 'user',
        entityId: userId,
        details: { roleName },
      },
    });

    return { success: true };
  }),

  /**
   * ADMIN: Manually grant product access to a user
   */
  grantEntitlement: adminProcedure
    .input(grantEntitlementSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, productId, expiresAt, reason } = input;

      // Check if user exists
      const user = await ctx.db.user.findUnique({
        where: { id: userId },
      });

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `User with id "${userId}" not found`,
        });
      }

      // Check if product exists
      const product = await ctx.db.product.findUnique({
        where: { id: productId },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with id "${productId}" not found`,
        });
      }

      // Check if entitlement already exists
      const existing = await ctx.db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      let entitlement;

      if (existing) {
        // Reactivate existing entitlement
        entitlement = await ctx.db.entitlement.update({
          where: { id: existing.id },
          data: {
            active: true,
            expiresAt,
            revokedAt: null,
            revokeReason: null,
          },
          include: {
            product: true,
            user: true,
          },
        });
      } else {
        // Create new entitlement
        entitlement = await ctx.db.entitlement.create({
          data: {
            userId,
            productId,
            active: true,
            expiresAt,
          },
          include: {
            product: true,
            user: true,
          },
        });
      }

      // Create audit log
      await ctx.db.auditLog.create({
        data: {
          userId: ctx.session.user.id,
          action: 'manual_access_grant',
          entity: 'entitlement',
          entityId: entitlement.id,
          details: {
            productId,
            targetUserId: userId,
            reason,
            expiresAt,
          },
        },
      });

      return entitlement;
    }),

  /**
   * ADMIN: Revoke product access from a user
   */
  revokeEntitlement: adminProcedure
    .input(revokeEntitlementSchema)
    .mutation(async ({ ctx, input }) => {
      const { userId, productId, reason } = input;

      // Check if entitlement exists
      const entitlement = await ctx.db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (!entitlement) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Entitlement not found',
        });
      }

      // Revoke entitlement
      const updated = await ctx.db.entitlement.update({
        where: { id: entitlement.id },
        data: {
          active: false,
          revokedAt: new Date(),
          revokeReason: reason,
        },
        include: {
          product: true,
          user: true,
        },
      });

      // Create audit log
      await ctx.db.auditLog.create({
        data: {
          userId: ctx.session.user.id,
          action: 'manual_access_revoke',
          entity: 'entitlement',
          entityId: entitlement.id,
          details: {
            productId,
            targetUserId: userId,
            reason,
          },
        },
      });

      return updated;
    }),

  /**
   * ADMIN: Get audit logs
   */
  getAuditLogs: adminProcedure.input(getAuditLogsSchema).query(async ({ ctx, input }) => {
    const { limit, cursor, action, entity, userId } = input;

    const where = {
      ...(action && { action }),
      ...(entity && { entity }),
      ...(userId && { userId }),
    };

    const logs = await ctx.db.auditLog.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (logs.length > limit) {
      const nextItem = logs.pop();
      nextCursor = nextItem!.id;
    }

    return {
      logs,
      nextCursor,
    };
  }),

  /**
   * ADMIN: Get all roles
   */
  getRoles: adminProcedure.query(async ({ ctx }) => {
    const roles = await ctx.db.role.findMany({
      include: {
        _count: {
          select: {
            userRoles: true,
          },
        },
      },
    });

    return roles;
  }),
});
