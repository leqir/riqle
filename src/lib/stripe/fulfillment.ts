import type Stripe from 'stripe';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import 'server-only';

/**
 * Fulfillment pipeline for successful checkout sessions
 *
 * This function handles the complete order fulfillment process:
 * 1. Creates an Order record
 * 2. Creates OrderItem records
 * 3. Grants product Entitlement to the user
 * 4. Sends purchase confirmation email
 *
 * All database operations are wrapped in a transaction for atomicity.
 * Email sending is done outside the transaction to avoid rollback issues.
 */
export async function fulfillCheckoutSession(session: Stripe.Checkout.Session): Promise<void> {
  const { userId, productId } = session.metadata as {
    userId: string;
    productId: string;
  };

  if (!userId || !productId) {
    throw new Error(`Missing required metadata in checkout session ${session.id}`);
  }

  if (!session.customer_email) {
    throw new Error(`Missing customer email in checkout session ${session.id}`);
  }

  console.log(`Fulfilling checkout session ${session.id} for user ${userId}`);

  // Check for existing order with this session ID (idempotency check)
  const existingOrder = await db.order.findUnique({
    where: { stripeSessionId: session.id },
  });

  if (existingOrder) {
    console.log(
      `Order ${existingOrder.id} already exists for session ${session.id}, skipping fulfillment`
    );
    return;
  }

  let orderId: string;
  let productName: string;

  try {
    // Execute fulfillment in a transaction
    const result = await db.$transaction(async (tx) => {
      // Fetch product data
      const product = await tx.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          title: true,
          priceInCents: true,
          currency: true,
        },
      });

      if (!product) {
        throw new Error(`Product ${productId} not found`);
      }

      // Create Order
      const order = await tx.order.create({
        data: {
          userId,
          status: 'completed',
          total: session.amount_total ?? 0,
          currency: session.currency?.toUpperCase() ?? 'USD',
          stripeSessionId: session.id,
          stripePaymentIntentId: session.payment_intent as string | null,
          customerEmail: session.customer_email,
          customerName: session.customer_details?.name ?? null,
          fulfilledAt: new Date(),
        },
      });

      // Create OrderItem (Epic 8: no priceId, snapshot from Product)
      await tx.orderItem.create({
        data: {
          orderId: order.id,
          productId,
          amount: product.priceInCents,
          currency: product.currency,
          productName: product.title,
        },
      });

      // Check if entitlement already exists (edge case handling)
      const existingEntitlement = await tx.entitlement.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (existingEntitlement) {
        // Reactivate if it was revoked
        await tx.entitlement.update({
          where: { id: existingEntitlement.id },
          data: {
            active: true,
            orderId: order.id,
            revokedAt: null,
            revokeReason: null,
          },
        });
      } else {
        // Create new entitlement
        await tx.entitlement.create({
          data: {
            userId,
            productId,
            orderId: order.id,
            active: true,
            // expiresAt is null for lifetime access (one-time purchases)
            // For subscriptions, this would be set based on billing period
            expiresAt: null,
          },
        });
      }

      return { orderId: order.id, productName: product.title };
    });

    orderId = result.orderId;
    productName = result.productName;

    console.log(`Successfully fulfilled order ${orderId} for session ${session.id}`);
  } catch (error) {
    console.error(`Failed to fulfill checkout session ${session.id}:`, error);
    throw error;
  }

  // Send confirmation email (outside transaction to avoid rollback issues)
  try {
    await sendPurchaseConfirmationEmail({
      to: session.customer_email,
      customerName: session.customer_details?.name ?? 'Customer',
      orderId,
      productName,
      amountPaid: session.amount_total ?? 0,
      currency: session.currency?.toUpperCase() ?? 'USD',
    });
  } catch (emailError) {
    // Log email error but don't fail the fulfillment
    console.error(`Failed to send confirmation email for order ${orderId}:`, emailError);
    // Email failures are logged to EmailLog table by sendEmail function
  }
}

/**
 * Handle refund events by revoking entitlements
 *
 * When a charge is refunded:
 * 1. Find the associated order
 * 2. Update order status to 'refunded'
 * 3. Revoke all entitlements associated with the order
 *
 * All operations are wrapped in a transaction.
 */
