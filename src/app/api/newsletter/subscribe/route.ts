import { type NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { createId } from '@paralleldrive/cuid2';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // Silent success if already subscribed
  const existing = await db.newsletterSubscriber.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ ok: true });
  }

  await db.newsletterSubscriber.create({
    data: { id: createId(), email },
  });

  await sendEmail({
    to: email,
    subject: "you're subscribed",
    html: `<p style="font-family:sans-serif;font-size:14px;color:#333">hey,</p>
<p style="font-family:sans-serif;font-size:14px;color:#333">you're now subscribed to riqle updates. i'll reach out when i ship new resources, write something, or build something worth sharing.</p>
<p style="font-family:sans-serif;font-size:14px;color:#333">— nathanael</p>`,
  });

  return NextResponse.json({ ok: true });
}
