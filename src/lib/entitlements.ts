/**
 * Entitlement Access Control
 *
 * Epic 9 - Story 9.7: Entitlement Management
 *
 * Core Functions:
 * - checkAccess: Verify user has active entitlement
 * - grantEntitlement: Grant product access
 * - revokeEntitlement: Revoke product access
 * - getUserEntitlements: Get all active entitlements for user
 *
 * Business Rules:
 * - Entitlements are tied to orders (payment proof)
 * - Active entitlements grant access, inactive don't
 * - Expiry is checked automatically
 * - One entitlement per user-product pair
 */

import { db } from '@/lib/db';
import 'server-only';

/**
 * Check if user has active access to a product
 *
 * Access is granted if:
 * - Entitlement exists
 * - Entitlement is active
 * - Entitlement hasn't expired
 *
 * @param userId - User ID to check
 * @param productId - Product ID to check
 * @returns true if user has access, false otherwise
 */
export async function checkAccess(userId: string, productId: string): Promise<boolean> {
  const entitlement = await db.entitlement.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (!entitlement) {
    return false;
  }

  // Check if entitlement is active
  if (!entitlement.active) {
    return false;
  }

  // Check if entitlement has expired
  if (entitlement.expiresAt && entitlement.expiresAt < new Date()) {
    // Auto-revoke expired entitlements
    await revokeEntitlement(userId, productId, 'Entitlement expired');
    return false;
  }

  return true;
}

/**
 * Grant product entitlement to user
 *
 * Creates or reactivates entitlement for user-product pair.
 * Idempotent - safe to call multiple times.
 *
 * @param userId - User ID to grant access to
 * @param productId - Product ID to grant access for
 * @param orderId - Order ID that grants this entitlement
 * @param expiresAt - Optional expiry date (null for lifetime access)
 * @returns Created or updated entitlement
 */
export async function grantEntitlement(
  userId: string,
  productId: string,
  orderId: string,
  expiresAt: Date | null = null
) {
  // Check if entitlement already exists
  const existing = await db.entitlement.findUnique({
    where: {
      userId_productId: {
        userId,
        productId,
      },
    },
  });

  if (existing) {
    // Reactivate if it was revoked
    return await db.entitlement.update({
      where: { id: existing.id },
      data: {
        active: true,
        orderId,
        expiresAt,
        revokedAt: null,
        revokeReason: null,
      },
    });
  }

  // Create new entitlement
  return await db.entitlement.create({
    data: {
      userId,
      productId,
      orderId,
      active: true,
      expiresAt,
    },
  });
}

/**
 * Revoke product entitlement from user
 *
 * Deactivates entitlement but preserves record for audit trail.
 *
 * @param userId - User ID to revoke access from
 * @param productId - Product ID to revoke access for
 * @param reason - Reason for revocation (refund, expiry, etc.)
 * @returns Updated entitlement or null if not found
 */
export async function revokeEntitlement(
  userId: string,
  productId: string,
  reason: string
): Promise<void> {
  await db.entitlement.updateMany({
    where: {
      userId,
      productId,
      active: true,
    },
    data: {
      active: false,
      revokedAt: new Date(),
      revokeReason: reason,
    },
  });
}

/**
 * Get all active entitlements for a user
 *
 * Returns full entitlement records with product details.
 * Filters out expired entitlements.
 *
 * @param userId - User ID to get entitlements for
 * @returns Array of active entitlements with product data
 */
export async function getUserEntitlements(userId: string) {
  const entitlements = await db.entitlement.findMany({
    where: {
      userId,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    include: {
      product: {
        select: {
          id: true,
          slug: true,
          title: true,
          description: true,
          format: true,
          downloadUrls: true,
        },
      },
      order: {
        select: {
          id: true,
          createdAt: true,
          total: true,
          currency: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return entitlements;
}

/**
 * Get all products a user has access to
 *
 * Convenience function that returns just the product IDs.
 * Useful for quick access checks.
 *
 * @param userId - User ID to get products for
 * @returns Array of product IDs user has access to
 */
export async function getUserProductIds(userId: string): Promise<string[]> {
  const entitlements = await db.entitlement.findMany({
    where: {
      userId,
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    select: {
      productId: true,
    },
  });

  return entitlements.map((e) => e.productId);
}

/**
 * Bulk check access for multiple products
 *
 * More efficient than calling checkAccess multiple times.
 *
 * @param userId - User ID to check
 * @param productIds - Array of product IDs to check
 * @returns Map of productId -> hasAccess
 */
export async function checkBulkAccess(
  userId: string,
  productIds: string[]
): Promise<Record<string, boolean>> {
  const entitlements = await db.entitlement.findMany({
    where: {
      userId,
      productId: { in: productIds },
      active: true,
      OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
    },
    select: {
      productId: true,
    },
  });

  const accessMap: Record<string, boolean> = {};
  for (const productId of productIds) {
    accessMap[productId] = entitlements.some((e) => e.productId === productId);
  }

  return accessMap;
}
