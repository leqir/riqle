import { z } from 'zod';

/**
 * Validation Schemas
 *
 * All API inputs must be validated against schemas
 */

// Common schemas
export const emailSchema = z.string().email().min(3).max(255);

export const slugSchema = z
  .string()
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
  .min(1)
  .max(100);

export const urlSchema = z.string().url().max(2000);

export const cuidSchema = z.string().cuid();

// Content schemas
export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: slugSchema,
  content: z.string().min(1, 'Content is required').max(100000),
  description: z.string().max(500).optional(),
  excerpt: z.string().max(500).optional(),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
});

export const updatePostSchema = createPostSchema.partial();

export const createProjectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().min(1).max(5000),
  content: z.string().min(1).max(50000),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
});

export const updateProjectSchema = createProjectSchema.partial();

export const createStartupSchema = z.object({
  title: z.string().min(1).max(200),
  slug: slugSchema,
  description: z.string().min(1).max(5000),
  content: z.string().min(1).max(50000),
  status: z.enum(['IDEA', 'BUILDING', 'LAUNCHED', 'ARCHIVED']).default('IDEA'),
  published: z.boolean().default(false),
  featured: z.boolean().default(false),
  publishedAt: z.date().optional(),
});

export const updateStartupSchema = createStartupSchema.partial();

// Product schemas
export const createProductSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  slug: slugSchema,
  description: z.string().min(1, 'Description is required').max(5000),
  whatItIs: z.string().min(1).max(2000),
  whatItCovers: z.string().min(1).max(5000),
  targetAudience: z.string().min(1).max(1000),
  nonAudience: z.string().min(1).max(1000),
  priceInCents: z
    .number()
    .int()
    .min(0, 'Price cannot be negative')
    .max(1000000, 'Price cannot exceed $10,000'), // Max $10,000
  active: z.boolean().default(true),
  type: z.enum(['EBOOK', 'VIDEO', 'COURSE', 'TEMPLATE', 'OTHER']).default('EBOOK'),
});

export const updateProductSchema = createProductSchema.partial();

// Order schemas
export const createCheckoutSchema = z.object({
  productId: cuidSchema,
  successUrl: urlSchema.optional(),
  cancelUrl: urlSchema.optional(),
});

// Refund schema
export const refundOrderSchema = z.object({
  orderId: cuidSchema,
  reason: z.string().max(500).optional(),
});

// Access recovery schema
export const accessRecoverySchema = z.object({
  email: emailSchema,
  productSlug: slugSchema,
});

// File upload schema
export const fileUploadSchema = z.object({
  filename: z
    .string()
    .min(1)
    .max(255)
    .regex(/^[a-zA-Z0-9-_.]+$/, 'Filename contains invalid characters'),
  contentType: z.enum([
    'application/pdf',
    'application/zip',
    'application/x-zip-compressed',
    'video/mp4',
    'image/jpeg',
    'image/png',
    'image/webp',
  ]),
  size: z
    .number()
    .int()
    .min(1, 'File cannot be empty')
    .max(500 * 1024 * 1024, 'File cannot exceed 500MB'),
});

// Cache revalidation schema
export const revalidateSchema = z.object({
  type: z.enum(['path', 'tag']),
  value: z.string().min(1).max(200),
});

// Email template schema
export const sendEmailSchema = z.object({
  to: emailSchema,
  subject: z.string().min(1).max(200),
  template: z.enum(['access-instructions', 'purchase-confirmation', 'refund-notification']),
  data: z.record(z.unknown()).optional(),
});

/**
 * Usage example:
 *
 * import { createPostSchema, validateRequest } from '@/lib/validation/schemas';
 *
 * export async function POST(request: Request) {
 *   try {
 *     const data = await validateRequest(request, createPostSchema);
 *     // ... process validated data
 *   } catch (error) {
 *     if (error instanceof ValidationError) {
 *       return error.toResponse();
 *     }
 *     throw error;
 *   }
 * }
 */
