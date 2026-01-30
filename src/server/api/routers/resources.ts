/**
 * Resources Router
 *
 * Handles resource browsing, filtering, and category navigation:
 * - Public: getCategories, getResources, getBreadcrumbs, getFilterOptions
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import type { Prisma } from '@prisma/client';

// Validation schemas
const getCategoriesSchema = z.object({
  parentPath: z.string().optional(),
  includeEmpty: z.boolean().default(false),
});

const getResourcesSchema = z.object({
  categoryPath: z.string().optional(),
  search: z.string().min(2).optional(),
  tags: z.array(z.string()).optional(),
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
  sortBy: z.enum(['displayOrder', 'createdAt', 'title', 'priceInCents']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

const getBreadcrumbsSchema = z.object({
  path: z.string(),
});

const getFilterOptionsSchema = z.object({
  categoryPath: z.string().optional(),
});

export const resourcesRouter = createTRPCRouter({
  /**
   * PUBLIC: Get categories with product counts
   */
  getCategories: publicProcedure.input(getCategoriesSchema).query(async ({ ctx, input }) => {
    const { parentPath, includeEmpty } = input;

    // Build where clause
    const where: Prisma.ResourceCategoryWhereInput = {
      published: true,
    };

    // Filter by parent path if provided
    if (parentPath) {
      // Find parent category first
      const parent = await ctx.db.resourceCategory.findUnique({
        where: { path: parentPath },
      });

      if (!parent) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with path "${parentPath}" not found`,
        });
      }

      where.parentId = parent.id;
    } else {
      // Get root categories (no parent)
      where.parentId = null;
    }

    // Fetch categories
    const categories = await ctx.db.resourceCategory.findMany({
      where,
      orderBy: { displayOrder: 'asc' },
      include: {
        _count: {
          select: {
            products: {
              where: {
                product: {
                  published: true,
                },
              },
            },
          },
        },
        children: {
          where: { published: true },
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    // Filter out empty categories if requested
    if (!includeEmpty) {
      return categories.filter((cat) => cat._count.products > 0 || cat.children.length > 0);
    }

    return categories;
  }),

  /**
   * PUBLIC: Get resources with filtering and pagination
   */
  getResources: publicProcedure.input(getResourcesSchema).query(async ({ ctx, input }) => {
    const { categoryPath, search, tags, limit, cursor, sortBy, sortOrder } = input;

    // Build where clause for products
    const where: Prisma.ProductWhereInput = {
      published: true,
    };

    // Filter by category path (including descendants)
    if (categoryPath) {
      // Find the category
      const category = await ctx.db.resourceCategory.findUnique({
        where: { path: categoryPath },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with path "${categoryPath}" not found`,
        });
      }

      // Include products from this category and all descendant categories
      where.categories = {
        some: {
          category: {
            OR: [{ id: category.id }, { path: { startsWith: `${categoryPath}/` } }],
          },
        },
      };
    }

    // Apply search filter
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { whatItCovers: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Apply tag filter
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    // Build orderBy clause
    const orderBy: Prisma.ProductOrderByWithRelationInput = {};
    if (sortBy === 'displayOrder') {
      // When sorting by displayOrder, we need to join with ProductCategory
      // For simplicity, we'll sort by createdAt as fallback
      orderBy.createdAt = sortOrder;
    } else {
      orderBy[sortBy] = sortOrder;
    }

    // Fetch products with pagination
    const products = await ctx.db.product.findMany({
      where,
      take: limit + 1, // Fetch one extra to determine if there's a next page
      cursor: cursor ? { id: cursor } : undefined,
      orderBy,
      include: {
        categories: {
          include: {
            category: {
              select: {
                id: true,
                name: true,
                slug: true,
                path: true,
                level: true,
              },
            },
          },
          orderBy: {
            isPrimary: 'desc', // Primary category first
          },
        },
      },
    });

    // Determine next cursor
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
   * PUBLIC: Get breadcrumb trail for a category path
   */
  getBreadcrumbs: publicProcedure.input(getBreadcrumbsSchema).query(async ({ ctx, input }) => {
    const { path } = input;

    // Split path into segments
    const segments = path.split('/');
    const breadcrumbs = [];

    // Build paths for each segment
    let currentPath = '';
    for (const segment of segments) {
      currentPath = currentPath ? `${currentPath}/${segment}` : segment;

      const category = await ctx.db.resourceCategory.findUnique({
        where: { path: currentPath },
        select: {
          id: true,
          name: true,
          slug: true,
          path: true,
          level: true,
        },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with path "${currentPath}" not found`,
        });
      }

      breadcrumbs.push(category);
    }

    return breadcrumbs;
  }),

  /**
   * PUBLIC: Get available filter options for faceted filtering
   */
  getFilterOptions: publicProcedure.input(getFilterOptionsSchema).query(async ({ ctx, input }) => {
    const { categoryPath } = input;

    // Build where clause
    const where: Prisma.ProductWhereInput = {
      published: true,
    };

    // Filter by category path if provided
    if (categoryPath) {
      const category = await ctx.db.resourceCategory.findUnique({
        where: { path: categoryPath },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with path "${categoryPath}" not found`,
        });
      }

      where.categories = {
        some: {
          category: {
            OR: [{ id: category.id }, { path: { startsWith: `${categoryPath}/` } }],
          },
        },
      };
    }

    // Get all products matching the base filter
    const products = await ctx.db.product.findMany({
      where,
      select: {
        tags: true,
        priceInCents: true,
        format: true,
      },
    });

    // Extract unique tags
    const tagsSet = new Set<string>();
    const formatsSet = new Set<string>();
    let minPrice = Infinity;
    let maxPrice = -Infinity;

    for (const product of products) {
      // Collect tags
      for (const tag of product.tags) {
        tagsSet.add(tag);
      }

      // Collect formats
      formatsSet.add(product.format);

      // Track price range
      if (product.priceInCents < minPrice) minPrice = product.priceInCents;
      if (product.priceInCents > maxPrice) maxPrice = product.priceInCents;
    }

    return {
      tags: Array.from(tagsSet).sort(),
      formats: Array.from(formatsSet).sort(),
      priceRange: {
        min: minPrice === Infinity ? 0 : minPrice,
        max: maxPrice === -Infinity ? 0 : maxPrice,
      },
    };
  }),

  /**
   * PUBLIC: Get a single category by path
   */
  getCategoryByPath: publicProcedure
    .input(z.object({ path: z.string() }))
    .query(async ({ ctx, input }) => {
      const category = await ctx.db.resourceCategory.findUnique({
        where: { path: input.path },
        include: {
          parent: {
            select: {
              id: true,
              name: true,
              slug: true,
              path: true,
            },
          },
          children: {
            where: { published: true },
            orderBy: { displayOrder: 'asc' },
            include: {
              _count: {
                select: {
                  products: {
                    where: {
                      product: {
                        published: true,
                      },
                    },
                  },
                },
              },
            },
          },
          _count: {
            select: {
              products: {
                where: {
                  product: {
                    published: true,
                  },
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Category with path "${input.path}" not found`,
        });
      }

      if (!category.published) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This category is not published',
        });
      }

      return category;
    }),
});
