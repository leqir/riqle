/**
 * Type definitions for Inngest events
 * Ensures type safety when enqueuing and processing jobs
 */

/**
 * Email: Purchase Confirmation
 * Sent when an order is successfully placed and payment processed
 */
export type PurchaseConfirmationEvent = {
  name: 'email/purchase-confirmation';
  data: {
    orderId: string;
    customerEmail: string;
  };
};

/**
 * Email: Refund Notification
 * Sent when an order is refunded
 */
export type RefundNotificationEvent = {
  name: 'email/refund-notification';
  data: {
    orderId: string;
    customerEmail: string;
    refundReason?: string;
  };
};

/**
 * Email: Welcome
 * Sent when a new user creates an account
 */
export type WelcomeEmailEvent = {
  name: 'email/welcome';
  data: {
    userId: string;
    email: string;
    name?: string;
  };
};

/**
 * Union of all Inngest events
 * Used for type-safe event handling
 */
export type InngestEvent = PurchaseConfirmationEvent | RefundNotificationEvent | WelcomeEmailEvent;

/**
 * Type guard functions for runtime type checking
 */
export const isPurchaseConfirmationEvent = (event: unknown): event is PurchaseConfirmationEvent => {
  return (
    typeof event === 'object' &&
    event !== null &&
    'name' in event &&
    (event as any).name === 'email/purchase-confirmation'
  );
};

export const isRefundNotificationEvent = (event: unknown): event is RefundNotificationEvent => {
  return (
    typeof event === 'object' &&
    event !== null &&
    'name' in event &&
    (event as any).name === 'email/refund-notification'
  );
};

export const isWelcomeEmailEvent = (event: unknown): event is WelcomeEmailEvent => {
  return (
    typeof event === 'object' &&
    event !== null &&
    'name' in event &&
    (event as any).name === 'email/welcome'
  );
};
