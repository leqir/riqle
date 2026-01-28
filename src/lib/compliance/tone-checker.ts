/**
 * Legal Tone Checker
 *
 * Ensures legal content maintains appropriate tone:
 * - Not overly aggressive
 * - Not too casual
 * - Professional and calm
 */

const BANNED_AGGRESSIVE_PHRASES = [
  'we are not responsible for anything',
  'under no circumstances',
  'you agree to indemnify us against all claims',
  'we reserve the right to terminate without notice or reason',
  'at our sole discretion',
];

const BANNED_CASUAL_PHRASES = ['lol', 'tbh', 'basically', 'just so you know', 'heads up'];

export function checkLegalTone(content: string): {
  appropriate: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  const lowerContent = content.toLowerCase();

  // Check for aggressive language
  for (const phrase of BANNED_AGGRESSIVE_PHRASES) {
    if (lowerContent.includes(phrase)) {
      issues.push(`Overly aggressive: "${phrase}"`);
    }
  }

  // Check for casual language
  for (const phrase of BANNED_CASUAL_PHRASES) {
    if (lowerContent.includes(phrase)) {
      issues.push(`Too casual for legal content: "${phrase}"`);
    }
  }

  return {
    appropriate: issues.length === 0,
    issues,
  };
}
