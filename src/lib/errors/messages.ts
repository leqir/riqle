/**
 * User-Friendly Error Messages
 *
 * All user-facing errors should be:
 * - Calm and friendly
 * - Clear about what happened
 * - Provide next steps
 * - Never blame the user
 */

export const ERROR_MESSAGES = {
  // General
  general: {
    title: 'Something went wrong',
    message: 'We encountered an unexpected issue. Please try again.',
    action: 'Try again',
  },

  // Network errors
  network: {
    title: 'Connection issue',
    message: 'We could not connect to the server. Please check your internet connection and try again.',
    action: 'Retry',
  },

  // Payment errors
  paymentFailed: {
    title: 'Payment unsuccessful',
    message: 'Your payment could not be processed. No charge was made. Please try again or use a different payment method.',
    action: 'Try again',
  },

  paymentProcessing: {
    title: 'Processing your payment',
    message: 'Your payment is being processed. You will receive an email shortly with access instructions.',
    action: 'Check email',
  },

  // Access errors
  accessDenied: {
    title: 'Access not found',
    message: 'We could not confirm your access to this resource. If you recently purchased, check your email for the access link.',
    action: 'Check email',
  },

  accessExpired: {
    title: 'Link expired',
    message: 'This access link has expired. Request a new one using your email address.',
    action: 'Request new link',
  },

  accessRevoked: {
    title: 'Access revoked',
    message: 'Access to this resource has been revoked. If you believe this is an error, please contact support.',
    action: 'Contact support',
  },

  // Form errors
  invalidInput: {
    title: 'Please check your input',
    message: 'Some information is missing or incorrect. Please review and try again.',
    action: 'Review form',
  },

  // Rate limiting
  rateLimited: {
    title: 'Too many requests',
    message: 'You are doing that too quickly. Please wait a moment and try again.',
    action: 'Wait and retry',
  },

  // Database errors
  databaseError: {
    title: 'Service temporarily unavailable',
    message: 'We are experiencing technical difficulties. Please try again in a few moments.',
    action: 'Retry',
  },

  // Not found
  notFound: {
    title: 'Page not found',
    message: 'The page you are looking for does not exist or has been moved.',
    action: 'Go home',
  },
} as const;

export function getErrorMessage(type: keyof typeof ERROR_MESSAGES) {
  return ERROR_MESSAGES[type];
}
