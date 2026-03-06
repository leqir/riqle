import { type NextRequest, NextResponse } from 'next/server';
import { trackServerEvent } from '@/lib/analytics/tracking';

// Skip tracking for admin, api, and static paths
const IGNORED_PREFIXES = ['/admin', '/api', '/_next', '/favicon'];

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const path: string = typeof body.path === 'string' ? body.path : '/';
  const referrer: string = typeof body.referrer === 'string' ? body.referrer : 'direct';

  if (IGNORED_PREFIXES.some((prefix) => path.startsWith(prefix))) {
    return NextResponse.json({ ok: true });
  }

  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';
  const userAgent = request.headers.get('user-agent') ?? 'unknown';

  await trackServerEvent({
    eventName: 'page_visit',
    path,
    ip,
    userAgent,
    metadata: { referrer },
  });

  return NextResponse.json({ ok: true });
}
