export const dynamic = 'force-dynamic';

import { db } from '@/lib/db';
import { formatDistanceToNow, format } from 'date-fns';
import { type TutoringSessionStatus, type TutoringInquiryStatus } from '@prisma/client';
import { Card } from '@/components/admin/ui/Card';
import { Badge } from '@/components/admin/ui/Badge';
import {
  Table,
  TableHeader,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from '@/components/admin/ui/Table';
import { Calendar, MessageSquare, Clock, Users, BookOpen } from 'lucide-react';
import Link from 'next/link';
import { TutoringBookingActions } from './BookingActions';

async function getBookingStats() {
  const now = new Date();
  const [pending, confirmed, completed, cancelled] = await Promise.all([
    db.tutoringBooking.count({ where: { status: 'pending' } }),
    db.tutoringBooking.count({ where: { status: 'confirmed', scheduledAt: { gte: now } } }),
    db.tutoringBooking.count({ where: { status: 'completed' } }),
    db.tutoringBooking.count({ where: { status: 'cancelled' } }),
  ]);
  return { pending, confirmed, completed, cancelled };
}

async function getStats() {
  const now = new Date();
  const [upcoming, completed, cancelled, newInquiries] = await Promise.all([
    db.tutoringSession.count({ where: { status: 'scheduled', scheduledAt: { gte: now } } }),
    db.tutoringSession.count({ where: { status: 'completed' } }),
    db.tutoringSession.count({ where: { status: 'cancelled' } }),
    db.tutoringInquiry.count({ where: { status: 'new' } }),
  ]);
  return { upcoming, completed, cancelled, newInquiries };
}

async function getPendingBookings() {
  return db.tutoringBooking.findMany({
    where: { status: 'pending' },
    orderBy: { scheduledAt: 'asc' },
  });
}

async function getConfirmedBookings() {
  return db.tutoringBooking.findMany({
    where: { status: 'confirmed', scheduledAt: { gte: new Date() } },
    orderBy: { scheduledAt: 'asc' },
    take: 20,
  });
}

async function getUpcomingSessions() {
  return db.tutoringSession.findMany({
    where: { status: { in: ['scheduled', 'rescheduled'] }, scheduledAt: { gte: new Date() } },
    orderBy: { scheduledAt: 'asc' },
    take: 20,
    include: { Package: { select: { name: true } } },
  });
}

async function getPastSessions() {
  return db.tutoringSession.findMany({
    where: { scheduledAt: { lt: new Date() } },
    orderBy: { scheduledAt: 'desc' },
    take: 20,
    include: { Package: { select: { name: true } } },
  });
}

async function getInquiries() {
  return db.tutoringInquiry.findMany({
    where: { status: { in: ['new', 'contacted'] } },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: { Package: { select: { name: true } } },
  });
}

export default async function TutoringAdminPage() {
  const [
    bookingStats,
    stats,
    pendingBookings,
    confirmedBookings,
    upcomingSessions,
    pastSessions,
    inquiries,
  ] = await Promise.all([
    getBookingStats(),
    getStats(),
    getPendingBookings(),
    getConfirmedBookings(),
    getUpcomingSessions(),
    getPastSessions(),
    getInquiries(),
  ]);

  const sessionStatusVariant: Record<
    TutoringSessionStatus,
    'success' | 'warning' | 'error' | 'neutral'
  > = {
    scheduled: 'neutral',
    completed: 'success',
    cancelled: 'error',
    no_show: 'warning',
    rescheduled: 'warning',
  };

  const inquiryStatusVariant: Record<
    TutoringInquiryStatus,
    'success' | 'warning' | 'error' | 'neutral'
  > = {
    new: 'warning',
    contacted: 'neutral',
    booked: 'success',
    closed: 'neutral',
  };

  return (
    <div className="space-y-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Tutoring</h1>
          <p className="mt-2 text-slate-600">Manage bookings, sessions and student inquiries</p>
        </div>
        <Link
          href="/admin/tutoring/availability"
          className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm hover:border-slate-300"
        >
          Manage Availability →
        </Link>
      </div>

      {/* Booking Stats */}
      <div>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">
          Bookings
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Pending</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{bookingStats.pending}</div>
              </div>
              <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Confirmed</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {bookingStats.confirmed}
                </div>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-green-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Completed</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {bookingStats.completed}
                </div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                <BookOpen className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Cancelled</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">
                  {bookingStats.cancelled}
                </div>
              </div>
              <div className="rounded-lg bg-red-50 p-3 text-red-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Pending Bookings — action required */}
      {pendingBookings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold text-slate-900">Pending Bookings</h2>
            <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              action required
            </span>
          </div>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <Table>
              <TableHeader>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Date &amp; Time</TableHeaderCell>
                <TableHeaderCell>Format</TableHeaderCell>
                <TableHeaderCell>Received</TableHeaderCell>
                <TableHeaderCell>Actions</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {pendingBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{b.studentName}</div>
                        <div className="text-sm text-slate-500">{b.studentEmail}</div>
                        {b.yearLevel && (
                          <div className="text-xs text-slate-400">
                            {[b.yearLevel, b.subject].filter(Boolean).join(' · ')}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {format(b.scheduledAt, 'EEE d MMM, h:mm a')}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {b.meetingFormat === 'in_person' ? 'In person' : 'Online'}
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {formatDistanceToNow(b.createdAt, { addSuffix: true })}
                    </TableCell>
                    <TableCell>
                      <TutoringBookingActions bookingId={b.id} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* Upcoming Confirmed Bookings */}
      {confirmedBookings.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Upcoming Confirmed</h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <Table>
              <TableHeader>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Date &amp; Time</TableHeaderCell>
                <TableHeaderCell>Format</TableHeaderCell>
                <TableHeaderCell>Meeting Link</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {confirmedBookings.map((b) => (
                  <TableRow key={b.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{b.studentName}</div>
                        <div className="text-sm text-slate-500">{b.studentEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {format(b.scheduledAt, 'EEE d MMM, h:mm a')}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {b.meetingFormat === 'in_person' ? 'In person' : 'Online'}
                    </TableCell>
                    <TableCell>
                      {b.meetingLink ? (
                        <a
                          href={b.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 hover:underline"
                        >
                          Join
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* Legacy Sessions */}
      <div>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wider text-slate-500">
          Legacy Sessions (Calendly)
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Upcoming</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{stats.upcoming}</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                <Calendar className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Completed</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{stats.completed}</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                <Clock className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">Cancelled</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{stats.cancelled}</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                <Users className="h-5 w-5" />
              </div>
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-medium text-slate-600">New Inquiries</div>
                <div className="mt-2 text-3xl font-bold text-slate-900">{stats.newInquiries}</div>
              </div>
              <div className="rounded-lg bg-brand-50 p-3 text-brand-600">
                <MessageSquare className="h-5 w-5" />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* New inquiries */}
      {inquiries.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Open Inquiries</h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <Table>
              <TableHeader>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Package</TableHeaderCell>
                <TableHeaderCell>Year / Subject</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Received</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {inquiries.map((inq) => (
                  <TableRow key={inq.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{inq.name}</div>
                        <div className="text-sm text-slate-500">{inq.email}</div>
                        {inq.phone && <div className="text-sm text-slate-500">{inq.phone}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {inq.Package?.name ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {[inq.yearLevel, inq.subject].filter(Boolean).join(' · ') || '—'}
                    </TableCell>
                    <TableCell>
                      <Badge variant={inquiryStatusVariant[inq.status]} size="sm">
                        {inq.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-500">
                      {formatDistanceToNow(inq.createdAt, { addSuffix: true })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>
      )}

      {/* Upcoming sessions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Upcoming Sessions (Legacy)</h2>
        {upcomingSessions.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-card">
            No upcoming sessions booked.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <Table>
              <TableHeader>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Package</TableHeaderCell>
                <TableHeaderCell>Date & Time</TableHeaderCell>
                <TableHeaderCell>Duration</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
                <TableHeaderCell>Meeting</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {upcomingSessions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{s.studentName}</div>
                        <div className="text-sm text-slate-500">{s.studentEmail}</div>
                        {s.yearLevel && <div className="text-xs text-slate-400">{s.yearLevel}</div>}
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {s.Package?.name ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {format(s.scheduledAt, 'EEE d MMM, h:mm a')}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {s.durationMinutes} min
                    </TableCell>
                    <TableCell>
                      <Badge variant={sessionStatusVariant[s.status]} size="sm">
                        {s.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {s.meetingUrl ? (
                        <a
                          href={s.meetingUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-brand-600 hover:underline"
                        >
                          Join
                        </a>
                      ) : (
                        <span className="text-sm text-slate-400">—</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>

      {/* Past sessions */}
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Past Sessions (Legacy)</h2>
        {pastSessions.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center text-slate-500 shadow-card">
            No past sessions yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl bg-white shadow-card">
            <Table>
              <TableHeader>
                <TableHeaderCell>Student</TableHeaderCell>
                <TableHeaderCell>Package</TableHeaderCell>
                <TableHeaderCell>Date</TableHeaderCell>
                <TableHeaderCell>Status</TableHeaderCell>
              </TableHeader>
              <TableBody>
                {pastSessions.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-slate-900">{s.studentName}</div>
                        <div className="text-sm text-slate-500">{s.studentEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {s.Package?.name ?? '—'}
                    </TableCell>
                    <TableCell className="text-sm text-slate-700">
                      {format(s.scheduledAt, 'EEE d MMM yyyy')}
                    </TableCell>
                    <TableCell>
                      <Badge variant={sessionStatusVariant[s.status]} size="sm">
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </section>
    </div>
  );
}
