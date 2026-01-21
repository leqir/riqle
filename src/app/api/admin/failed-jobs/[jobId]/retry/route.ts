import { type NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/auth/admin';
import { logAudit, AuditAction } from '@/lib/admin/audit';
import { db } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ jobId: string }> }
) {
  try {
    const session = await requireAdmin();
    const { jobId } = await params;

    const job = await db.failedJob.findUnique({
      where: { id: jobId },
    });

    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    if (job.status !== 'PENDING') {
      return NextResponse.json({ error: 'Only pending jobs can be retried' }, { status: 400 });
    }

    if (job.attempts >= job.maxAttempts) {
      return NextResponse.json({ error: 'Job has reached max attempts' }, { status: 400 });
    }

    await db.failedJob.update({
      where: { id: jobId },
      data: {
        status: 'RETRYING',
        retriedAt: new Date(),
        attempts: job.attempts + 1,
      },
    });

    await logAudit({
      userId: session.user.id,
      action: AuditAction.FAILED_JOB_RETRY,
      entity: 'FailedJob',
      entityId: jobId,
      details: {
        jobType: job.jobType,
        attempt: job.attempts + 1,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error retrying job:', error);
    return NextResponse.json({ error: 'Failed to retry job' }, { status: 500 });
  }
}
