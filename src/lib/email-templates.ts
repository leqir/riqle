/**
 * Email Templates
 *
 * Epic 10 - Story 10.4: Post-Purchase Confirmation
 *
 * Professional email templates for purchase confirmation and access delivery.
 * Following the "calm, boring, predictable" philosophy.
 */

import { generateAccessLink } from './access-token';
import 'server-only';

export interface PurchaseConfirmationData {
  customerEmail: string;
  productTitle: string;
  productSlug: string;
  productId: string;
  productDescription: string;
  productFormat: string;
  whatYouGet: string;
  entitlementId: string;
  orderNumber: string;
}

/**
 * Purchase confirmation email with magic link access
 */
export function purchaseConfirmationEmail(data: PurchaseConfirmationData) {
  const accessLink = generateAccessLink(
    data.customerEmail,
    data.productId,
    data.productSlug,
    data.entitlementId
  );

  const subject = `Your ${data.productTitle} is ready`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Complete</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #292524;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <!-- Header -->
    <div style="margin-bottom: 32px;">
      <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 600; color: #1c1917;">
        Purchase complete
      </h1>
      <p style="margin: 0; font-size: 16px; color: #57534e;">
        Thank you for purchasing <strong>${data.productTitle}</strong>.
      </p>
    </div>

    <!-- Access CTA -->
    <div style="margin-bottom: 32px; padding: 24px; background-color: #f5f5f4; border-radius: 8px;">
      <h2 style="margin: 0 0 16px 0; font-size: 20px; font-weight: 600; color: #1c1917;">
        Access your files
      </h2>
      <p style="margin: 0 0 20px 0; font-size: 16px; color: #44403c;">
        Click the button below to view and download your purchase.
      </p>
      <a href="${accessLink}" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Access ${data.productTitle}
      </a>
      <p style="margin: 20px 0 0 0; font-size: 14px; color: #78716c;">
        Or copy this link: <a href="${accessLink}" style="color: #4f46e5; word-break: break-all;">${accessLink}</a>
      </p>
    </div>

    <!-- What you get -->
    <div style="margin-bottom: 32px;">
      <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #1c1917;">
        What you get
      </h2>
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #57534e;">
        <strong>Format:</strong> ${data.productFormat}
      </p>
      <div style="font-size: 15px; color: #44403c; line-height: 1.6;">
        ${data.whatYouGet}
      </div>
    </div>

    <!-- Access anytime -->
    <div style="margin-bottom: 32px; padding: 16px; background-color: #fef3c7; border-left: 4px solid: #f59e0b; border-radius: 4px;">
      <p style="margin: 0; font-size: 15px; color: #78350f;">
        <strong>Save this email.</strong> You can use the link above to access your files anytime within 7 days. After that, you can request a new access link from the product page.
      </p>
    </div>

    <!-- Need help? -->
    <div style="margin-bottom: 32px;">
      <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #1c1917;">
        Need help?
      </h2>
      <p style="margin: 0; font-size: 15px; color: #44403c;">
        Reply to this email or contact <a href="mailto:support@riqle.com" style="color: #4f46e5;">support@riqle.com</a>
      </p>
    </div>

    <!-- Refund policy -->
    <div style="margin-bottom: 32px;">
      <h2 style="margin: 0 0 12px 0; font-size: 18px; font-weight: 600; color: #1c1917;">
        Refund policy
      </h2>
      <p style="margin: 0; font-size: 15px; color: #44403c;">
        14-day refund window, no questions asked. Just reply to this email.
      </p>
    </div>

    <!-- Footer -->
    <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e7e5e4;">
      <p style="margin: 0; font-size: 14px; color: #78716c;">
        Order #${data.orderNumber}
      </p>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #78716c;">
        —<br>
        Nathanael<br>
        <a href="https://riqle.com" style="color: #4f46e5;">riqle.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  const text = `
Purchase complete

Thank you for purchasing ${data.productTitle}.

ACCESS YOUR FILES
${accessLink}

WHAT YOU GET
Format: ${data.productFormat}
${data.whatYouGet}

ACCESS ANYTIME
Save this email. You can use the link above to access your files anytime within 7 days. After that, you can request a new access link from the product page.

NEED HELP?
Reply to this email or contact support@riqle.com

REFUND POLICY
14-day refund window, no questions asked. Just reply to this email.

Order #${data.orderNumber}

—
Nathanael
riqle.com
  `.trim();

  return { subject, html, text };
}

