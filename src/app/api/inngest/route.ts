import { serve } from 'inngest/next';
import { inngest } from '@/lib/inngest';
import {
  sendPurchaseConfirmation,
  sendRefundNotification,
  sendWelcomeEmail,
} from '@/inngest/functions';

/**
 * Inngest API endpoint for webhook handling and job execution
 * Handles all background job processing for the Riqle platform
 */
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [sendPurchaseConfirmation, sendRefundNotification, sendWelcomeEmail],
});
