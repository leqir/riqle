import { Resend } from 'resend';
import { db } from './db';
import 'server-only';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  try {
    const result = await resend.emails.send({
      from: 'Riqle <noreply@riqle.com.au>',
      to,
      subject,
      html,
    });

    // Log successful email
    await db.emailLog.create({
      data: {
        id: `email_${to}_${Date.now()}`,
        to,
        subject,
        status: 'sent',
        provider: 'resend',
        messageId: result.id,
        sentAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return result;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    // Log failed email
    await db.emailLog.create({
      data: {
        id: `email_fail_${to}_${Date.now()}`,
        to,
        subject,
        status: 'failed',
        provider: 'resend',
        error: errorMessage,
        failedAt: new Date(),
        updatedAt: new Date(),
      },
    });

    throw error;
  }
}