export async function handleRefund(charge: Stripe.Charge): Promise<void> {
  const paymentIntentId = charge.payment_intent as string | null;

  if (!paymentIntentId) {
    console.log(`Charge ${charge.id} has no payment intent, skipping`);
    return;
  }

  console.log(`Processing refund for payment intent ${paymentIntentId}`);

  const order = await db.order.findUnique({
    where: { stripePaymentIntentId: paymentIntentId },
  });

  if (!order) {
    console.log(`No order found for payment intent ${paymentIntentId}`);
    return;
  }

  if (order.status === 'refunded') {
    console.log(`Order ${order.id} already marked as refunded, skipping`);
    return;
  }

  try {
    await db.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: 'refunded',
          refundedAt: new Date(),
        },
      });

      // Revoke all entitlements for this order
      await tx.entitlement.updateMany({
        where: {
          orderId: order.id,
          active: true,
        },
        data: {
          active: false,
          revokedAt: new Date(),
          revokeReason: 'refund',
        },
      });

      // Create audit log
      await tx.auditLog.create({
        data: {
          userId: order.userId ?? undefined,
          action: 'refund_processed',
          entity: 'order',
          entityId: order.id,
          details: {
            chargeId: charge.id,
            paymentIntentId,
            refundAmount: charge.amount_refunded,
          },
        },
      });
    });

    console.log(`Successfully processed refund for order ${order.id}`);
  } catch (error) {
    console.error(`Failed to process refund for order ${order.id}:`, error);
    throw error;
  }

  // Send refund notification email
  try {
    await sendRefundNotificationEmail({
      to: order.customerEmail,
      customerName: order.customerName ?? 'Customer',
      orderId: order.id,
      refundAmount: charge.amount_refunded,
      currency: charge.currency.toUpperCase(),
    });
  } catch (emailError) {
    console.error(`Failed to send refund notification for order ${order.id}:`, emailError);
  }
}

/**
 * Send purchase confirmation email
 */
async function sendPurchaseConfirmationEmail({
  to,
  customerName,
  orderId,
  productName,
  amountPaid,
  currency,
}: {
  to: string;
  customerName: string;
  orderId: string;
  productName: string;
  amountPaid: number;
  currency: string;
}): Promise<void> {
  const formattedAmount = formatCurrency(amountPaid, currency);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Purchase Confirmation</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">Thank You for Your Purchase!</h1>
  </div>

  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Hi ${customerName},</p>

    <p style="font-size: 16px;">Your purchase has been confirmed! You now have access to:</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #667eea;">
      <h2 style="margin: 0 0 10px 0; font-size: 20px; color: #667eea;">${productName}</h2>
      <p style="margin: 0; color: #666; font-size: 14px;">Order ID: ${orderId}</p>
    </div>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Amount Paid:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600;">${formattedAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Payment Method:</td>
          <td style="padding: 8px 0; text-align: right;">Card</td>
        </tr>
      </table>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${process.env.NEXT_PUBLIC_URL}/account/orders" style="display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: 600;">View Your Purchases</a>
    </div>

    <p style="font-size: 14px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
      If you have any questions, please don't hesitate to contact us.
    </p>

    <p style="font-size: 14px; color: #666;">
      Best regards,<br>
      The Riqle Team
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p>You received this email because you made a purchase on Riqle.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({
    to,
    subject: `Purchase Confirmation - ${productName}`,
    html,
  });
}

/**
 * Send refund notification email
 */
async function sendRefundNotificationEmail({
  to,
  customerName,
  orderId,
  refundAmount,
  currency,
}: {
  to: string;
  customerName: string;
  orderId: string;
  refundAmount: number;
  currency: string;
}): Promise<void> {
  const formattedAmount = formatCurrency(refundAmount, currency);

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Refund Processed</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f59e0b; color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
    <h1 style="margin: 0; font-size: 28px;">Refund Processed</h1>
  </div>

  <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
    <p style="font-size: 16px;">Hi ${customerName},</p>

    <p style="font-size: 16px;">Your refund has been processed for order <strong>${orderId}</strong>.</p>

    <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 8px 0; color: #666;">Refund Amount:</td>
          <td style="padding: 8px 0; text-align: right; font-weight: 600; color: #f59e0b;">${formattedAmount}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; color: #666;">Order ID:</td>
          <td style="padding: 8px 0; text-align: right;">${orderId}</td>
        </tr>
      </table>
    </div>

    <p style="font-size: 14px; color: #666;">
      The refund will appear on your original payment method within 5-10 business days.
    </p>

    <p style="font-size: 14px; color: #666;">
      Please note that your access to the purchased product has been revoked.
    </p>

    <p style="font-size: 14px; color: #666; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
      If you have any questions about this refund, please contact us.
    </p>

    <p style="font-size: 14px; color: #666;">
      Best regards,<br>
      The Riqle Team
    </p>
  </div>

  <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
    <p>You received this email because a refund was processed for your Riqle purchase.</p>
  </div>
</body>
</html>
  `.trim();

  await sendEmail({
    to,
    subject: `Refund Processed - Order ${orderId}`,
    html,
  });
}

/**
 * Format currency amount (from cents to dollars with proper formatting)
 */
function formatCurrency(amountInCents: number, currency: string): string {
  const amount = amountInCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
  }).format(amount);
}