/**
 * Access link resend email
 */
export function accessResendEmail(data: {
  customerEmail: string;
  productTitle: string;
  productSlug: string;
  productId: string;
  entitlementId: string;
}) {
  const accessLink = generateAccessLink(
    data.customerEmail,
    data.productId,
    data.productSlug,
    data.entitlementId
  );

  const subject = `Access link: ${data.productTitle}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Access Your Purchase</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #292524;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <div style="margin-bottom: 32px;">
      <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 600; color: #1c1917;">
        Access your purchase
      </h1>
      <p style="margin: 0; font-size: 16px; color: #57534e;">
        Here's a new access link for <strong>${data.productTitle}</strong>.
      </p>
    </div>

    <div style="margin-bottom: 32px; padding: 24px; background-color: #f5f5f4; border-radius: 8px;">
      <a href="${accessLink}" style="display: inline-block; padding: 14px 28px; background-color: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 16px;">
        Access ${data.productTitle}
      </a>
      <p style="margin: 20px 0 0 0; font-size: 14px; color: #78716c;">
        Or copy this link: <a href="${accessLink}" style="color: #4f46e5; word-break: break-all;">${accessLink}</a>
      </p>
    </div>

    <div style="margin-bottom: 32px;">
      <p style="margin: 0; font-size: 15px; color: #44403c;">
        This link will work for 7 days. Need help? Reply to this email.
      </p>
    </div>

    <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e7e5e4;">
      <p style="margin: 0; font-size: 14px; color: #78716c;">
        —<br>
        Nathanael<br>
        <a href="https://riqle.com" style="color: #4f46e5;">riqle.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  const text = `
Access your purchase

Here's a new access link for ${data.productTitle}.

${accessLink}

This link will work for 7 days. Need help? Reply to this email.

—
Nathanael
riqle.com
  `.trim();

  return { subject, html, text };
}

/**
 * Refund confirmation email
 */
export function refundConfirmationEmail(data: {
  customerEmail: string;
  productTitle: string;
  refundAmount: string;
  orderNumber: string;
}) {
  const subject = `Refund processed: ${data.productTitle}`;

  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Processed</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #292524;">
  <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">

    <div style="margin-bottom: 32px;">
      <h1 style="margin: 0 0 16px 0; font-size: 28px; font-weight: 600; color: #1c1917;">
        Refund processed
      </h1>
      <p style="margin: 0; font-size: 16px; color: #57534e;">
        Your refund for <strong>${data.productTitle}</strong> has been processed.
      </p>
    </div>

    <div style="margin-bottom: 32px; padding: 24px; background-color: #f5f5f4; border-radius: 8px;">
      <p style="margin: 0 0 8px 0; font-size: 14px; color: #57534e;">
        <strong>Refund amount:</strong>
      </p>
      <p style="margin: 0; font-size: 24px; font-weight: 600; color: #1c1917;">
        ${data.refundAmount}
      </p>
      <p style="margin: 12px 0 0 0; font-size: 14px; color: #78716c;">
        Funds will appear in your account within 5-10 business days, depending on your bank.
      </p>
    </div>

    <div style="margin-bottom: 32px;">
      <p style="margin: 0; font-size: 15px; color: #44403c;">
        Your access to this product has been revoked. If you have any questions, reply to this email.
      </p>
    </div>

    <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid #e7e5e4;">
      <p style="margin: 0; font-size: 14px; color: #78716c;">
        Order #${data.orderNumber}
      </p>
      <p style="margin: 8px 0 0 0; font-size: 14px; color: #78716c;">
        —<br>
        Nathanael<br>
        <a href="https://riqle.com" style="color: #4f46e5;">riqle.com</a>
      </p>
    </div>

  </div>
</body>
</html>
  `.trim();

  const text = `
Refund processed

Your refund for ${data.productTitle} has been processed.

REFUND AMOUNT
${data.refundAmount}

Funds will appear in your account within 5-10 business days, depending on your bank.

Your access to this product has been revoked. If you have any questions, reply to this email.

Order #${data.orderNumber}

—
Nathanael
riqle.com
  `.trim();

  return { subject, html, text };
}
