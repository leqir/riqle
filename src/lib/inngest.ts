import { Inngest } from 'inngest';
import 'server-only';

/**
 * Inngest client for background job processing
 * Configured for async email sending and heavy operations
 */
export const inngest = new Inngest({
  id: 'riqle',
  retryWithExponentialBackoff: async (attempt) => {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s
    return Math.pow(2, attempt) * 1000;
  },
});
