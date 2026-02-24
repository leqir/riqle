import Stripe from 'stripe';
import 'server-only';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-02-24.acacia',
  typescript: true,
  appInfo: {
    name: 'Riqle Platform',
    version: '0.1.0',
  },
});

// Export Stripe types for convenience
export type { Stripe };
