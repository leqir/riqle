/**
 * Webhook Processing Integration Tests
 *
 * Epic 9 - Story 9.14: Comprehensive Test Suite
 *
 * Tests for idempotent webhook processing:
 * - processWebhookIdempotently
 * - Event deduplication
 * - Error handling
 * - Retry safety
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { db } from '@/lib/db';
import { processWebhookIdempotently } from '@/lib/stripe/webhook-processor';
import type Stripe from 'stripe';

// Mock Stripe event
function createMockEvent(
  eventId: string,
  type: string = 'checkout.session.completed'
): Stripe.Event {
  return {
    id: eventId,
    object: 'event',
    api_version: '2023-10-16',
    created: Math.floor(Date.now() / 1000),
    type,
    data: {
      object: {
        id: 'cs_test_123',
        object: 'checkout.session',
        amount_total: 5900,
        currency: 'aud',
        customer_email: 'test@example.com',
        payment_status: 'paid',
        metadata: {
          userId: 'user-123',
          productId: 'product-123',
        },
      },
    },
    livemode: false,
    pending_webhooks: 0,
    request: null,
  } as unknown as Stripe.Event;
}

describe('Webhook Processing', () => {
  const testEventId = 'evt_test_123';

  beforeEach(async () => {
    // Clean up test data
    await db.stripeEvent.deleteMany({
      where: { eventId: { startsWith: 'evt_test_' } },
    });
  });

  afterEach(async () => {
    // Clean up test data
    await db.stripeEvent.deleteMany({
      where: { eventId: { startsWith: 'evt_test_' } },
    });
  });

  describe('processWebhookIdempotently', () => {
    it('should process new event successfully', async () => {
      const event = createMockEvent(testEventId);

      // Process event
      const result = await processWebhookIdempotently(event);

      expect(result.status).toBe('processed');

      // Verify event was stored
      const storedEvent = await db.stripeEvent.findUnique({
        where: { eventId: testEventId },
      });

      expect(storedEvent).toBeTruthy();
      expect(storedEvent?.processed).toBe(true);
      expect(storedEvent?.type).toBe('checkout.session.completed');
    });

    it('should reject duplicate events (idempotency)', async () => {
      const event = createMockEvent(testEventId);

      // Process event first time
      const firstResult = await processWebhookIdempotently(event);
      expect(firstResult.status).toBe('processed');

      // Process same event again
      const secondResult = await processWebhookIdempotently(event);
      expect(secondResult.status).toBe('already_processed');
      expect(secondResult.message).toBe('Event already processed');
    });

    it('should store event data correctly', async () => {
      const event = createMockEvent(testEventId);

      await processWebhookIdempotently(event);

      const storedEvent = await db.stripeEvent.findUnique({
        where: { eventId: testEventId },
      });

      expect(storedEvent?.eventId).toBe(testEventId);
      expect(storedEvent?.type).toBe('checkout.session.completed');
      expect(storedEvent?.data).toBeTruthy();
      expect(storedEvent?.processedAt).toBeTruthy();
    });

    it('should handle unhandled event types gracefully', async () => {
      const event = createMockEvent('evt_test_unhandled', 'customer.created');

      const result = await processWebhookIdempotently(event);

      // Should process successfully even for unhandled types
      expect(result.status).toBe('processed');

      const storedEvent = await db.stripeEvent.findUnique({
        where: { eventId: 'evt_test_unhandled' },
      });

      expect(storedEvent?.processed).toBe(true);
    });

    it('should be safe to retry failed events', async () => {
      const event = createMockEvent(testEventId);

      // Create failed event record
      await db.stripeEvent.create({
        data: {
          eventId: testEventId,
          type: event.type,
          data: event.data,
          processed: false,
          processingError: 'Simulated failure',
        },
      });

      // Retry processing
      const result = await processWebhookIdempotently(event);

      // Should process (not already_processed)
      expect(result.status).not.toBe('already_processed');
    });

    it('should handle multiple events in sequence', async () => {
      const events = [
        createMockEvent('evt_test_1'),
        createMockEvent('evt_test_2'),
        createMockEvent('evt_test_3'),
      ];

      // Process all events
      for (const event of events) {
        const result = await processWebhookIdempotently(event);
        expect(result.status).toBe('processed');
      }

      // Verify all stored
      const count = await db.stripeEvent.count({
        where: {
          eventId: { in: ['evt_test_1', 'evt_test_2', 'evt_test_3'] },
          processed: true,
        },
      });

      expect(count).toBe(3);
    });

    it('should handle out-of-order delivery', async () => {
      // Process events out of order
      const event2 = createMockEvent('evt_test_2');
      const event1 = createMockEvent('evt_test_1');
      const event3 = createMockEvent('evt_test_3');

      await processWebhookIdempotently(event2);
      await processWebhookIdempotently(event1);
      await processWebhookIdempotently(event3);

      // All should be processed
      const count = await db.stripeEvent.count({
        where: {
          eventId: { in: ['evt_test_1', 'evt_test_2', 'evt_test_3'] },
          processed: true,
        },
      });

      expect(count).toBe(3);
    });

    it('should store processing errors without marking as processed', async () => {
      // Create event with invalid data that will cause processing error
      const event = {
        id: 'evt_test_error',
        type: 'checkout.session.completed',
        data: {
          object: {
            // Missing required fields - will cause error
            id: 'cs_invalid',
            metadata: {}, // No userId or productId
          },
        },
      } as unknown as Stripe.Event;

      try {
        await processWebhookIdempotently(event);
      } catch {
        // Expected to throw
      }

      const storedEvent = await db.stripeEvent.findUnique({
        where: { eventId: 'evt_test_error' },
      });

      // Should be stored but not marked as processed
      expect(storedEvent).toBeTruthy();
      expect(storedEvent?.processed).toBe(false);
      expect(storedEvent?.processingError).toBeTruthy();
    });
  });

  describe('Performance', () => {
    it('should process events quickly', async () => {
      const event = createMockEvent(testEventId);

      const startTime = performance.now();
      await processWebhookIdempotently(event);
      const duration = performance.now() - startTime;

      // Should complete in < 1 second (Epic 9 target)
      expect(duration).toBeLessThan(1000);
    });

    it('should handle idempotency check quickly', async () => {
      const event = createMockEvent(testEventId);

      // First process
      await processWebhookIdempotently(event);

      // Second process (idempotency check)
      const startTime = performance.now();
      await processWebhookIdempotently(event);
      const duration = performance.now() - startTime;

      // Idempotency check should be very fast (< 100ms)
      expect(duration).toBeLessThan(100);
    });
  });
});
