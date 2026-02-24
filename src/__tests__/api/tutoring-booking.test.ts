/**
 * Integration tests for tutoring booking tRPC procedures.
 *
 * Requires a test database. Follow existing entitlements.test.ts pattern.
 *
 * Run: npx jest src/__tests__/api/tutoring-booking.test.ts
 */

import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { db } from '@/lib/db';

// Test-scoped email — unique to avoid collisions
const TEST_EMAIL = `tutoring-test-${Date.now()}@example.com`;

async function cleanup() {
  await db.tutoringBooking.deleteMany({
    where: { studentEmail: { contains: 'tutoring-test-' } },
  });
}

describe('TutoringBooking DB operations', () => {
  beforeEach(async () => {
    await cleanup();
  });

  afterEach(async () => {
    await cleanup();
  });

  describe('createBooking', () => {
    it('creates a booking with status pending', async () => {
      const scheduledAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 week from now

      const booking = await db.tutoringBooking.create({
        data: {
          studentName: 'Test Student',
          studentEmail: TEST_EMAIL,
          scheduledAt,
          durationMinutes: 60,
          meetingFormat: 'online',
          status: 'pending',
        },
      });

      expect(booking.studentName).toBe('Test Student');
      expect(booking.studentEmail).toBe(TEST_EMAIL);
      expect(booking.status).toBe('pending');
      expect(booking.confirmedAt).toBeNull();
      expect(booking.cancelledAt).toBeNull();
    });

    it('allows two bookings at different times', async () => {
      const base = Date.now() + 7 * 24 * 60 * 60 * 1000;

      await db.tutoringBooking.create({
        data: {
          studentName: 'Student A',
          studentEmail: TEST_EMAIL,
          scheduledAt: new Date(base),
          durationMinutes: 60,
          meetingFormat: 'online',
          status: 'pending',
        },
      });

      await db.tutoringBooking.create({
        data: {
          studentName: 'Student B',
          studentEmail: TEST_EMAIL,
          scheduledAt: new Date(base + 2 * 60 * 60 * 1000), // 2 hours later
          durationMinutes: 60,
          meetingFormat: 'in_person',
          status: 'pending',
        },
      });

      const count = await db.tutoringBooking.count({
        where: { studentEmail: { contains: 'tutoring-test-' } },
      });
      expect(count).toBe(2);
    });
  });

  describe('adminConfirmBooking', () => {
    it('changes status to confirmed and sets confirmedAt', async () => {
      const scheduledAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const booking = await db.tutoringBooking.create({
        data: {
          studentName: 'Test Student',
          studentEmail: TEST_EMAIL,
          scheduledAt,
          durationMinutes: 60,
          meetingFormat: 'online',
          status: 'pending',
        },
      });

      const confirmed = await db.tutoringBooking.update({
        where: { id: booking.id },
        data: {
          status: 'confirmed',
          confirmedAt: new Date(),
          meetingLink: 'https://zoom.us/j/123',
        },
      });

      expect(confirmed.status).toBe('confirmed');
      expect(confirmed.confirmedAt).toBeTruthy();
      expect(confirmed.meetingLink).toBe('https://zoom.us/j/123');
    });
  });

  describe('adminCancelBooking', () => {
    it('changes status to cancelled and sets cancelledAt', async () => {
      const scheduledAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      const booking = await db.tutoringBooking.create({
        data: {
          studentName: 'Test Student',
          studentEmail: TEST_EMAIL,
          scheduledAt,
          durationMinutes: 60,
          meetingFormat: 'online',
          status: 'pending',
        },
      });

      const cancelled = await db.tutoringBooking.update({
        where: { id: booking.id },
        data: {
          status: 'cancelled',
          cancelledAt: new Date(),
        },
      });

      expect(cancelled.status).toBe('cancelled');
      expect(cancelled.cancelledAt).toBeTruthy();
    });
  });

  describe('getAvailableSlots filtering', () => {
    it('excludes non-cancelled bookings from available slots logic', async () => {
      const scheduledAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

      await db.tutoringBooking.create({
        data: {
          studentName: 'Test Student',
          studentEmail: TEST_EMAIL,
          scheduledAt,
          durationMinutes: 60,
          meetingFormat: 'online',
          status: 'confirmed',
        },
      });

      // Verify that a confirmed booking exists at this time
      const activeBookings = await db.tutoringBooking.findMany({
        where: {
          status: { not: 'cancelled' },
          scheduledAt,
        },
      });

      expect(activeBookings.length).toBeGreaterThan(0);

      // Verify a cancelled booking is excluded
      await db.tutoringBooking.updateMany({
        where: { studentEmail: { contains: 'tutoring-test-' } },
        data: { status: 'cancelled' },
      });

      const cancelledOnly = await db.tutoringBooking.findMany({
        where: {
          status: { not: 'cancelled' },
          scheduledAt,
        },
      });

      expect(cancelledOnly).toHaveLength(0);
    });
  });
});
