import { type NextRequest, NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { requireAdmin } from '@/lib/auth/admin';
import { logAudit, AuditAction } from '@/lib/admin/audit';

export async function POST(request: NextRequest) {
  try {
    const session = await requireAdmin();
    const body = await request.json();
    const { path, tag } = body;

    if (!path && !tag) {
      return NextResponse.json({ error: 'Either path or tag is required' }, { status: 400 });
    }

    if (path) {
      revalidatePath(path);

      await logAudit({
        userId: session.user.id,
        action: AuditAction.CACHE_REVALIDATE,
        entity: 'Cache',
        entityId: path,
        details: {
          type: 'path',
          value: path,
        },
      });
    }

    if (tag) {
      revalidateTag(tag);

      await logAudit({
        userId: session.user.id,
        action: AuditAction.CACHE_REVALIDATE,
        entity: 'Cache',
        entityId: tag,
        details: {
          type: 'tag',
          value: tag,
        },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error revalidating cache:', error);
    return NextResponse.json({ error: 'Failed to revalidate cache' }, { status: 500 });
  }
}
