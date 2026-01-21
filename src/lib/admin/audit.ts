import { db } from '@/lib/db';
import { type Prisma } from '@prisma/client';

/**
 * Admin Audit Logging System
 *
 * Comprehensive audit trail for all admin actions.
 * Epic 11 Principle: "Every action logged, no exceptions"
 */

// ============================================================================
// AUDIT ACTION TYPES
// ============================================================================

export const AuditAction = {
  // Content actions
  CONTENT_CREATE: 'content.create',
  CONTENT_UPDATE: 'content.update',
  CONTENT_PUBLISH: 'content.publish',
  CONTENT_UNPUBLISH: 'content.unpublish',
  CONTENT_DELETE: 'content.delete',
  CONTENT_FEATURE: 'content.feature',
  CONTENT_UNFEATURE: 'content.unfeature',

  // Product actions
  PRODUCT_CREATE: 'product.create',
  PRODUCT_UPDATE: 'product.update',
  PRODUCT_DELETE: 'product.delete',
  PRODUCT_PRICE_CHANGE: 'product.price_change',

  // Order actions
  ORDER_VIEW: 'order.view',
  ORDER_REFUND: 'order.refund',

  // Customer actions
  CUSTOMER_VIEW: 'customer.view',
  CUSTOMER_GRANT_ACCESS: 'customer.grant_access',
  CUSTOMER_REVOKE_ACCESS: 'customer.revoke_access',

  // System actions
  CACHE_REVALIDATE: 'cache.revalidate',
  FAILED_JOB_RETRY: 'failed_job.retry',
  FAILED_JOB_ABANDON: 'failed_job.abandon',

  // Auth actions
  ADMIN_LOGIN: 'admin.login',
  ADMIN_LOGOUT: 'admin.logout',
  ROLE_GRANT: 'role.grant',
  ROLE_REVOKE: 'role.revoke',
} as const;

export type AuditActionType = (typeof AuditAction)[keyof typeof AuditAction];

// ============================================================================
// AUDIT LOGGING
// ============================================================================

interface LogAuditParams {
  userId: string;
  action: AuditActionType;
  entity: string;
  entityId: string;
  details?: Record<string, unknown>;
}

/**
 * Log an admin action to the audit trail
 */
export async function logAudit(params: LogAuditParams) {
  return db.auditLog.create({
    data: {
      id: crypto.randomUUID(),
      userId: params.userId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      details: (params.details ?? {}) as Prisma.InputJsonValue,
      createdAt: new Date(),
    },
  });
}

/**
 * Get recent audit logs
 */
export async function getRecentAuditLogs(limit = 100) {
  return db.auditLog.findMany({
    orderBy: { createdAt: 'desc' },
    take: limit,
    include: {
      User: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Get audit logs for a specific entity
 */
export async function getAuditLogsForEntity(entity: string, entityId: string) {
  return db.auditLog.findMany({
    where: {
      entity,
      entityId,
    },
    orderBy: { createdAt: 'desc' },
    include: {
      User: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Get audit logs for a specific user
 */
export async function getAuditLogsForUser(userId: string, limit = 100) {
  return db.auditLog.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    take: limit,
  });
}

/**
 * Search audit logs with filters
 */
interface SearchAuditLogsParams {
  userId?: string;
  action?: string;
  entity?: string;
  entityId?: string;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}

export async function searchAuditLogs(params: SearchAuditLogsParams) {
  const where: {
    userId?: string;
    action?: string;
    entity?: string;
    entityId?: string;
    createdAt?: {
      gte?: Date;
      lte?: Date;
    };
  } = {};

  if (params.userId) where.userId = params.userId;
  if (params.action) where.action = params.action;
  if (params.entity) where.entity = params.entity;
  if (params.entityId) where.entityId = params.entityId;

  if (params.startDate || params.endDate) {
    where.createdAt = {};
    if (params.startDate) where.createdAt.gte = params.startDate;
    if (params.endDate) where.createdAt.lte = params.endDate;
  }

  return db.auditLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: params.limit ?? 100,
    include: {
      User: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
  });
}

/**
 * Get audit stats
 */
export async function getAuditStats() {
  const [totalLogs, uniqueUsers, recentActions] = await Promise.all([
    db.auditLog.count(),
    db.auditLog
      .groupBy({
        by: ['userId'],
      })
      .then((groups) => groups.length),
    db.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        action: true,
        createdAt: true,
      },
    }),
  ]);

  return {
    totalLogs,
    uniqueUsers,
    recentActions,
  };
}
