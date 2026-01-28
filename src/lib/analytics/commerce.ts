/**
 * Track commerce events
 * Used for: Commerce health
 */

import { AnalyticsEvent } from './events';
import { trackEvent } from './tracking';

export function trackCheckoutInitiated(productId: string, priceInCents: number) {
  trackEvent(AnalyticsEvent.CHECKOUT_INITIATED, {
    product_id: productId,
    price: priceInCents / 100,
  });
}

export function trackCheckoutCompleted(orderId: string, productId: string) {
  trackEvent(AnalyticsEvent.CHECKOUT_COMPLETED, {
    order_id: orderId,
    product_id: productId,
  });
}

export function trackAccessRecovery(email: string) {
  // Anonymize email for privacy
  const anonymizedEmail = hashEmail(email);

  trackEvent(AnalyticsEvent.ACCESS_RECOVERY, {
    email_hash: anonymizedEmail,
  });
}

function hashEmail(email: string): string {
  // Simple hash for privacy (not for security)
  let hash = 0;
  for (let i = 0; i < email.length; i++) {
    hash = (hash << 5) - hash + email.charCodeAt(i);
    hash = hash & hash;
  }
  return hash.toString(36);
}
