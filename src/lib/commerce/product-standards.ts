/**
 * Product Description Standards & Compliance
 *
 * Ensures product descriptions are honest, clear, and don't make
 * misleading claims or outcome guarantees
 */

export const PRODUCT_DESCRIPTION_RULES = {
  required: [
    'what-is-included', // Exact content description
    'delivery-method', // How customer receives it
    'format', // PDF, video, text, etc.
    'refund-policy-link', // Link to refund policy
  ],
  banned: [
    'guaranteed-outcomes', // "You will get a job"
    'credential-claims', // "This certifies you as..."
    'misleading-results', // "Earn $100k+"
    'academic-equivalence', // "Equivalent to a degree"
  ],
} as const;

export interface ProductCompliance {
  hasOutcomeGuarantee: boolean;
  hasCredentialClaim: boolean;
  hasMisleadingResult: boolean;
  hasAcademicEquivalence: boolean;
  issues: string[];
}

export function validateProductDescription(
  title: string,
  description: string
): ProductCompliance {
  const combined = `${title} ${description}`.toLowerCase();
  const issues: string[] = [];

  // Check for banned outcome guarantees
  const outcomePatterns = [
    /guaranteed? (job|results?|success|income)/,
    /you will (get|land|secure) (a|an) (job|position|role)/,
    /earn \$\d+/,
  ];
  const hasOutcomeGuarantee = outcomePatterns.some((p) => p.test(combined));
  if (hasOutcomeGuarantee) {
    issues.push('Contains outcome guarantee (banned)');
  }

  // Check for credential claims
  const credentialPatterns = [
    /certifi(ed|cation)/,
    /accredited/,
    /licensed/,
    /official credential/,
  ];
  const hasCredentialClaim = credentialPatterns.some((p) => p.test(combined));
  if (hasCredentialClaim) {
    issues.push('Contains credential claim (requires verification)');
  }

  // Check for misleading results
  const misleadingPatterns = [/\d+% (success|placement) rate/, /average salary of \$\d+/];
  const hasMisleadingResult = misleadingPatterns.some((p) => p.test(combined));
  if (hasMisleadingResult) {
    issues.push('Contains misleading result claim');
  }

  // Check for academic equivalence claims
  const academicPatterns = [
    /equivalent to (a|an) (degree|diploma|certificate)/,
    /replaces (a|an)? ?(university|college) course/,
  ];
  const hasAcademicEquivalence = academicPatterns.some((p) => p.test(combined));
  if (hasAcademicEquivalence) {
    issues.push('Contains academic equivalence claim (banned)');
  }

  return {
    hasOutcomeGuarantee,
    hasCredentialClaim,
    hasMisleadingResult,
    hasAcademicEquivalence,
    issues,
  };
}
