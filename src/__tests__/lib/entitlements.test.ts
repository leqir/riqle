/**
 * Entitlement Access Control Tests
 *
 * Epic 9 - Story 9.14: Comprehensive Test Suite
 *
 * Tests for entitlement management functions:
 * - checkAccess
 * - grantEntitlement
 * - revokeEntitlement
 * - getUserEntitlements
 * - checkBulkAccess
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { db } from '@/lib/db';
import {
  checkAccess,
  grantEntitlement,
  revokeEntitlement,
  getUserEntitlements,
  checkBulkAccess,
} from '@/lib/entitlements';

// Test data
const testUserId = 'test-user-123';
const testProductId = 'test-product-123';
const testOrderId = 'test-order-123';

describe('Entitlement Access Control', () => {
  beforeEach(async () => {
    // Clean up test data before each test
    await db.entitlement.deleteMany({
      where: {
        OR: [{ userId: testUserId }, { productId: testProductId }],
      },
    });
  });

  afterEach(async () => {
    // Clean up test data after each test
    await db.entitlement.deleteMany({
      where: {
        OR: [{ userId: testUserId }, { productId: testProductId }],
      },
    });
  });

  describe('checkAccess', () => {
    it('should return false when no entitlement exists', async () => {
      const hasAccess = await checkAccess(testUserId, testProductId);
      expect(hasAccess).toBe(false);
    });

    it('should return true when active entitlement exists', async () => {
      // Grant entitlement
      await grantEntitlement(testUserId, testProductId, testOrderId);

      // Check access
      const hasAccess = await checkAccess(testUserId, testProductId);
      expect(hasAccess).toBe(true);
    });

    it('should return false when entitlement is inactive', async () => {
      // Grant and then revoke
      await grantEntitlement(testUserId, testProductId, testOrderId);
      await revokeEntitlement(testUserId, testProductId, 'test revocation');

      // Check access
      const hasAccess = await checkAccess(testUserId, testProductId);
      expect(hasAccess).toBe(false);
    });

    it('should return false and auto-revoke when entitlement is expired', async () => {
      // Create expired entitlement
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await db.entitlement.create({
        data: {
          userId: testUserId,
          productId: testProductId,
          orderId: testOrderId,
          active: true,
          expiresAt: yesterday,
        },
      });

      // Check access (should auto-revoke)
      const hasAccess = await checkAccess(testUserId, testProductId);
      expect(hasAccess).toBe(false);

      // Verify it was revoked
      const entitlement = await db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId: testUserId,
            productId: testProductId,
          },
        },
      });

      expect(entitlement?.active).toBe(false);
      expect(entitlement?.revokeReason).toBe('Entitlement expired');
    });
  });

  describe('grantEntitlement', () => {
    it('should create new entitlement', async () => {
      const entitlement = await grantEntitlement(testUserId, testProductId, testOrderId);

      expect(entitlement.userId).toBe(testUserId);
      expect(entitlement.productId).toBe(testProductId);
      expect(entitlement.orderId).toBe(testOrderId);
      expect(entitlement.active).toBe(true);
      expect(entitlement.expiresAt).toBeNull();
    });

    it('should reactivate revoked entitlement', async () => {
      // Grant and revoke
      await grantEntitlement(testUserId, testProductId, testOrderId);
      await revokeEntitlement(testUserId, testProductId, 'test');

      // Grant again (should reactivate)
      const newOrderId = 'new-order-456';
      const entitlement = await grantEntitlement(testUserId, testProductId, newOrderId);

      expect(entitlement.active).toBe(true);
      expect(entitlement.orderId).toBe(newOrderId);
      expect(entitlement.revokedAt).toBeNull();
      expect(entitlement.revokeReason).toBeNull();
    });

    it('should set expiry date when provided', async () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const entitlement = await grantEntitlement(testUserId, testProductId, testOrderId, tomorrow);

      expect(entitlement.expiresAt).toEqual(tomorrow);
    });

    it('should be idempotent', async () => {
      // Grant twice
      const first = await grantEntitlement(testUserId, testProductId, testOrderId);
      const second = await grantEntitlement(testUserId, testProductId, testOrderId);

      // Should update, not create duplicate
      expect(first.userId).toBe(second.userId);
      expect(first.productId).toBe(second.productId);

      // Verify only one entitlement exists
      const count = await db.entitlement.count({
        where: {
          userId: testUserId,
          productId: testProductId,
        },
      });

      expect(count).toBe(1);
    });
  });

  describe('revokeEntitlement', () => {
    it('should revoke active entitlement', async () => {
      // Grant entitlement
      await grantEntitlement(testUserId, testProductId, testOrderId);

      // Revoke
      await revokeEntitlement(testUserId, testProductId, 'Order refunded');

      // Verify revoked
      const entitlement = await db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId: testUserId,
            productId: testProductId,
          },
        },
      });

      expect(entitlement?.active).toBe(false);
      expect(entitlement?.revokeReason).toBe('Order refunded');
      expect(entitlement?.revokedAt).toBeTruthy();
    });

    it('should preserve entitlement record (soft delete)', async () => {
      // Grant and revoke
      await grantEntitlement(testUserId, testProductId, testOrderId);
      await revokeEntitlement(testUserId, testProductId, 'test');

      // Verify record still exists
      const entitlement = await db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId: testUserId,
            productId: testProductId,
          },
        },
      });

      expect(entitlement).toBeTruthy();
      expect(entitlement?.orderId).toBe(testOrderId);
    });

    it('should be idempotent (safe to revoke twice)', async () => {
      // Grant and revoke twice
      await grantEntitlement(testUserId, testProductId, testOrderId);
      await revokeEntitlement(testUserId, testProductId, 'first revoke');
      await revokeEntitlement(testUserId, testProductId, 'second revoke');

      // Should not throw error
      const entitlement = await db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId: testUserId,
            productId: testProductId,
          },
        },
      });

      expect(entitlement?.active).toBe(false);
    });
  });

  describe('getUserEntitlements', () => {
    it('should return empty array when no entitlements', async () => {
      const entitlements = await getUserEntitlements(testUserId);
      expect(entitlements).toEqual([]);
    });

    it('should return active entitlements with product data', async () => {
      // Create test product
      const product = await db.product.create({
        data: {
          id: testProductId,
          slug: 'test-product',
          title: 'Test Product',
          description: 'Test description',
          targetAudience: 'Test audience',
          nonAudience: 'Not for testing',
          whatItIs: 'A test product',
          whatItCovers: 'Testing',
          howItWasCreated: 'For tests',
          format: 'PDF',
          whatYouGet: 'A test file',
          priceInCents: 5900,
          currency: 'AUD',
          published: true,
        },
      });

      // Grant entitlement
      await grantEntitlement(testUserId, product.id, testOrderId);

      // Get entitlements
      const entitlements = await getUserEntitlements(testUserId);

      expect(entitlements.length).toBe(1);
      expect(entitlements[0].productId).toBe(product.id);
      expect(entitlements[0].product.title).toBe('Test Product');
      expect(entitlements[0].active).toBe(true);

      // Clean up
      await db.product.delete({ where: { id: testProductId } });
    });

    it('should not return revoked entitlements', async () => {
      // Grant and revoke
      await grantEntitlement(testUserId, testProductId, testOrderId);
      await revokeEntitlement(testUserId, testProductId, 'test');

      // Get entitlements
      const entitlements = await getUserEntitlements(testUserId);
      expect(entitlements).toEqual([]);
    });

    it('should not return expired entitlements', async () => {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      await db.entitlement.create({
        data: {
          userId: testUserId,
          productId: testProductId,
          orderId: testOrderId,
          active: true,
          expiresAt: yesterday,
        },
      });

      // Get entitlements
      const entitlements = await getUserEntitlements(testUserId);
      expect(entitlements).toEqual([]);
    });
  });

  describe('checkBulkAccess', () => {
    it('should return access map for multiple products', async () => {
      const product1 = 'product-1';
      const product2 = 'product-2';
      const product3 = 'product-3';

      // Grant access to product1 and product2
      await grantEntitlement(testUserId, product1, testOrderId);
      await grantEntitlement(testUserId, product2, testOrderId);

      // Check bulk access
      const accessMap = await checkBulkAccess(testUserId, [product1, product2, product3]);

      expect(accessMap[product1]).toBe(true);
      expect(accessMap[product2]).toBe(true);
      expect(accessMap[product3]).toBe(false);

      // Clean up
      await db.entitlement.deleteMany({
        where: {
          productId: { in: [product1, product2, product3] },
        },
      });
    });

    it('should return all false when no entitlements', async () => {
      const accessMap = await checkBulkAccess(testUserId, ['prod-1', 'prod-2']);

      expect(accessMap['prod-1']).toBe(false);
      expect(accessMap['prod-2']).toBe(false);
    });
  });
});
