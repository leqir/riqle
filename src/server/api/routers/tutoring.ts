import { z } from 'zod';
import { createTRPCRouter, publicProcedure, adminProcedure } from '../trpc';
import { TRPCError } from '@trpc/server';
import { generateAvailableSlots } from '@/lib/tutoring/slots';
import { sendEmail } from '@/lib/email';
import { render } from '@react-email/components';
import TutoringBookingPending from '@/emails/tutoring-booking-pending';
import TutoringBookingConfirmed from '@/emails/tutoring-booking-confirmed';
import TutoringBookingCancelled from '@/emails/tutoring-booking-cancelled';
import TutoringAdminNewBooking from '@/emails/tutoring-admin-new-booking';

const ADMIN_EMAIL = 'nathanael.thie@gmail.com';

export const tutoringRouter = createTRPCRouter({
  // ─── Public ────────────────────────────────────────────────────────────────

  /**
   * Get all published tutoring packages, ordered for display.
   */
  getPackages: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.tutoringPackage.findMany({
      where: { published: true },
      orderBy: { displayOrder: 'asc' },
    });
  }),

  /**
   * Submit a pre-booking inquiry from the tutoring page contact form.
   */
  submitInquiry: publicProcedure
    .input(
      z.object({
        name: z.string().min(1).max(100),
        email: z.string().email(),
        phone: z.string().max(20).optional(),
        message: z.string().min(10).max(1000),
        yearLevel: z.string().max(20).optional(),
        subject: z.string().max(100).optional(),
        packageId: z.string().cuid().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const inquiry = await ctx.db.tutoringInquiry.create({
        data: {
          name: input.name,
          email: input.email,
          phone: input.phone ?? null,
          message: input.message,
          yearLevel: input.yearLevel ?? null,
          subject: input.subject ?? null,
          packageId: input.packageId ?? null,
        },
      });

      await ctx.db.analyticsEvent.create({
        data: {
          eventName: 'tutoring_inquiry_submitted',
          path: '/tutoring',
          metadata: { inquiryId: inquiry.id, packageId: input.packageId ?? null },
        },
      });

      return { success: true };
    }),

  /**
   * Get available booking slots for the public booking picker.
   */
  getAvailableSlots: publicProcedure
    .input(
      z.object({
        weeksAhead: z.number().int().min(1).max(12).default(6),
      })
    )
    .query(async ({ ctx, input }) => {
      const [rules, bookings, blocks] = await Promise.all([
        ctx.db.availabilityRule.findMany({ where: { active: true } }),
        ctx.db.tutoringBooking.findMany({
          select: { scheduledAt: true, durationMinutes: true, status: true },
          where: { status: { not: 'cancelled' } },
        }),
        ctx.db.availabilityBlock.findMany({
          where: { date: { gte: new Date() } },
        }),
      ]);

      return generateAvailableSlots(rules, bookings, blocks, input.weeksAhead);
    }),

  /**
   * Create a new booking request (status: pending).
   * Sends pending confirmation to student and notification to admin.
   */
  createBooking: publicProcedure
    .input(
      z.object({
        studentName: z.string().min(1).max(100),
        studentEmail: z.string().email(),
        studentPhone: z.string().max(20).optional(),
        yearLevel: z.string().max(20).optional(),
        subject: z.string().max(100).optional(),
        goals: z.string().max(1000).optional(),
        scheduledAt: z.date(),
        meetingFormat: z.enum(['in_person', 'online']),
        preferredLocation: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Check the slot is still available
      const slotEnd = new Date(input.scheduledAt.getTime() + 60 * 60 * 1000);
      const conflict = await ctx.db.tutoringBooking.findFirst({
        where: {
          status: { not: 'cancelled' },
          scheduledAt: { lt: slotEnd },
          AND: [
            {
              scheduledAt: {
                gte: new Date(input.scheduledAt.getTime() - 60 * 60 * 1000 + 1),
              },
            },
          ],
        },
      });

      if (conflict) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This time slot is no longer available. Please choose another.',
        });
      }

      const booking = await ctx.db.tutoringBooking.create({
        data: {
          studentName: input.studentName,
          studentEmail: input.studentEmail,
          studentPhone: input.studentPhone ?? null,
          yearLevel: input.yearLevel ?? null,
          subject: input.subject ?? null,
          goals: input.goals ?? null,
          scheduledAt: input.scheduledAt,
          durationMinutes: 60,
          meetingFormat: input.meetingFormat,
          preferredLocation: input.preferredLocation ?? null,
          status: 'pending',
        },
      });

      // Fire emails concurrently; don't block on failure
      await Promise.allSettled([
        sendEmail({
          to: input.studentEmail,
          subject: 'Booking request received — Riqle Tutoring',
          html: await render(
            TutoringBookingPending({
              studentName: input.studentName,
              scheduledAt: input.scheduledAt,
              meetingFormat: input.meetingFormat,
              durationMinutes: 60,
            })
          ),
        }),
        sendEmail({
          to: ADMIN_EMAIL,
          subject: `New tutoring booking request from ${input.studentName}`,
          html: await render(
            TutoringAdminNewBooking({
              studentName: input.studentName,
              studentEmail: input.studentEmail,
              studentPhone: input.studentPhone,
              yearLevel: input.yearLevel,
              subject: input.subject,
              goals: input.goals,
              scheduledAt: input.scheduledAt,
              meetingFormat: input.meetingFormat,
              preferredLocation: input.preferredLocation,
              bookingId: booking.id,
            })
          ),
        }),
      ]);

      await ctx.db.analyticsEvent.create({
        data: {
          eventName: 'tutoring_booking_created',
          path: '/tutoring/book',
          metadata: { bookingId: booking.id, meetingFormat: input.meetingFormat },
        },
      });

      return { success: true, bookingId: booking.id };
    }),

  // ─── Admin ─────────────────────────────────────────────────────────────────

  /**
   * Get all sessions with optional status filter, newest first.
   */
  adminGetSessions: adminProcedure
    .input(
      z.object({
        status: z
          .enum(['scheduled', 'completed', 'cancelled', 'no_show', 'rescheduled'])
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.tutoringSession.findMany({
        where: input.status ? { status: input.status } : {},
        orderBy: { scheduledAt: 'asc' },
        include: { Package: { select: { name: true, slug: true } } },
      });
    }),

  /**
   * Get all inquiries with optional status filter.
   */
  adminGetInquiries: adminProcedure
    .input(
      z.object({
        status: z.enum(['new', 'contacted', 'booked', 'closed']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.tutoringInquiry.findMany({
        where: input.status ? { status: input.status } : {},
        orderBy: { createdAt: 'desc' },
        include: { Package: { select: { name: true } } },
      });
    }),

  /**
   * Update internal notes or status on a session.
   */
  adminUpdateSession: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        tutorNotes: z.string().max(5000).optional(),
        sessionSummary: z.string().max(5000).optional(),
        status: z
          .enum(['scheduled', 'completed', 'cancelled', 'no_show', 'rescheduled'])
          .optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, status, ...rest } = input;

      const session = await ctx.db.tutoringSession.findUnique({ where: { id } });
      if (!session) throw new TRPCError({ code: 'NOT_FOUND', message: 'Session not found' });

      return ctx.db.tutoringSession.update({
        where: { id },
        data: {
          ...rest,
          ...(status && { status }),
          ...(status === 'completed' && !session.completedAt ? { completedAt: new Date() } : {}),
        },
      });
    }),

  /**
   * Update inquiry status (e.g. mark as contacted or booked).
   */
  adminUpdateInquiry: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        status: z.enum(['new', 'contacted', 'booked', 'closed']),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const inquiry = await ctx.db.tutoringInquiry.findUnique({ where: { id: input.id } });
      if (!inquiry) throw new TRPCError({ code: 'NOT_FOUND', message: 'Inquiry not found' });

      return ctx.db.tutoringInquiry.update({
        where: { id: input.id },
        data: {
          status: input.status,
          ...(input.status === 'contacted' && !inquiry.respondedAt
            ? { respondedAt: new Date() }
            : {}),
        },
      });
    }),

  /**
   * Admin CRUD for packages.
   */
  adminUpsertPackage: adminProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        name: z.string().min(1).max(100),
        slug: z
          .string()
          .min(1)
          .max(100)
          .regex(/^[a-z0-9-]+$/),
        description: z.string().min(1).max(500),
        sessionCount: z.number().int().min(1),
        durationMinutes: z.number().int().min(15),
        priceInCents: z.number().int().min(0),
        currency: z.string().length(3).default('AUD'),
        published: z.boolean().default(false),
        featured: z.boolean().default(false),
        displayOrder: z.number().int().default(0),
        calendlyEventTypeSlug: z.string().max(100).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      if (id) {
        return ctx.db.tutoringPackage.update({ where: { id }, data });
      }
      return ctx.db.tutoringPackage.create({ data });
    }),

  // ─── Booking Admin ─────────────────────────────────────────────────────────

  /**
   * List TutoringBookings with optional status filter, newest first.
   */
  adminGetBookings: adminProcedure
    .input(
      z.object({
        status: z.enum(['pending', 'confirmed', 'completed', 'cancelled', 'no_show']).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return ctx.db.tutoringBooking.findMany({
        where: input.status ? { status: input.status } : {},
        orderBy: { scheduledAt: 'asc' },
      });
    }),

  /**
   * Confirm a pending booking. Optionally set Zoom link. Sends confirmation email.
   */
  adminConfirmBooking: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        meetingLink: z.string().url().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.tutoringBooking.findUnique({ where: { id: input.id } });
      if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });

      const updated = await ctx.db.tutoringBooking.update({
        where: { id: input.id },
        data: {
          status: 'confirmed',
          confirmedAt: new Date(),
          meetingLink: input.meetingLink ?? null,
        },
      });

      await Promise.allSettled([
        sendEmail({
          to: booking.studentEmail,
          subject: 'Your tutoring session is confirmed — Riqle Tutoring',
          html: await render(
            TutoringBookingConfirmed({
              studentName: booking.studentName,
              scheduledAt: booking.scheduledAt,
              meetingFormat: booking.meetingFormat,
              durationMinutes: booking.durationMinutes,
              meetingLink: input.meetingLink,
            })
          ),
        }),
      ]);

      return updated;
    }),

  /**
   * Cancel a booking. Sends cancellation email to student.
   */
  adminCancelBooking: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        reason: z.string().max(500).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.tutoringBooking.findUnique({ where: { id: input.id } });
      if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });

      const updated = await ctx.db.tutoringBooking.update({
        where: { id: input.id },
        data: {
          status: 'cancelled',
          cancelledAt: new Date(),
          adminNotes: input.reason
            ? `${booking.adminNotes ? booking.adminNotes + '\n' : ''}Cancelled: ${input.reason}`
            : booking.adminNotes,
        },
      });

      await Promise.allSettled([
        sendEmail({
          to: booking.studentEmail,
          subject: 'Your tutoring booking has been cancelled — Riqle Tutoring',
          html: await render(
            TutoringBookingCancelled({
              studentName: booking.studentName,
              scheduledAt: booking.scheduledAt,
              reason: input.reason,
            })
          ),
        }),
      ]);

      return updated;
    }),

  /**
   * Mark a confirmed booking as completed.
   */
  adminCompleteBooking: adminProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        adminNotes: z.string().max(5000).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.tutoringBooking.findUnique({ where: { id: input.id } });
      if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });

      return ctx.db.tutoringBooking.update({
        where: { id: input.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
          ...(input.adminNotes !== undefined && { adminNotes: input.adminNotes }),
        },
      });
    }),

  /**
   * Mark a booking as no-show.
   */
  adminMarkNoShow: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      const booking = await ctx.db.tutoringBooking.findUnique({ where: { id: input.id } });
      if (!booking) throw new TRPCError({ code: 'NOT_FOUND', message: 'Booking not found' });

      return ctx.db.tutoringBooking.update({
        where: { id: input.id },
        data: { status: 'no_show' },
      });
    }),

  // ─── Availability Admin ─────────────────────────────────────────────────────

  /** List all availability rules. */
  adminGetRules: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.availabilityRule.findMany({
      orderBy: [{ dayOfWeek: 'asc' }, { startTime: 'asc' }],
    });
  }),

  /** Create or update an availability rule. */
  adminUpsertRule: adminProcedure
    .input(
      z.object({
        id: z.string().cuid().optional(),
        dayOfWeek: z.number().int().min(0).max(6),
        startTime: z.string().regex(/^\d{2}:\d{2}$/),
        endTime: z.string().regex(/^\d{2}:\d{2}$/),
        active: z.boolean().default(true),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;

      if (id) {
        return ctx.db.availabilityRule.update({ where: { id }, data });
      }
      return ctx.db.availabilityRule.create({ data });
    }),

  /** Delete an availability rule. */
  adminDeleteRule: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.availabilityRule.delete({ where: { id: input.id } });
    }),

  /** List all availability blocks. */
  adminGetBlocks: adminProcedure.query(async ({ ctx }) => {
    return ctx.db.availabilityBlock.findMany({
      orderBy: { date: 'asc' },
    });
  }),

  /** Block a specific date. */
  adminCreateBlock: adminProcedure
    .input(
      z.object({
        date: z.date(),
        reason: z.string().max(200).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.availabilityBlock.create({
        data: {
          date: input.date,
          reason: input.reason ?? null,
        },
      });
    }),

  /** Remove a date block. */
  adminDeleteBlock: adminProcedure
    .input(z.object({ id: z.string().cuid() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.availabilityBlock.delete({ where: { id: input.id } });
    }),
});
