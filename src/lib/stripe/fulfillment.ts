import type Stripe from 'stripe';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { purchaseConfirmationEmail, refundConfirmationEmail } from '@/lib/email-templates';
import { OrderStatus } from '@prisma/client';
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
          status: OrderStatus.completed,
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

      return { orderId: order.id };
    });

    orderId = result.orderId;

    console.log(`Successfully fulfilled order ${orderId} for session ${session.id}`);
  } catch (error) {
    console.error(`Failed to fulfill checkout session ${session.id}:`, error);
    throw error;
  }

  // Send confirmation email (outside transaction to avoid rollback issues)
  try {
    // Fetch complete order with product and entitlement details
    const orderWithDetails = await db.order.findUnique({
      where: { id: orderId },
      include: {
        OrderItem: {
          include: {
            Product: true,
          },
        },
        Entitlement: true,
      },
    });

    if (!orderWithDetails || !orderWithDetails.OrderItem[0]) {
      throw new Error(`Order ${orderId} or product not found for email`);
    }

    const product = orderWithDetails.OrderItem[0].Product;
    const entitlement = orderWithDetails.Entitlement[0];

    if (!entitlement) {
      throw new Error(`Entitlement not found for order ${orderId}`);
    }

    // Use new email template with magic link
    const emailContent = purchaseConfirmationEmail({
      customerEmail: session.customer_email,
      productTitle: product.title,
      productSlug: product.slug,
      productId: product.id,
      productDescription: product.description,
      productFormat: product.format,
      whatYouGet: product.whatYouGet,
      entitlementId: entitlement.id,
      orderNumber: orderId,
    });

    await sendEmail({
      to: session.customer_email,
      subject: emailContent.subject,
      html: emailContent.html,
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

  if (order.status === OrderStatus.refunded) {
    console.log(`Order ${order.id} already marked as refunded, skipping`);
    return;
  }

  try {
    await db.$transaction(async (tx) => {
      // Update order status
      await tx.order.update({
        where: { id: order.id },
        data: {
          status: OrderStatus.refunded,
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
    // Get product details for refund email
    const orderWithProduct = await db.order.findUnique({
      where: { id: order.id },
      include: {
        OrderItem: {
          include: {
            Product: true,
          },
        },
      },
    });

    const productTitle = orderWithProduct?.OrderItem[0]?.Product.title || 'Product';
    const refundAmount = formatCurrency(charge.amount_refunded, charge.currency.toUpperCase());

    const emailContent = refundConfirmationEmail({
      customerEmail: order.customerEmail,
      productTitle,
      refundAmount,
      orderNumber: order.id,
    });

    await sendEmail({
      to: order.customerEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    });
  } catch (emailError) {
    console.error(`Failed to send refund notification for order ${order.id}:`, emailError);
  }
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

