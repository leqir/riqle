import { db } from './db';
import 'server-only';

/**
 * Check if a user owns a specific order
 */
export async function checkOrderOwnership(orderId: string, userId: string): Promise<boolean> {
  const order = await db.order.findUnique({
    where: { id: orderId },
    select: { userId: true },
  });
  return order?.userId === userId;
}

/**
 * Check if a user owns a specific post
 */
export async function checkPostOwnership(postId: string, userId: string): Promise<boolean> {
  const post = await db.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });
  return post?.authorId === userId;
}

/**
 * Check if a user owns a specific project
 */
export async function checkProjectOwnership(projectId: string, userId: string): Promise<boolean> {
  const project = await db.project.findUnique({
    where: { id: projectId },
    select: { authorId: true },
  });
  return project?.authorId === userId;
}

/**
 * Check if a user owns a specific startup
 */
export async function checkStartupOwnership(startupId: string, userId: string): Promise<boolean> {
  const startup = await db.startup.findUnique({
    where: { id: startupId },
    select: { authorId: true },
  });
  return startup?.authorId === userId;
}

/**
 * Require ownership of a resource (throws if not owned)
 */
export async function requireOwnership(
  resourceId: string,
  userId: string,
  type: 'order' | 'post' | 'project' | 'startup'
): Promise<void> {
  let owns = false;

  switch (type) {
    case 'order':
      owns = await checkOrderOwnership(resourceId, userId);
      break;
    case 'post':
      owns = await checkPostOwnership(resourceId, userId);
      break;
    case 'project':
      owns = await checkProjectOwnership(resourceId, userId);
      break;
    case 'startup':
      owns = await checkStartupOwnership(resourceId, userId);
      break;
  }

  if (!owns) {
    throw new Error('Forbidden: You do not own this resource');
  }
}

/**
 * Check if a user has entitlement to a product
 */
export async function checkProductEntitlement(productId: string, userId: string): Promise<boolean> {
  const entitlement = await db.entitlement.findFirst({
    where: {
      userId,
      productId,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
  });
  return !!entitlement;
}

/**
 * Require entitlement to a product (throws if not entitled)
 */
export async function requireProductEntitlement(productId: string, userId: string): Promise<void> {
  const hasEntitlement = await checkProductEntitlement(productId, userId);
  if (!hasEntitlement) {
    throw new Error('Forbidden: You do not have access to this product');
  }
}
