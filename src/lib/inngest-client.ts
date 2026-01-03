import { inngest } from './inngest';
import 'server-only';

/**
 * Enqueue a purchase confirmation email job
 * Called after successful order processing
 */
export async function enqueuePurchaseConfirmation({
  orderId,
  customerEmail,
}: {
  orderId: string;
  customerEmail: string;
}) {
  return await inngest.send({
    name: 'email/purchase-confirmation',
    data: {
      orderId,
      customerEmail,
    },
  });
}

/**
 * Enqueue a refund notification email job
 * Called when an order is refunded
 */
export async function enqueueRefundNotification({
  orderId,
  customerEmail,
  refundReason,
}: {
  orderId: string;
  customerEmail: string;
  refundReason?: string;
}) {
  return await inngest.send({
    name: 'email/refund-notification',
    data: {
      orderId,
      customerEmail,
      refundReason,
    },
  });
}

/**
 * Enqueue a welcome email job
 * Called when a new user signs up
 */
export async function enqueueWelcomeEmail({
  userId,
  email,
  name,
}: {
  userId: string;
  email: string;
  name?: string;
}) {
  return await inngest.send({
    name: 'email/welcome',
    data: {
      userId,
      email,
      name,
    },
  });
}
