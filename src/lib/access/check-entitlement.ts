import { db } from '@/lib/db';
import { auth } from '@/auth';
import 'server-only';

/**
 * Entitlement Checking (Epic 14: Story 14.4)
 *
 * Controls access to paid content based on purchase entitlements.
 *
 * Security Principle: All entitlement checks happen server-side.
 * - Never trust client claims about product ownership
 * - Always verify entitlements against the database
 * - Check both existence AND active status
 */

/**
 * Check if a user has an active entitlement for a product
 *
 * @param userId - The user's ID
 * @param productId - The product ID
 * @returns True if user has active entitlement
 *
 * @example
 * ```typescript
 * const hasAccess = await checkEntitlement(userId, productId);
 * if (hasAccess) {
 *   // Grant access to product
 * }
 * ```
 */
export async function checkEntitlement(userId: string, productId: string): Promise<boolean> {
  try {
    const entitlement = await db.entitlement.findFirst({
      where: {
        userId,
        productId,
        active: true, // Only active entitlements
      },
    });

    return !!entitlement;
  } catch (error) {
    console.error('Error checking entitlement:', error);
    return false; // Fail closed (deny access on error)
  }
}

/**
 * Require an active entitlement for a product
 *
 * @param userId - The user's ID
 * @param productId - The product ID
 * @throws {Error} If user lacks entitlement
 *
 * @example
 * ```typescript
 * // In an access route
 * export async function GET(request: Request) {
 *   const session = await requireAuth();
 *   await requireEntitlement(session.user.id, productId);
 *   // ... grant access to download
 * }
 * ```
 */
export async function requireEntitlement(userId: string, productId: string): Promise<void> {
  const hasAccess = await checkEntitlement(userId, productId);

  if (!hasAccess) {
    throw new Error('Forbidden: No active entitlement for this product');
  }
}

/**
 * Check if current authenticated user has entitlement
 *
 * Convenience function that gets userId from session
 *
 * @param productId - The product ID
 * @returns True if current user has entitlement
 *
 * @example
 * ```typescript
 * if (await checkCurrentUserEntitlement(productId)) {
 *   // Show "Download" button
 * }
 * ```
 */
export async function checkCurrentUserEntitlement(productId: string): Promise<boolean> {
  const session = await auth();

  if (!session?.user) {
    return false; // Not authenticated = no entitlement
  }

  return checkEntitlement(session.user.id, productId);
}

/**
 * Require current user to have entitlement
 *
 * @param productId - The product ID
 * @throws {Error} If user is not authenticated or lacks entitlement
 *
 * @example
 * ```typescript
 * export async function GET(request: Request) {
 *   await requireCurrentUserEntitlement(productId);
 *   // ... serve protected content
 * }
 * ```
 */
export async function requireCurrentUserEntitlement(productId: string): Promise<void> {
  const session = await auth();

  if (!session?.user) {
    throw new Error('Unauthorized: Authentication required');
  }

  await requireEntitlement(session.user.id, productId);
}

/**
 * Get all active entitlements for a user
 *
 * @param userId - The user's ID
 * @returns Array of entitlements
 *
 * @example
 * ```typescript
 * const entitlements = await getUserEntitlements(userId);
 * const productIds = entitlements.map(e => e.productId);
 * ```
 */
export async function getUserEntitlements(userId: string) {
  try {
    const entitlements = await db.entitlement.findMany({
      where: {
        userId,
        active: true,
      },
      include: {
        Product: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
    });

    return entitlements;
  } catch (error) {
    console.error('Error fetching user entitlements:', error);
    return [];
  }
}

/**
 * Get all active entitlements for current user
 *
 * @returns Array of entitlements for current user
 */
export async function getCurrentUserEntitlements() {
  const session = await auth();

  if (!session?.user) {
    return [];
  }

  return getUserEntitlements(session.user.id);
}

/**
 * Check if user has access to a product by slug
 *
 * @param userId - The user's ID
 * @param productSlug - The product slug
 * @returns True if user has entitlement
 *
 * @example
 * ```typescript
 * const hasAccess = await checkEntitlementBySlug(userId, 'ultimate-guide');
 * ```
 */
export async function checkEntitlementBySlug(
  userId: string,
  productSlug: string
): Promise<boolean> {
  try {
    // First find the product by slug
    const product = await db.product.findUnique({
      where: { slug: productSlug },
      select: { id: true },
    });

    if (!product) {
      return false; // Product doesn't exist
    }

    return checkEntitlement(userId, product.id);
  } catch (error) {
    console.error('Error checking entitlement by slug:', error);
    return false;
  }
}

/**
 * Require entitlement by product slug
 *
 * @param userId - The user's ID
 * @param productSlug - The product slug
 * @throws {Error} If product not found or user lacks entitlement
 */
export async function requireEntitlementBySlug(userId: string, productSlug: string): Promise<void> {
  const product = await db.product.findUnique({
    where: { slug: productSlug },
    select: { id: true },
  });

  if (!product) {
    throw new Error('Product not found');
  }

  await requireEntitlement(userId, product.id);
}

/**
 * Grant entitlement to a user
 *
 * This is typically called after a successful purchase
 *
 * @param userId - The user's ID
 * @param productId - The product ID
 * @param source - Source of entitlement ('purchase', 'gift', 'manual')
 * @returns The created entitlement
 *
 * @example
 * ```typescript
 * // After successful Stripe payment
 * await grantEntitlement(userId, productId, 'purchase');
 * ```
 */
export async function grantEntitlement(
  userId: string,
  productId: string,
  _source: 'purchase' | 'gift' | 'manual' = 'purchase'
) {
  try {
    // Check if entitlement already exists
    const existing = await db.entitlement.findFirst({
      where: {
        userId,
        productId,
      },
    });

    if (existing) {
      // Reactivate if inactive
      if (!existing.active) {
        return db.entitlement.update({
          where: { id: existing.id },
          data: {
            active: true,
            updatedAt: new Date(),
          },
        });
      }
      return existing; // Already has active entitlement
    }

    // Create new entitlement
    return db.entitlement.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        productId,
        active: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error granting entitlement:', error);
    throw new Error('Failed to grant entitlement');
  }
}

/**
 * Revoke entitlement from a user
 *
 * This is typically called for refunds or violations
 *
 * @param userId - The user's ID
 * @param productId - The product ID
 * @returns The updated entitlement
 *
 * @example
 * ```typescript
 * // After refund
 * await revokeEntitlement(userId, productId);
 * ```
 */
export async function revokeEntitlement(userId: string, productId: string) {
  try {
    const entitlement = await db.entitlement.findFirst({
      where: {
        userId,
        productId,
        active: true,
      },
    });

    if (!entitlement) {
      throw new Error('No active entitlement found');
    }

    return db.entitlement.update({
      where: { id: entitlement.id },
      data: {
        active: false,
        updatedAt: new Date(),
      },
    });
  } catch (error) {
    console.error('Error revoking entitlement:', error);
    throw new Error('Failed to revoke entitlement');
  }
}
