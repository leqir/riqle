/**
 * Dashboard Data Fetcher
 *
 * Aggregates metrics to answer core questions
 */

import { db } from '@/lib/db';
import { AnalyticsEvent } from './events';

export interface DashboardMetrics {
  userGrowth: {
    totalUsers: number;
    signupsToday: number;
    signupsLast7Days: number;
    signupsLast30Days: number;
    verifiedUsers: number;
    verificationRate: number;
    payingCustomers: number;
    conversionRate: number;
    recentSignups: Array<{
      email: string;
      name: string | null;
      createdAt: Date;
      emailVerified: boolean;
      hasPurchases: boolean;
    }>;
  };
  employerUnderstanding: {
    homepageBounceRate: number;
    avgTimeToInteraction: number;
    navigationToProof: number;
  };
  proofEffectiveness: {
    projectViews: number;
    avgTimeOnProjects: number;
    writingScrollDepth: number;
    writingCompletion: number;
  };
  commerceHealth: {
    conversionRate: number;
    refundRate: number;
    supportRate: number;
    repeatAccess: number;
  };
  operationalHealth: {
    checkoutFailures: number;
    webhookFailures: number;
    accessRecoveryUsage: number;
    errorRate: number;
  };
}

export async function getDashboardMetrics(
  startDate: Date,
  endDate: Date
): Promise<DashboardMetrics> {
  // User Growth - Real Data from Database
  const allUsers = await db.user.findMany({
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      emailVerified: true,
      Order: {
        where: { status: 'completed' },
        select: { id: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const last7Days = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
  const last30Days = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000);

  const signupsToday = allUsers.filter((u) => u.createdAt >= today).length;
  const signupsLast7Days = allUsers.filter((u) => u.createdAt >= last7Days).length;
  const signupsLast30Days = allUsers.filter((u) => u.createdAt >= last30Days).length;
  const verifiedUsers = allUsers.filter((u) => u.emailVerified).length;
  const payingCustomers = allUsers.filter((u) => u.Order.length > 0).length;

  const recentSignups = allUsers.slice(0, 10).map((u) => ({
    email: u.email,
    name: u.name,
    createdAt: u.createdAt,
    emailVerified: !!u.emailVerified,
    hasPurchases: u.Order.length > 0,
  }));

  // Employer understanding
  const homepageViews = await getPageViews('/', startDate, endDate);
  const homepageBounces = await getBounces('/', startDate, endDate);
  const navigationToProof = await getNavigationEvents(['work', 'writing'], startDate, endDate);

  // Proof effectiveness
  const projectViews = await getPageViews('/work/*', startDate, endDate);
  const avgTimeOnProjects = await getAvgTimeOnPage('/work/*', startDate, endDate);
  const writingEngagement = await getScrollDepth('/writing/*', startDate, endDate);

  // Commerce health
  const checkoutsInitiated = await getEventCount(
    AnalyticsEvent.CHECKOUT_INITIATED,
    startDate,
    endDate
  );
  const checkoutsCompleted = await getEventCount(
    AnalyticsEvent.CHECKOUT_COMPLETED,
    startDate,
    endDate
  );
  const refunds = await db.order.count({
    where: {
      status: 'refunded',
      createdAt: { gte: startDate, lte: endDate },
    },
  });
  const orders = await db.order.count({
    where: {
      status: 'completed',
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  // Operational health
  const checkoutFailures = await db.failedJob.count({
    where: {
      jobType: 'checkout',
      createdAt: { gte: startDate, lte: endDate },
    },
  });
  const webhookFailures = await db.failedJob.count({
    where: {
      jobType: 'webhook',
      createdAt: { gte: startDate, lte: endDate },
    },
  });

  return {
    userGrowth: {
      totalUsers: allUsers.length,
      signupsToday,
      signupsLast7Days,
      signupsLast30Days,
      verifiedUsers,
      verificationRate: allUsers.length > 0 ? verifiedUsers / allUsers.length : 0,
      payingCustomers,
      conversionRate: allUsers.length > 0 ? payingCustomers / allUsers.length : 0,
      recentSignups,
    },
    employerUnderstanding: {
      homepageBounceRate: homepageViews > 0 ? homepageBounces / homepageViews : 0,
      avgTimeToInteraction: 0, // Calculated from analytics provider
      navigationToProof: homepageViews > 0 ? navigationToProof / homepageViews : 0,
    },
    proofEffectiveness: {
      projectViews,
      avgTimeOnProjects,
      writingScrollDepth: writingEngagement.avgDepth,
      writingCompletion: writingEngagement.completionRate,
    },
    commerceHealth: {
      conversionRate: checkoutsInitiated > 0 ? checkoutsCompleted / checkoutsInitiated : 0,
      refundRate: orders > 0 ? refunds / orders : 0,
      supportRate: 0, // From support system
      repeatAccess: 0, // From access logs
    },
    operationalHealth: {
      checkoutFailures,
      webhookFailures,
      accessRecoveryUsage: 0, // From recovery logs
      errorRate: 0, // From error logs
    },
  };
}

// Helper functions (implement based on analytics provider)
async function getPageViews(_path: string, _start: Date, _end: Date): Promise<number> {
  // Query analytics provider or database
  // TODO: Implement based on Vercel Analytics API or custom tracking
  return 0;
}

async function getBounces(_path: string, _start: Date, _end: Date): Promise<number> {
  // Query analytics provider
  // TODO: Implement based on analytics provider
  return 0;
}

async function getNavigationEvents(_targets: string[], _start: Date, _end: Date): Promise<number> {
  // Query navigation patterns
  // TODO: Implement based on analytics provider
  return 0;
}

async function getAvgTimeOnPage(_path: string, _start: Date, _end: Date): Promise<number> {
  // Query time on page data
  // TODO: Implement based on analytics provider
  return 0;
}

async function getScrollDepth(
  _path: string,
  _start: Date,
  _end: Date
): Promise<{
  avgDepth: number;
  completionRate: number;
}> {
  // Query scroll depth data
  // TODO: Implement based on analytics provider
  return { avgDepth: 0, completionRate: 0 };
}

async function getEventCount(_event: AnalyticsEvent, _start: Date, _end: Date): Promise<number> {
  // Query event count
  // TODO: Implement based on analytics provider
  return 0;
}
