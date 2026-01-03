/**
 * Orders Router
 *
 * Handles all order operations:
 * - Protected: getMyOrders, getOrderById
 * - Admin: getAllOrders, updateOrderStatus, refundOrder
 */

import { z } from 'zod';
import { createTRPCRouter, protectedProcedure, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Validation schemas
const getOrdersSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().cuid().optional(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'refunded']).optional(),
  userId: z.string().cuid().optional(),
});

const updateOrderStatusSchema = z.object({
  id: z.string().cuid(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'refunded']),
});

const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().cuid(),
        priceId: z.string().cuid(),
      })
    )
    .min(1, 'At least one item is required'),
  customerEmail: z.string().email(),
  customerName: z.string().optional().nullable(),
});

export const ordersRouter = createTRPCRouter({
  /**
   * PROTECTED: Get current user's orders
   */
  getMyOrders: protectedProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).default(10),
        cursor: z.string().cuid().optional(),
        status: z.enum(['pending', 'processing', 'completed', 'failed', 'refunded']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { limit, cursor, status } = input;

      const where = {
        userId: ctx.session.user.id,
        ...(status && { status }),
      };

      const orders = await ctx.db.order.findMany({
        where,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          items: {
            include: {
              product: true,
              price: true,
            },
          },
          entitlements: true,
        },
      });

      let nextCursor: string | undefined = undefined;
      if (orders.length > limit) {
        const nextItem = orders.pop();
        nextCursor = nextItem!.id;
      }

      return {
        orders,
        nextCursor,
      };
    }),

  /**
   * PROTECTED: Get a specific order by ID (must be owned by user or user is admin)
   */
  getById: protectedProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
        include: {
          items: {
            include: {
              product: true,
              price: true,
            },
          },
          entitlements: true,
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Order with id "${input.id}" not found`,
        });
      }

      // Check if user owns this order or is admin
      const isAdmin = await ctx.db.userRole.findFirst({
        where: {
          userId: ctx.session.user.id,
          role: { name: 'admin' },
        },
      });

      if (order.userId !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only view your own orders',
        });
      }

      return order;
    }),

  /**
   * ADMIN: Get all orders with pagination and filters
   */
  getAll: adminProcedure.input(getOrdersSchema).query(async ({ ctx, input }) => {
    const { limit, cursor, status, userId } = input;

    const where = {
      ...(status && { status }),
      ...(userId && { userId }),
    };

    const orders = await ctx.db.order.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        items: {
          include: {
            product: true,
            price: true,
          },
        },
        entitlements: true,
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
    if (orders.length > limit) {
      const nextItem = orders.pop();
      nextCursor = nextItem!.id;
    }

    return {
      orders,
      nextCursor,
    };
  }),

  /**
   * PROTECTED: Create a new order (for manual testing - production uses Stripe checkout)
   */
  create: protectedProcedure.input(createOrderSchema).mutation(async ({ ctx, input }) => {
    const { items, customerEmail, customerName } = input;

    // Fetch all products and prices to calculate total
    const itemsData = await Promise.all(
      items.map(async (item) => {
        const product = await ctx.db.product.findUnique({
          where: { id: item.productId },
        });

        const price = await ctx.db.price.findUnique({
          where: { id: item.priceId },
        });

        if (!product) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Product with id "${item.productId}" not found`,
          });
        }

        if (!price) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: `Price with id "${item.priceId}" not found`,
          });
        }

        if (price.productId !== product.id) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: `Price "${item.priceId}" does not belong to product "${item.productId}"`,
          });
        }

        return { product, price };
      })
    );

    // Calculate total
    const total = itemsData.reduce((sum, { price }) => sum + price.amount, 0);

    // Create order with items
    const order = await ctx.db.order.create({
      data: {
        userId: ctx.session.user.id,
        customerEmail,
        customerName,
        total,
        currency: 'USD',
        status: 'pending',
        items: {
          create: itemsData.map(({ product, price }) => ({
            productId: product.id,
            priceId: price.id,
            amount: price.amount,
            currency: price.currency,
            productName: product.name,
          })),
        },
      },
      include: {
        items: {
          include: {
            product: true,
            price: true,
          },
        },
      },
    });

    return order;
  }),

  /**
   * ADMIN: Update order status
   */
  updateStatus: adminProcedure.input(updateOrderStatusSchema).mutation(async ({ ctx, input }) => {
    const { id, status } = input;

    const existingOrder = await ctx.db.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Order with id "${id}" not found`,
      });
    }

    const order = await ctx.db.order.update({
      where: { id },
      data: {
        status,
        ...(status === 'completed' && !existingOrder.fulfilledAt
          ? { fulfilledAt: new Date() }
          : {}),
        ...(status === 'refunded' && !existingOrder.refundedAt ? { refundedAt: new Date() } : {}),
      },
      include: {
        items: {
          include: {
            product: true,
            price: true,
          },
        },
        entitlements: true,
      },
    });

    return order;
  }),

  /**
   * ADMIN: Refund an order
   */
  refund: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        reason: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, reason } = input;

      const existingOrder = await ctx.db.order.findUnique({
        where: { id },
        include: {
          entitlements: true,
        },
      });

      if (!existingOrder) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Order with id "${id}" not found`,
        });
      }

      if (existingOrder.status === 'refunded') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Order is already refunded',
        });
      }

      // Update order status and revoke entitlements
      const order = await ctx.db.order.update({
        where: { id },
        data: {
          status: 'refunded',
          refundedAt: new Date(),
        },
        include: {
          items: {
            include: {
              product: true,
              price: true,
            },
          },
          entitlements: true,
        },
      });

      // Revoke all entitlements for this order
      if (existingOrder.entitlements.length > 0) {
        await ctx.db.entitlement.updateMany({
          where: { orderId: id },
          data: {
            active: false,
            revokedAt: new Date(),
            revokeReason: reason || 'Order refunded',
          },
        });
      }

      // Create audit log
      await ctx.db.auditLog.create({
        data: {
          userId: ctx.session.user.id,
          action: 'refund',
          entity: 'order',
          entityId: id,
          details: { reason },
        },
      });

      return order;
    }),

  /**
   * ADMIN: Fulfill an order manually (grant entitlements)
   */
  fulfill: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.db.order.findUnique({
        where: { id: input.id },
        include: {
          items: {
            include: {
              product: true,
            },
          },
          entitlements: true,
        },
      });

      if (!order) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Order with id "${input.id}" not found`,
        });
      }

      if (!order.userId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot fulfill order without a user',
        });
      }

      if (order.status === 'refunded') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot fulfill a refunded order',
        });
      }

      // Create entitlements for each product in the order
      const entitlements = await Promise.all(
        order.items.map(async (item) => {
          // Check if entitlement already exists
          const existing = await ctx.db.entitlement.findUnique({
            where: {
              userId_productId: {
                userId: order.userId!,
                productId: item.productId,
              },
            },
          });

          if (existing) {
            // Reactivate if exists
            return ctx.db.entitlement.update({
              where: { id: existing.id },
              data: {
                active: true,
                revokedAt: null,
                revokeReason: null,
              },
            });
          }

          // Create new entitlement
          return ctx.db.entitlement.create({
            data: {
              userId: order.userId!,
              productId: item.productId,
              orderId: order.id,
              active: true,
            },
          });
        })
      );

      // Update order status
      const updatedOrder = await ctx.db.order.update({
        where: { id: input.id },
        data: {
          status: 'completed',
          fulfilledAt: new Date(),
        },
        include: {
          items: {
            include: {
              product: true,
              price: true,
            },
          },
          entitlements: true,
        },
      });

      // Create audit log
      await ctx.db.auditLog.create({
        data: {
          userId: ctx.session.user.id,
          action: 'manual_fulfillment',
          entity: 'order',
          entityId: input.id,
          details: { entitlementIds: entitlements.map((e) => e.id) },
        },
      });

      return updatedOrder;
    }),
});
