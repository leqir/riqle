import { inngest } from '@/lib/inngest';
import { sendEmail } from '@/lib/email';
import { db } from '@/lib/db';
import 'server-only';

/**
 * Send purchase confirmation email with retry logic
 * Retries up to 3 times with exponential backoff
 */
export const sendPurchaseConfirmation = inngest.createFunction(
  {
    id: 'send-purchase-confirmation',
    retries: 3,
  },
  { event: 'email/purchase-confirmation' },
  async ({ event, step }) => {
    const { orderId, customerEmail } = event.data;

    // Step 1: Fetch order with items and products
    const order = await step.run('fetch-order', async () => {
      return await db.order.findUnique({
        where: { id: orderId },
        include: {
          items: {
            include: { product: true },
          },
        },
      });
    });

    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    // Step 2: Send confirmation email
    const emailResult = await step.run('send-email', async () => {
      const itemsHtml = order.items
        .map(
          (item) =>
            `<tr>
          <td>${item.productName}</td>
          <td>$${(item.amount / 100).toFixed(2)}</td>
        </tr>`
        )
        .join('');

      const html = `
        <h1>Purchase Confirmation</h1>
        <p>Thank you for your purchase!</p>
        <p>Order ID: ${order.id}</p>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <p><strong>Total: $${(order.total / 100).toFixed(2)}</strong></p>
      `;

      return await sendEmail({
        to: customerEmail,
        subject: 'Your Purchase Confirmation',
        html,
      });
    });

    // Step 3: Update order fulfillment status
    await step.run('mark-fulfilled', async () => {
      return await db.order.update({
        where: { id: orderId },
        data: { fulfilledAt: new Date() },
      });
    });

    return {
      success: true,
      orderId,
      email: customerEmail,
      messageId: emailResult.id,
    };
  }
);

/**
 * Send order refund notification email
 * Retries up to 2 times with exponential backoff
 */
export const sendRefundNotification = inngest.createFunction(
  {
    id: 'send-refund-notification',
    retries: 2,
  },
  { event: 'email/refund-notification' },
  async ({ event, step }) => {
    const { orderId, customerEmail, refundReason } = event.data;

    const order = await step.run('fetch-order', async () => {
      return await db.order.findUnique({
        where: { id: orderId },
        include: { OrderItem: true },
      });
    });

    if (!order) {
      throw new Error(`Order not found: ${orderId}`);
    }

    const emailResult = await step.run('send-email', async () => {
      const html = `
        <h1>Refund Processed</h1>
        <p>Your refund has been processed successfully.</p>
        <p>Order ID: ${order.id}</p>
        <p>Refund Amount: $${(order.total / 100).toFixed(2)}</p>
        ${refundReason ? `<p>Reason: ${refundReason}</p>` : ''}
        <p>The refund may take 3-5 business days to appear in your account.</p>
      `;

      return await sendEmail({
        to: customerEmail,
        subject: 'Refund Confirmation',
        html,
      });
    });

    await step.run('mark-refunded', async () => {
      return await db.order.update({
        where: { id: orderId },
        data: { refundedAt: new Date() },
      });
    });

    return {
      success: true,
      orderId,
      email: customerEmail,
      messageId: emailResult.id,
    };
  }
);

/**
 * Send welcome email to new users
 * No retries - best effort delivery
 */
export const sendWelcomeEmail = inngest.createFunction(
  {
    id: 'send-welcome-email',
    retries: 1,
  },
  { event: 'email/welcome' },
  async ({ event, step }) => {
    const { userId, email, name } = event.data;

    const emailResult = await step.run('send-email', async () => {
      const html = `
        <h1>Welcome to Riqle!</h1>
        <p>Hi ${name || 'there'},</p>
        <p>Thank you for joining our platform. We're excited to have you!</p>
        <p>Get started by exploring our resources and products.</p>
      `;

      return await sendEmail({
        to: email,
        subject: 'Welcome to Riqle',
        html,
      });
    });

    return {
      success: true,
      userId,
      email,
      messageId: emailResult.id,
    };
  }
);
