/**
 * Pre-Publish Product Validation
 *
 * Validates products before they can be published
 * to ensure compliance with standards
 */

import { validateProductDescription } from './product-standards';

export async function validateProductBeforePublish(product: {
  title: string;
  description: string;
  content?: string;
}): Promise<{ canPublish: boolean; blockers: string[]; warnings: string[] }> {
  const blockers: string[] = [];
  const warnings: string[] = [];

  // Validate description compliance
  const compliance = validateProductDescription(product.title, product.description);

  if (compliance.hasOutcomeGuarantee) {
    blockers.push('Product contains outcome guarantee - remove before publishing');
  }

  if (compliance.hasAcademicEquivalence) {
    blockers.push('Product claims academic equivalence - remove before publishing');
  }

  if (compliance.hasMisleadingResult) {
    warnings.push('Product may contain misleading result claims - review carefully');
  }

  // Check for required elements
  if (!product.description.toLowerCase().includes('format')) {
    warnings.push('Product description should clearly state format (PDF, video, etc.)');
  }

  return {
    canPublish: blockers.length === 0,
    blockers,
    warnings,
  };
}
