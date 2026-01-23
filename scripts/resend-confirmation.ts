/**
 * Manual script to resend confirmation email
 * Run with: npx tsx scripts/resend-confirmation.ts
 */

import { Resend } from 'resend';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const resend = new Resend(process.env.RESEND_API_KEY);

async function main() {
  const order = await prisma.order.findFirst({
    where: {
      customerEmail: 'nathanael.thie@gmail.com',
    },
    include: {
      OrderItem: {
        include: {
          Product: true,
        },
      },
      Entitlement: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  if (!order || !order.OrderItem[0] || !order.Entitlement[0]) {
    console.error('Order not found or incomplete');
    process.exit(1);
  }

  const product = order.OrderItem[0].Product;
  const entitlement = order.Entitlement[0];

  // Generate magic link
  const magicLink = `${process.env.NEXT_PUBLIC_URL}/resources/${product.slug}?eid=${entitlement.id}`;

  // Create email HTML
  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${product.title} is ready</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f9fafb;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="width: 100%; max-width: 600px; border-collapse: collapse; background-color: #ffffff; border-radius: 8px; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 32px; text-align: center; border-bottom: 1px solid #e5e7eb;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #111827; text-transform: lowercase;">your purchase is ready</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 32px 40px;">
              <p style="margin: 0 0 24px; font-size: 16px; line-height: 1.6; color: #374151;">
                thank you for your purchase! your <strong>${product.title}</strong> is ready to access.
              </p>

              <!-- Magic Link Button -->
              <table role="presentation" style="width: 100%; margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${magicLink}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #06b6d4 0%, #a855f7 100%); color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px; text-transform: lowercase;">access your purchase</a>
                  </td>
                </tr>
              </table>

              <p style="margin: 24px 0 0; font-size: 14px; line-height: 1.6; color: #6b7280;">
                this link is your personal access key. save this email to access your purchase anytime.
              </p>
            </td>
          </tr>

          <!-- What You Get -->
          <tr>
            <td style="padding: 0 40px 32px;">
              <div style="background-color: #f3f4f6; border-radius: 6px; padding: 24px;">
                <h2 style="margin: 0 0 16px; font-size: 18px; font-weight: 600; color: #111827; text-transform: lowercase;">what you get</h2>
                <div style="font-size: 14px; line-height: 1.6; color: #374151;">
                  ${product.whatYouGet}
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #6b7280;">
                need help? email <a href="mailto:nathanael.thie@gmail.com" style="color: #06b6d4; text-decoration: none;">nathanael.thie@gmail.com</a>
              </p>
              <p style="margin: 12px 0 0; font-size: 12px; color: #9ca3af;">
                order #${order.id.substring(0, 16)}...
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  console.log('Sending email to:', order.customerEmail);
  console.log('Magic link:', magicLink);

  const result = await resend.emails.send({
    from: 'Riqle <onboarding@resend.dev>',
    to: order.customerEmail,
    subject: `Your ${product.title} is ready`,
    html,
  });

  console.log('Email sent successfully:', result);

  // Log to database
  await prisma.emailLog.create({
    data: {
      id: `email_manual_${Date.now()}`,
      to: order.customerEmail,
      subject: `Your ${product.title} is ready`,
      status: 'sent',
      provider: 'resend',
      messageId: result.id,
      sentAt: new Date(),
      updatedAt: new Date(),
    },
  });

  console.log('✅ Email sent and logged successfully');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
