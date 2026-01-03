/**
 * Products Router
 *
 * Handles all product operations:
 * - Public: getAll, getBySlug, getById
 * - Admin: create, update, delete, manage prices
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Validation schemas
const createProductSchema = z.object({
  name: z.string().min(1, 'Name is required').max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  description: z.string().min(1, 'Description is required'),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  type: z.enum(['resource', 'course', 'bundle']).default('resource'),
  files: z.array(z.string()).optional(),
  prices: z
    .array(
      z.object({
        amount: z.number().int().positive('Price must be positive'),
        currency: z.string().length(3).default('USD'),
        interval: z.enum(['month', 'year']).optional().nullable(),
        active: z.boolean().default(true),
      })
    )
    .optional(),
});

const updateProductSchema = createProductSchema.partial().extend({
  id: z.string().cuid(),
});

const getProductsSchema = z.object({
  limit: z.number().min(1).max(100).default(10),
  cursor: z.string().cuid().optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  type: z.enum(['resource', 'course', 'bundle']).optional(),
});

const createPriceSchema = z.object({
  productId: z.string().cuid(),
  amount: z.number().int().positive('Price must be positive'),
  currency: z.string().length(3).default('USD'),
  interval: z.enum(['month', 'year']).optional().nullable(),
  stripePriceId: z.string().optional().nullable(),
  active: z.boolean().default(true),
});

const updatePriceSchema = z.object({
  id: z.string().cuid(),
  active: z.boolean().optional(),
  amount: z.number().int().positive().optional(),
});

export const productsRouter = createTRPCRouter({
  /**
   * PUBLIC: Get all published products with pagination
   */
  getAll: publicProcedure.input(getProductsSchema).query(async ({ ctx, input }) => {
    const { limit, cursor, status, type } = input;

    const where = {
      ...(status ? { status } : { status: 'published' }),
      ...(type && { type }),
    };

    const products = await ctx.db.product.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        prices: {
          where: { active: true },
          orderBy: { amount: 'asc' },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (products.length > limit) {
      const nextItem = products.pop();
      nextCursor = nextItem!.id;
    }

    return {
      products,
      nextCursor,
    };
  }),

  /**
   * PUBLIC: Get a single product by slug
   */
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const product = await ctx.db.product.findUnique({
      where: { slug: input.slug },
      include: {
        prices: {
          where: { active: true },
          orderBy: { amount: 'asc' },
        },
      },
    });

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Product with slug "${input.slug}" not found`,
      });
    }

    // Only show published products to public
    if (product.status !== 'published' && !ctx.session?.user) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'This product is not published',
      });
    }

    return product;
  }),

  /**
   * PUBLIC: Get a single product by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const product = await ctx.db.product.findUnique({
        where: { id: input.id },
        include: {
          prices: {
            where: { active: true },
            orderBy: { amount: 'asc' },
          },
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with id "${input.id}" not found`,
        });
      }

      // Only show published products to public
      if (product.status !== 'published' && !ctx.session?.user) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This product is not published',
        });
      }

      return product;
    }),

  /**
   * ADMIN: Create a new product
   */
  create: adminProcedure.input(createProductSchema).mutation(async ({ ctx, input }) => {
    const { prices, ...productData } = input;

    // Check for duplicate slug
    const existingProduct = await ctx.db.product.findUnique({
      where: { slug: input.slug },
    });

    if (existingProduct) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `Product with slug "${input.slug}" already exists`,
      });
    }

    // Create product with prices
    const product = await ctx.db.product.create({
      data: {
        ...productData,
        prices: prices
          ? {
              create: prices,
            }
          : undefined,
      },
      include: {
        prices: true,
      },
    });

    return product;
  }),

  /**
   * ADMIN: Update a product
   */
  update: adminProcedure.input(updateProductSchema).mutation(async ({ ctx, input }) => {
    const { id, prices: _prices, ...updateData } = input;

    // Check if product exists
    const existingProduct = await ctx.db.product.findUnique({
      where: { id },
    });

    if (!existingProduct) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Product with id "${id}" not found`,
      });
    }

    // Check for slug conflict if slug is being updated
    if (updateData.slug && updateData.slug !== existingProduct.slug) {
      const slugConflict = await ctx.db.product.findUnique({
        where: { slug: updateData.slug },
      });

      if (slugConflict) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Product with slug "${updateData.slug}" already exists`,
        });
      }
    }

    // Update product (prices are managed separately)
    const product = await ctx.db.product.update({
      where: { id },
      data: updateData,
      include: {
        prices: true,
      },
    });

    return product;
  }),

  /**
   * ADMIN: Delete a product (soft delete by archiving)
   */
  delete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const existingProduct = await ctx.db.product.findUnique({
        where: { id: input.id },
      });

      if (!existingProduct) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Product with id "${input.id}" not found`,
        });
      }

      // Soft delete by archiving
      await ctx.db.product.update({
        where: { id: input.id },
        data: { status: 'archived' },
      });

      return { success: true };
    }),

  /**
   * ADMIN: Add a price to a product
   */
  addPrice: adminProcedure.input(createPriceSchema).mutation(async ({ ctx, input }) => {
    // Verify product exists
    const product = await ctx.db.product.findUnique({
      where: { id: input.productId },
    });

    if (!product) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Product with id "${input.productId}" not found`,
      });
    }

    const price = await ctx.db.price.create({
      data: input,
    });

    return price;
  }),

  /**
   * ADMIN: Update a price
   */
  updatePrice: adminProcedure.input(updatePriceSchema).mutation(async ({ ctx, input }) => {
    const { id, ...updateData } = input;

    const existingPrice = await ctx.db.price.findUnique({
      where: { id },
    });

    if (!existingPrice) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Price with id "${id}" not found`,
      });
    }

    const price = await ctx.db.price.update({
      where: { id },
      data: updateData,
    });

    return price;
  }),

  /**
   * ADMIN: Delete a price
   */
  deletePrice: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const existingPrice = await ctx.db.price.findUnique({
        where: { id: input.id },
      });

      if (!existingPrice) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Price with id "${input.id}" not found`,
        });
      }

      await ctx.db.price.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
