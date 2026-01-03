/**
 * Posts Router
 *
 * Handles all blog post operations:
 * - Public: getAll, getBySlug, getPublished
 * - Protected: create (editor/admin)
 * - Protected: update, delete (editor/admin, own posts or admin for all)
 */

import { z } from 'zod';
import { createTRPCRouter, publicProcedure, editorProcedure, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';

// Validation schemas
const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: z
    .string()
    .min(1)
    .max(200)
    .regex(/^[a-z0-9-]+$/, 'Slug must be lowercase alphanumeric with hyphens'),
  content: z.string().min(1, 'Content is required'),
  excerpt: z.string().max(500).optional(),
  status: z.enum(['draft', 'published', 'archived']).default('draft'),
  publishedAt: z.date().optional().nullable(),
  metaTitle: z.string().max(100).optional().nullable(),
  metaDescription: z.string().max(200).optional().nullable(),
  ogImage: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
});

const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().cuid(),
});

const getPostsSchema = z
  .object({
    limit: z.number().min(1).max(100).default(10),
    cursor: z.string().cuid().optional(),
    status: z.enum(['draft', 'published', 'archived']).optional(),
    authorId: z.string().cuid().optional(),
  })
  .optional()
  .default({});

export const postsRouter = createTRPCRouter({
  /**
   * PUBLIC: Get all published posts with pagination
   */
  getAll: publicProcedure.input(getPostsSchema).query(async ({ ctx, input }) => {
    const { limit, cursor, status, authorId } = input;

    const where = {
      ...(status ? { status } : { status: 'published' }),
      ...(authorId && { authorId }),
    };

    const posts = await ctx.db.post.findMany({
      where,
      take: limit + 1,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { publishedAt: 'desc' },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    let nextCursor: string | undefined = undefined;
    if (posts.length > limit) {
      const nextItem = posts.pop();
      nextCursor = nextItem!.id;
    }

    return {
      posts,
      nextCursor,
    };
  }),

  /**
   * PUBLIC: Get a single post by slug
   */
  getBySlug: publicProcedure.input(z.object({ slug: z.string() })).query(async ({ ctx, input }) => {
    const post = await ctx.db.post.findUnique({
      where: { slug: input.slug },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    if (!post) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Post with slug "${input.slug}" not found`,
      });
    }

    // Only allow viewing published posts unless user is authenticated
    if (post.status !== 'published' && !ctx.session?.user) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'This post is not published',
      });
    }

    return post;
  }),

  /**
   * PUBLIC: Get a single post by ID
   */
  getById: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const post = await ctx.db.post.findUnique({
        where: { id: input.id },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
              image: true,
            },
          },
          tags: {
            include: {
              tag: true,
            },
          },
        },
      });

      if (!post) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with id "${input.id}" not found`,
        });
      }

      // Only allow viewing published posts unless user is authenticated
      if (post.status !== 'published' && !ctx.session?.user) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'This post is not published',
        });
      }

      return post;
    }),

  /**
   * EDITOR: Create a new post
   */
  create: editorProcedure.input(createPostSchema).mutation(async ({ ctx, input }) => {
    const { tags, ...postData } = input;

    // Check for duplicate slug
    const existingPost = await ctx.db.post.findUnique({
      where: { slug: input.slug },
    });

    if (existingPost) {
      throw new TRPCError({
        code: 'CONFLICT',
        message: `Post with slug "${input.slug}" already exists`,
      });
    }

    // Create post with tags
    const post = await ctx.db.post.create({
      data: {
        ...postData,
        authorId: ctx.session.user.id,
        tags: tags
          ? {
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: {
                      name: tagName,
                      slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                    },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return post;
  }),

  /**
   * EDITOR: Update a post (own posts only, admin can update any)
   */
  update: editorProcedure.input(updatePostSchema).mutation(async ({ ctx, input }) => {
    const { id, tags, ...updateData } = input;

    // Check if post exists
    const existingPost = await ctx.db.post.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });

    if (!existingPost) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `Post with id "${id}" not found`,
      });
    }

    // Check if user can update this post (author or admin)
    const isAdmin = await ctx.db.userRole.findFirst({
      where: {
        userId: ctx.session.user.id,
        role: { name: 'admin' },
      },
    });

    if (existingPost.authorId !== ctx.session.user.id && !isAdmin) {
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'You can only update your own posts',
      });
    }

    // Check for slug conflict if slug is being updated
    if (updateData.slug && updateData.slug !== existingPost.slug) {
      const slugConflict = await ctx.db.post.findUnique({
        where: { slug: updateData.slug },
      });

      if (slugConflict) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: `Post with slug "${updateData.slug}" already exists`,
        });
      }
    }

    // Update post
    const post = await ctx.db.post.update({
      where: { id },
      data: {
        ...updateData,
        tags: tags
          ? {
              deleteMany: {}, // Remove existing tags
              create: tags.map((tagName) => ({
                tag: {
                  connectOrCreate: {
                    where: { name: tagName },
                    create: {
                      name: tagName,
                      slug: tagName.toLowerCase().replace(/\s+/g, '-'),
                    },
                  },
                },
              })),
            }
          : undefined,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tags: {
          include: {
            tag: true,
          },
        },
      },
    });

    return post;
  }),

  /**
   * EDITOR: Delete a post (own posts only, admin can delete any)
   */
  delete: editorProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      // Check if post exists
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
      });

      if (!existingPost) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with id "${input.id}" not found`,
        });
      }

      // Check if user can delete this post (author or admin)
      const isAdmin = await ctx.db.userRole.findFirst({
        where: {
          userId: ctx.session.user.id,
          role: { name: 'admin' },
        },
      });

      if (existingPost.authorId !== ctx.session.user.id && !isAdmin) {
        throw new TRPCError({
          code: 'FORBIDDEN',
          message: 'You can only delete your own posts',
        });
      }

      // Soft delete by setting status to archived
      await ctx.db.post.update({
        where: { id: input.id },
        data: { status: 'archived' },
      });

      return { success: true };
    }),

  /**
   * ADMIN: Hard delete a post (permanently removes from database)
   */
  hardDelete: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      // Check if post exists
      const existingPost = await ctx.db.post.findUnique({
        where: { id: input.id },
      });

      if (!existingPost) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: `Post with id "${input.id}" not found`,
        });
      }

      // Hard delete
      await ctx.db.post.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
});
