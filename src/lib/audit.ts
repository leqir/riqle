import { db } from './db';
import type { Prisma } from '@prisma/client';
import 'server-only';

interface AuditEventData {
  userId?: string;
  action: string;
  entity: string;
  entityId: string;
  details?: Prisma.JsonValue;
  ipAddress?: string;
  userAgent?: string;
}

/**
 * Log an audit event for sensitive actions
 */
export async function logAuditEvent(data: AuditEventData): Promise<void> {
  await db.auditLog.create({
    data: {
      userId: data.userId,
      action: data.action,
      entity: data.entity,
      entityId: data.entityId,
      details: data.details,
      ipAddress: data.ipAddress,
      userAgent: data.userAgent,
    },
  });
}

/**
 * Get audit logs for a specific entity
 */
export async function getAuditLogs(entity: string, entityId: string) {
  return db.auditLog.findMany({
    where: {
      entity,
      entityId,
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

/**
 * Get recent audit logs (for admin dashboard)
 */
export async function getRecentAuditLogs(limit: number = 50) {
  return db.auditLog.findMany({
    take: limit,
    include: {
      user: {
        select: {
          id: true,
          email: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}
