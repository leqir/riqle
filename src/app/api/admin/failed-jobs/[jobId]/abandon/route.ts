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

    if (job.status === 'ABANDONED') {
      return NextResponse.json({ error: 'Job is already abandoned' }, { status: 400 });
    }

    await db.failedJob.update({
      where: { id: jobId },
      data: {
        status: 'ABANDONED',
        resolvedAt: new Date(),
      },
    });

    await logAudit({
      userId: session.user.id,
      action: AuditAction.FAILED_JOB_ABANDON,
      entity: 'FailedJob',
      entityId: jobId,
      details: {
        jobType: job.jobType,
        error: job.error,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error abandoning job:', error);
    return NextResponse.json({ error: 'Failed to abandon job' }, { status: 500 });
  }
}
