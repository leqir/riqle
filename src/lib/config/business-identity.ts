/**
 * Business Identity Configuration
 *
 * Central configuration for business/operator information
 * Used across legal pages, email communication, and contact forms
 */

export const BUSINESS_IDENTITY = {
  operator: {
    name: process.env.NEXT_PUBLIC_BUSINESS_OPERATOR_NAME || 'Nathanael Thie',
    type: (process.env.NEXT_PUBLIC_BUSINESS_TYPE as 'individual' | 'sole-trader' | 'company') ||
      'individual',
    jurisdiction: process.env.NEXT_PUBLIC_BUSINESS_JURISDICTION || 'Sydney, Australia',
  },
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'nathanael.thie@gmail.com',
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || 'nathanael.thie@gmail.com',
  },
  domain: {
    primary: process.env.NEXT_PUBLIC_SITE_URL || 'https://riqle.com',
    emailDomain: process.env.NEXT_PUBLIC_EMAIL_DOMAIN || 'riqle.com',
  },
} as const;
