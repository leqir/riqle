/**
 * Legal Content Validation
 *
 * Ensures legal content follows philosophy:
 * - No placeholder text
 * - No template brackets
 * - Plain language (not overly complex)
 * - No overly aggressive disclaimers
 */

interface LegalValidationRule {
  check: (content: string) => boolean;
  message: string;
  severity: 'error' | 'warning';
}

const LEGAL_VALIDATION_RULES: LegalValidationRule[] = [
  {
    check: (content) => !content.includes('TBD') && !content.includes('TODO'),
    message: 'Legal content contains placeholder text',
    severity: 'error',
  },
  {
    check: (content) => !content.match(/\[.*\]/),
    message: 'Legal content contains template brackets',
    severity: 'error',
  },
  {
    check: (content) => {
      const sentences = content.split(/[.!?]+/).filter((s) => s.trim().length > 0);
      if (sentences.length === 0) return true;

      const words = content.split(/\s+/).filter((w) => w.length > 0);
      const avgSentenceLength = words.length / sentences.length;

      return avgSentenceLength < 30; // Plain language check
    },
    message: 'Legal content may be too complex (avg sentence length > 30 words)',
    severity: 'warning',
  },
  {
    check: (content) => !content.toLowerCase().includes('we are not responsible for anything'),
    message: 'Overly aggressive disclaimer detected',
    severity: 'error',
  },
];

export function validateLegalContent(content: string): {
  valid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const rule of LEGAL_VALIDATION_RULES) {
    if (!rule.check(content)) {
      if (rule.severity === 'error') {
        errors.push(rule.message);
      } else {
        warnings.push(rule.message);
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
