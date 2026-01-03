# EPIC 15 — Legal, Compliance & Professional Signalling

**Status:** Ready for Implementation
**Dependencies:** Requires Epic 0 (Infrastructure), Epic 9 (Content Publishing), Epic 14 (Security & Privacy)
**Priority:** Essential for Launch
**Stories:** 13 stories (15.1 - 15.13)

---

## Overview

### Purpose

Ensure the site operates as a **legitimate professional presence**, not a hobby project — without over-lawyering, corporate bloat, or performative compliance.

This epic exists because:

> **Serious people subconsciously check for legitimacy.**
> And they disengage quietly when it's missing.

### User Outcomes

**For Employers:**

- "This person operates in the real world."
- No questions about professionalism or seriousness
- Confidence in referencing this work in applications

**For Customers:**

- "This feels safe and legitimate."
- Clear understanding of terms, policies, and accountability
- Trust that there's a real person/entity behind transactions

**For You:**

- "I'm not exposed or improvising."
- Legal surfaces are accurate, honest, and defensible
- Comfortable putting this site on any job application

### Core Questions This Epic Answers

1. **Who operates this?** → Clear business identity and contact information
2. **What are the rules?** → Plain-language Terms of Service
3. **How is my data handled?** → Transparent Privacy Policy (from Epic 14)
4. **What if something goes wrong?** → Clear accountability and contact methods
5. **Is this real?** → Professional communication, branding restraint, legitimacy signals

### Philosophy: Minimal but Correct

**Principles:**

- Do what's required, not what's theatrical
- Plain language over legal intimidation
- Accuracy over breadth
- Quiet, precise, and boring

**Explicit Bans:**

- Copy-pasted legal walls you don't understand
- Overclaiming protections ("We are not responsible for anything")
- Terms that don't reflect how the site actually works
- Legal theater for legitimacy cosplay

**Legal posture should feel:**

> Quiet, precise, and boring.

---

## Architecture Decisions

### Legal Pages Structure

```typescript
// Legal pages architecture
const LEGAL_PAGES = {
  termsOfService: {
    route: '/legal/terms',
    required: true,
    sections: [
      'operator-identity',
      'usage-rules',
      'purchase-terms',
      'refund-policy',
      'ip-ownership',
      'liability-limitations',
    ],
  },
  privacyPolicy: {
    route: '/legal/privacy',
    required: true,
    source: 'Epic 14 - Story 14.11',
    sections: ['data-collected', 'data-usage', 'data-retention', 'user-rights', 'third-parties'],
  },
  contact: {
    route: '/legal/contact',
    required: true,
    sections: ['operator-info', 'jurisdiction', 'contact-method'],
  },
};
```

### Business Identity Model

```typescript
// lib/config/business-identity.ts
export const BUSINESS_IDENTITY = {
  operator: {
    name: process.env.BUSINESS_OPERATOR_NAME!, // e.g., "Your Name"
    type: process.env.BUSINESS_TYPE as 'individual' | 'sole-trader' | 'company',
    jurisdiction: process.env.BUSINESS_JURISDICTION!, // e.g., "Australia"
  },
  contact: {
    email: process.env.CONTACT_EMAIL!, // e.g., "hello@yourdomain.com"
    // NO phone, NO physical address required for digital products
  },
  domain: {
    primary: process.env.NEXT_PUBLIC_SITE_URL!,
    emailDomain: process.env.EMAIL_DOMAIN!, // e.g., "yourdomain.com"
  },
} as const;
```

### Email Communication Standards

```typescript
// lib/email/config.ts
export const EMAIL_STANDARDS = {
  from: {
    transactional: `${BUSINESS_IDENTITY.operator.name} <hello@${BUSINESS_IDENTITY.domain.emailDomain}>`,
    marketing: `${BUSINESS_IDENTITY.operator.name} <hello@${BUSINESS_IDENTITY.domain.emailDomain}>`,
    support: `Support <hello@${BUSINESS_IDENTITY.domain.emailDomain}>`,
  },
  signature: {
    name: BUSINESS_IDENTITY.operator.name,
    website: BUSINESS_IDENTITY.domain.primary,
    // NO casual signoffs, NO emoji in transactional emails
  },
  tone: {
    transactional: 'professional',
    confirmations: 'clear-and-calm',
    support: 'helpful-not-casual',
  },
} as const;
```

### Compliance Checklist

```typescript
// lib/compliance/checklist.ts
export const COMPLIANCE_REQUIREMENTS = {
  legalPages: {
    termsOfService: { required: true, lastReviewed: null, status: 'pending' },
    privacyPolicy: { required: true, lastReviewed: null, status: 'pending' },
    contactInfo: { required: true, lastReviewed: null, status: 'pending' },
  },
  communication: {
    customDomainEmail: { required: true, status: 'pending' },
    professionalSignatures: { required: true, status: 'pending' },
  },
  commerce: {
    clearProductDescriptions: { required: true, status: 'pending' },
    honestRefundPolicy: { required: true, status: 'pending' },
    noOutcomeGuarantees: { required: true, status: 'pending' },
  },
  branding: {
    noMemeLanguage: { required: true, status: 'pending' },
    noPlaceholderText: { required: true, status: 'pending' },
    consistentTone: { required: true, status: 'pending' },
  },
  governance: {
    annualReview: { required: true, nextDue: null },
    policyAccuracy: { required: true, lastChecked: null },
  },
};
```

---

## Stories

### Story 15.1: Legal Posture Philosophy & Decision Framework

**As a** site operator
**I want** a clear legal posture philosophy and decision framework
**So that** I meet obligations without legal theater or compliance cosplay

#### Acceptance Criteria

**Given** the legal posture philosophy is defined
**When** creating any legal page or policy
**Then** I can explain every section clearly
**And** nothing exists "just to look legit"
**And** language is plain, calm, and accurate

**Given** a legal decision needs to be made
**When** evaluating what to include
**Then** I choose what's required over what's theatrical
**And** I use plain language over legal intimidation
**And** I ensure accuracy over breadth

#### Implementation Checklist

- [ ] **Legal Philosophy Documentation**

  ```markdown
  # Legal Posture Philosophy

  ## Principles

  1. **Do what's required, not what's theatrical**
     - Include only legally necessary terms
     - No copy-pasted legal walls from templates
     - Every clause must be understood and defensible

  2. **Plain language over legal intimidation**
     - Write for normal people, not lawyers
     - Explain consequences clearly
     - No aggressive disclaimers

  3. **Accuracy over breadth**
     - Reflect how the site actually works
     - Update when reality changes
     - No overclaiming protections

  ## Explicit Bans

  - Copy-pasted legal templates you don't understand
  - "We are not responsible for anything" language
  - Overly aggressive liability disclaimers
  - Legal jargon when plain English works
  - Claims you can't defend publicly

  ## Decision Framework

  When adding legal content, ask:

  1. **Is this legally required?** (Yes = include, No = skip)
  2. **Can I explain this to a friend?** (No = rewrite in plain language)
  3. **Does this reflect reality?** (No = update reality or policy)
  4. **Would I feel comfortable defending this publicly?** (No = remove or revise)

  ## Tone Standard

  Legal content should feel: **Quiet, precise, and boring.**

  NOT: Threatening, confusing, or theatrical.
  ```

- [ ] **Legal Page Template System**

  ```typescript
  // components/legal/legal-page-layout.tsx
  import { ReactNode } from 'react';

  interface LegalPageLayoutProps {
    title: string;
    lastUpdated: string;
    children: ReactNode;
  }

  export function LegalPageLayout({ title, lastUpdated, children }: LegalPageLayoutProps) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-sm text-muted-foreground">
            Last updated: {new Date(lastUpdated).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          {children}
        </div>

        <footer className="mt-12 pt-8 border-t">
          <p className="text-sm text-muted-foreground">
            Questions? <a href="/legal/contact" className="underline">Contact us</a>
          </p>
        </footer>
      </div>
    );
  }
  ```

- [ ] **Legal Content Validation**

  ```typescript
  // lib/compliance/validate-legal-content.ts

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
        const avgSentenceLength =
          content.split('.').reduce((acc, s) => acc + s.split(' ').length, 0) /
          content.split('.').length;
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
  ```

#### Testing Requirements

```typescript
// __tests__/legal/legal-philosophy.test.ts
import { describe, it, expect } from 'vitest';
import { validateLegalContent } from '@/lib/compliance/validate-legal-content';

describe('Legal Philosophy Enforcement', () => {
  it('should reject placeholder text', () => {
    const content = 'Our terms are TBD and TODO.';
    const result = validateLegalContent(content);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Legal content contains placeholder text');
  });

  it('should reject template brackets', () => {
    const content = 'Operated by [YOUR NAME HERE].';
    const result = validateLegalContent(content);

    expect(result.valid).toBe(false);
    expect(result.errors).toContain('Legal content contains template brackets');
  });

  it('should warn on overly complex language', () => {
    const content =
      'This is a very long sentence with many clauses and subclauses that goes on and on and on and makes the legal content difficult to read and understand for normal users who just want to know the basic terms.';
    const result = validateLegalContent(content);

    expect(result.warnings).toContain(expect.stringContaining('too complex'));
  });

  it('should reject overly aggressive disclaimers', () => {
    const content = 'We are not responsible for anything that happens.';
    const result = validateLegalContent(content);

    expect(result.valid).toBe(false);
  });

  it('should accept plain, clear legal content', () => {
    const content =
      'By using this site, you agree to these terms. We will handle your data as described in our Privacy Policy. If you have questions, contact us.';
    const result = validateLegalContent(content);

    expect(result.valid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});
```

---

### Story 15.2: Required Legal Pages (Baseline Legitimacy)

**As a** site visitor
**I want** clear, accessible legal pages
**So that** I understand the rules, policies, and who operates the site

#### Acceptance Criteria

**Given** I visit the site
**When** I look in the footer
**Then** I see links to Terms of Service, Privacy Policy, and Contact
**And** all links work correctly
**And** all pages are readable and honest

**Given** I read any legal page
**When** I evaluate the content
**Then** there's no ambiguity about responsibilities
**And** language is clear and non-threatening
**And** I understand who to contact if needed

#### Implementation Checklist

- [ ] **Legal Pages Route Structure**

  ```typescript
  // app/legal/layout.tsx
  import { LegalPageLayout } from '@/components/legal/legal-page-layout';

  export default function LegalLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
  }
  ```

- [ ] **Terms of Service Page**

  ```typescript
  // app/legal/terms/page.tsx
  import { LegalPageLayout } from '@/components/legal/legal-page-layout';
  import { BUSINESS_IDENTITY } from '@/lib/config/business-identity';

  const LAST_UPDATED = '2025-01-03';

  export const metadata = {
    title: 'Terms of Service',
    description: 'Terms of service for using our platform',
  };

  export default function TermsPage() {
    return (
      <LegalPageLayout title="Terms of Service" lastUpdated={LAST_UPDATED}>
        <section>
          <h2>1. Operator</h2>
          <p>
            This site is operated by <strong>{BUSINESS_IDENTITY.operator.name}</strong>,
            based in {BUSINESS_IDENTITY.operator.jurisdiction}.
          </p>
          <p>
            You can contact us at: <a href={`mailto:${BUSINESS_IDENTITY.contact.email}`}>{BUSINESS_IDENTITY.contact.email}</a>
          </p>
        </section>

        <section>
          <h2>2. What You're Agreeing To</h2>
          <p>
            By using this site, you agree to these terms. If you don't agree, please don't use the site.
          </p>
        </section>

        <section>
          <h2>3. Usage Rules</h2>
          <p>You may:</p>
          <ul>
            <li>Browse content</li>
            <li>Purchase products</li>
            <li>Access purchased content</li>
          </ul>

          <p>You may not:</p>
          <ul>
            <li>Redistribute purchased content</li>
            <li>Share login credentials</li>
            <li>Scrape or copy content without permission</li>
            <li>Use the site to violate any laws</li>
          </ul>
        </section>

        <section>
          <h2>4. Purchase Terms</h2>
          <p>
            When you purchase a product, you receive a personal, non-transferable license
            to access the content. Payment is processed via Stripe.
          </p>
          <p>
            Purchases are final, except as described in our refund policy below.
          </p>
        </section>

        <section>
          <h2>5. Refund Policy</h2>
          <p>
            If you're not satisfied with a purchase, contact us within 14 days at{' '}
            <a href={`mailto:${BUSINESS_IDENTITY.contact.email}`}>{BUSINESS_IDENTITY.contact.email}</a>.
            We'll review refund requests on a case-by-case basis.
          </p>
          <p>
            We don't offer refunds if you've already accessed significant portions of the content.
          </p>
        </section>

        <section>
          <h2>6. Intellectual Property</h2>
          <p>
            All content on this site is owned by {BUSINESS_IDENTITY.operator.name} unless
            otherwise stated. Purchasing a product grants you a personal license to use
            the content, not ownership.
          </p>
          <p>
            You may not redistribute, resell, or publicly share purchased content.
          </p>
        </section>

        <section>
          <h2>7. Limitations</h2>
          <p>
            This site provides educational content. We make no guarantees about outcomes,
            results, or suitability for any particular purpose.
          </p>
          <p>
            We're not liable for indirect damages, lost profits, or consequential losses
            from using this site.
          </p>
          <p>
            Our total liability is limited to the amount you paid for the specific product
            in question.
          </p>
        </section>

        <section>
          <h2>8. Changes</h2>
          <p>
            We may update these terms. If we make significant changes, we'll notify you
            via email or a notice on the site.
          </p>
        </section>

        <section>
          <h2>9. Governing Law</h2>
          <p>
            These terms are governed by the laws of {BUSINESS_IDENTITY.operator.jurisdiction}.
          </p>
        </section>
      </LegalPageLayout>
    );
  }
  ```

- [ ] **Contact/Operator Info Page**

  ```typescript
  // app/legal/contact/page.tsx
  import { LegalPageLayout } from '@/components/legal/legal-page-layout';
  import { BUSINESS_IDENTITY } from '@/lib/config/business-identity';

  const LAST_UPDATED = '2025-01-03';

  export const metadata = {
    title: 'Contact & Operator Information',
    description: 'Contact information and operator details',
  };

  export default function ContactPage() {
    return (
      <LegalPageLayout title="Contact & Operator Information" lastUpdated={LAST_UPDATED}>
        <section>
          <h2>Operator</h2>
          <p>
            This site is operated by <strong>{BUSINESS_IDENTITY.operator.name}</strong>.
          </p>
          <p>
            Business type: {BUSINESS_IDENTITY.operator.type === 'individual' ? 'Individual' :
                            BUSINESS_IDENTITY.operator.type === 'sole-trader' ? 'Sole Trader' : 'Company'}
          </p>
          <p>
            Jurisdiction: {BUSINESS_IDENTITY.operator.jurisdiction}
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions, support, or refund requests, email us at:{' '}
            <a href={`mailto:${BUSINESS_IDENTITY.contact.email}`} className="font-medium">
              {BUSINESS_IDENTITY.contact.email}
            </a>
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            We aim to respond within 2 business days.
          </p>
        </section>
      </LegalPageLayout>
    );
  }
  ```

- [ ] **Footer with Legal Links**

  ```typescript
  // components/footer.tsx
  import Link from 'next/link';

  export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
      <footer className="border-t mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {process.env.NEXT_PUBLIC_SITE_NAME}. All rights reserved.
            </p>

            <nav className="flex gap-6">
              <Link
                href="/legal/terms"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/legal/privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/legal/contact"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </footer>
    );
  }
  ```

#### Testing Requirements

```typescript
// __tests__/legal/legal-pages.test.tsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import TermsPage from '@/app/legal/terms/page';
import ContactPage from '@/app/legal/contact/page';
import { Footer } from '@/components/footer';

describe('Legal Pages', () => {
  describe('Terms of Service', () => {
    it('should render operator information', () => {
      render(<TermsPage />);

      expect(screen.getByText(/operated by/i)).toBeInTheDocument();
      expect(screen.getByText(/jurisdiction/i)).toBeInTheDocument();
    });

    it('should include all required sections', () => {
      render(<TermsPage />);

      expect(screen.getByText(/operator/i)).toBeInTheDocument();
      expect(screen.getByText(/usage rules/i)).toBeInTheDocument();
      expect(screen.getByText(/purchase terms/i)).toBeInTheDocument();
      expect(screen.getByText(/refund policy/i)).toBeInTheDocument();
      expect(screen.getByText(/intellectual property/i)).toBeInTheDocument();
    });

    it('should include contact email', () => {
      render(<TermsPage />);

      const emailLinks = screen.getAllByRole('link', { name: /@/ });
      expect(emailLinks.length).toBeGreaterThan(0);
    });
  });

  describe('Contact Page', () => {
    it('should display operator name and type', () => {
      render(<ContactPage />);

      expect(screen.getByText(/operated by/i)).toBeInTheDocument();
      expect(screen.getByText(/business type/i)).toBeInTheDocument();
    });

    it('should display contact email', () => {
      render(<ContactPage />);

      expect(screen.getByRole('link', { name: /@/ })).toBeInTheDocument();
    });
  });

  describe('Footer', () => {
    it('should link to all legal pages', () => {
      render(<Footer />);

      expect(screen.getByRole('link', { name: /terms of service/i })).toHaveAttribute('href', '/legal/terms');
      expect(screen.getByRole('link', { name: /privacy policy/i })).toHaveAttribute('href', '/legal/privacy');
      expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/legal/contact');
    });

    it('should display copyright notice', () => {
      render(<Footer />);

      const currentYear = new Date().getFullYear();
      expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
    });
  });
});
```

---

### Story 15.3: Terms of Service (Scope & Tone)

**As a** site operator
**I want** clear, honest Terms of Service
**So that** both parties understand rights and responsibilities without legal intimidation

#### Acceptance Criteria

**Given** the Terms of Service page exists
**When** a user reads it
**Then** they can understand it without a law degree
**And** it reflects how the site actually works
**And** tone is calm and non-threatening

**Given** terms need to be enforced
**When** evaluating a dispute
**Then** terms are clear enough to apply consistently
**And** nothing is ambiguous or unenforceable

#### Implementation Checklist

- [ ] **Terms Content Structure (Already implemented in Story 15.2)**
  - Operator identity and jurisdiction
  - Usage rules (what users can and cannot do)
  - Purchase and access terms
  - Refund policy (14 days, case-by-case)
  - Intellectual property ownership
  - Reasonable liability limitations

- [ ] **Tone Validation**

  ```typescript
  // lib/compliance/tone-checker.ts

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
  ```

- [ ] **Plain Language Readability Score**

  ```typescript
  // lib/compliance/readability.ts

  /**
   * Calculate Flesch Reading Ease score
   * 90-100: Very easy (5th grade)
   * 60-70: Plain English (8th-9th grade) ← TARGET
   * 0-30: Very difficult (college graduate)
   */
  export function calculateReadability(text: string): number {
    const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);
    const words = text.split(/\s+/).filter((w) => w.length > 0);
    const syllables = words.reduce((acc, word) => acc + countSyllables(word), 0);

    const avgSentenceLength = words.length / sentences.length;
    const avgSyllablesPerWord = syllables / words.length;

    const score = 206.835 - 1.015 * avgSentenceLength - 84.6 * avgSyllablesPerWord;

    return Math.round(score);
  }

  function countSyllables(word: string): number {
    word = word.toLowerCase();
    if (word.length <= 3) return 1;

    const vowels = word.match(/[aeiouy]+/g);
    let syllableCount = vowels ? vowels.length : 1;

    // Adjust for silent 'e'
    if (word.endsWith('e')) syllableCount--;

    return Math.max(syllableCount, 1);
  }

  export function assessReadability(score: number): {
    level: 'easy' | 'plain' | 'difficult' | 'very-difficult';
    acceptable: boolean;
  } {
    if (score >= 60 && score <= 80) {
      return { level: 'plain', acceptable: true };
    } else if (score > 80) {
      return { level: 'easy', acceptable: true };
    } else if (score >= 50) {
      return { level: 'difficult', acceptable: false };
    } else {
      return { level: 'very-difficult', acceptable: false };
    }
  }
  ```

#### Testing Requirements

```typescript
// __tests__/legal/terms-tone.test.ts
import { describe, it, expect } from 'vitest';
import { checkLegalTone } from '@/lib/compliance/tone-checker';
import { calculateReadability, assessReadability } from '@/lib/compliance/readability';

describe('Terms of Service Tone', () => {
  it('should reject overly aggressive language', () => {
    const content = 'We are not responsible for anything that happens.';
    const result = checkLegalTone(content);

    expect(result.appropriate).toBe(false);
    expect(result.issues).toContain(expect.stringContaining('aggressive'));
  });

  it('should reject casual language', () => {
    const content = 'Just so you know, lol, we might change things.';
    const result = checkLegalTone(content);

    expect(result.appropriate).toBe(false);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('should accept calm, professional language', () => {
    const content = 'By using this site, you agree to these terms. We will handle disputes fairly.';
    const result = checkLegalTone(content);

    expect(result.appropriate).toBe(true);
    expect(result.issues).toHaveLength(0);
  });

  it('should calculate readability score', () => {
    const simpleText = 'This is a test. It has short words. It is easy to read.';
    const score = calculateReadability(simpleText);

    expect(score).toBeGreaterThan(60); // Plain English or easier
  });

  it('should reject overly complex legal text', () => {
    const complexText =
      'Notwithstanding the aforementioned provisions, the party of the first part hereby acknowledges and agrees that...';
    const score = calculateReadability(complexText);
    const assessment = assessReadability(score);

    expect(assessment.acceptable).toBe(false);
  });
});
```

---

### Story 15.4: Commerce-Specific Compliance (Education Products)

**As a** customer purchasing educational content
**I want** clear, honest product descriptions with no misleading claims
**So that** I know exactly what I'm buying and what to expect

#### Acceptance Criteria

**Given** a product is listed for sale
**When** I read the product description
**Then** it clearly states what's included
**And** makes no guarantees about outcomes or results
**And** refund policy is clearly stated
**And** delivery method is obvious

**Given** I purchase educational content
**When** I access it
**Then** it matches the description exactly
**And** I'm comfortable defending all claims publicly
**And** disputes are rare and resolvable

#### Implementation Checklist

- [ ] **Product Description Standards**

  ```typescript
  // lib/commerce/product-standards.ts

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

  interface ProductCompliance {
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
  ```

- [ ] **Product Page Template with Compliance**

  ```typescript
  // components/products/product-detail-compliant.tsx
  import Link from 'next/link';

  interface ProductDetailCompliantProps {
    product: {
      title: string;
      description: string;
      priceInCents: number;
      format: string;
      deliveryMethod: string;
    };
  }

  export function ProductDetailCompliant({ product }: ProductDetailCompliantProps) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{product.description}</p>
        </div>

        {/* Clear "What's Included" section */}
        <section className="border rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">What's Included</h2>
          <ul className="space-y-2">
            <li>✓ Format: {product.format}</li>
            <li>✓ Delivery: {product.deliveryMethod}</li>
            <li>✓ License: Personal use only, non-transferable</li>
          </ul>
        </section>

        {/* Clear disclaimer - no outcome guarantees */}
        <section className="bg-muted/50 border rounded-lg p-6">
          <h3 className="font-semibold mb-2">Important Notes</h3>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• This is educational content only</li>
            <li>• No guarantees about specific outcomes or results</li>
            <li>• Does not provide credentials or certifications</li>
            <li>• Refund policy available in{' '}
              <Link href="/legal/terms" className="underline">Terms of Service</Link>
            </li>
          </ul>
        </section>

        <div className="flex items-baseline gap-4">
          <span className="text-3xl font-bold">
            ${(product.priceInCents / 100).toFixed(2)}
          </span>
          <button className="btn-primary">
            Purchase Now
          </button>
        </div>
      </div>
    );
  }
  ```

- [ ] **Refund Policy (Already in Terms of Service - Story 15.2)**
  - 14-day window for refund requests
  - Case-by-case review
  - No refunds if significant content accessed
  - Email contact for requests

- [ ] **Pre-Publish Product Validation**

  ```typescript
  // lib/commerce/pre-publish-check.ts
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
    if (!product.description.includes('format') && !product.description.includes('Format')) {
      warnings.push('Product description should clearly state format (PDF, video, etc.)');
    }

    return {
      canPublish: blockers.length === 0,
      blockers,
      warnings,
    };
  }
  ```

#### Testing Requirements

```typescript
// __tests__/commerce/product-compliance.test.ts
import { describe, it, expect } from 'vitest';
import { validateProductDescription } from '@/lib/commerce/product-standards';
import { validateProductBeforePublish } from '@/lib/commerce/pre-publish-check';

describe('Product Description Compliance', () => {
  it('should flag outcome guarantees', () => {
    const result = validateProductDescription(
      'Get a Job in 30 Days',
      'Guaranteed to help you land a software engineering role'
    );

    expect(result.hasOutcomeGuarantee).toBe(true);
    expect(result.issues.length).toBeGreaterThan(0);
  });

  it('should flag credential claims', () => {
    const result = validateProductDescription(
      'Certified Developer Course',
      'Become a certified professional developer'
    );

    expect(result.hasCredentialClaim).toBe(true);
  });

  it('should flag misleading salary claims', () => {
    const result = validateProductDescription(
      'High Income Skills',
      'Learn skills that earn $150k+ average salary'
    );

    expect(result.hasMisleadingResult).toBe(true);
  });

  it('should flag academic equivalence claims', () => {
    const result = validateProductDescription(
      'University Alternative',
      'This course is equivalent to a university degree'
    );

    expect(result.hasAcademicEquivalence).toBe(true);
  });

  it('should accept honest educational descriptions', () => {
    const result = validateProductDescription(
      'Introduction to TypeScript',
      'Educational guide covering TypeScript fundamentals. Format: PDF. Delivered instantly via email.'
    );

    expect(result.hasOutcomeGuarantee).toBe(false);
    expect(result.hasCredentialClaim).toBe(false);
    expect(result.issues).toHaveLength(0);
  });

  it('should block publishing products with outcome guarantees', async () => {
    const result = await validateProductBeforePublish({
      title: 'Guaranteed Success Course',
      description: 'You will get a job in 60 days or your money back',
    });

    expect(result.canPublish).toBe(false);
    expect(result.blockers.length).toBeGreaterThan(0);
  });
});
```

---

### Story 15.5: Professional Email Communication Standards

**As a** customer receiving transactional emails
**I want** professional, trustworthy communication
**So that** I know the emails are legitimate and the business is real

#### Acceptance Criteria

**Given** the site sends transactional emails
**When** I receive an email
**Then** it comes from a custom domain (not Gmail/Yahoo)
**And** sender identity is consistent and clear
**And** email signature includes business name and website
**And** tone is professional, not casual

**Given** I need to contact support
**When** I reply to a transactional email
**Then** my reply reaches the operator
**And** response comes from the same professional address

#### Implementation Checklist

- [ ] **Email Configuration (Environment Variables)**

  ```bash
  # .env.local
  EMAIL_FROM="hello@yourdomain.com"
  EMAIL_DOMAIN="yourdomain.com"
  BUSINESS_NAME="Your Name"
  SITE_URL="https://yourdomain.com"

  # Email server (e.g., Resend, SendGrid, AWS SES)
  EMAIL_SERVER_HOST="smtp.resend.com"
  EMAIL_SERVER_PORT="587"
  EMAIL_SERVER_USER="resend"
  EMAIL_SERVER_PASSWORD="re_xxx..."
  ```

- [ ] **Email Templates with Professional Standards**

  ```typescript
  // lib/email/templates.tsx
  import { BUSINESS_IDENTITY } from '@/lib/config/business-identity';

  interface EmailTemplateProps {
    children: React.ReactNode;
  }

  export function EmailTemplate({ children }: EmailTemplateProps) {
    return (
      <html>
        <body style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
          <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            {children}

            <div style={{
              marginTop: '40px',
              paddingTop: '20px',
              borderTop: '1px solid #eee',
              fontSize: '14px',
              color: '#666',
            }}>
              <p style={{ margin: '0 0 8px 0' }}>
                {BUSINESS_IDENTITY.operator.name}
              </p>
              <p style={{ margin: '0 0 8px 0' }}>
                <a href={BUSINESS_IDENTITY.domain.primary} style={{ color: '#0066cc' }}>
                  {BUSINESS_IDENTITY.domain.primary}
                </a>
              </p>
              <p style={{ margin: '0', fontSize: '12px' }}>
                Questions? Reply to this email or visit our{' '}
                <a href={`${BUSINESS_IDENTITY.domain.primary}/legal/contact`} style={{ color: '#0066cc' }}>
                  contact page
                </a>
              </p>
            </div>
          </div>
        </body>
      </html>
    );
  }

  // Purchase confirmation email
  export function PurchaseConfirmationEmail({
    customerEmail,
    productTitle,
    orderNumber,
    accessUrl,
  }: {
    customerEmail: string;
    productTitle: string;
    orderNumber: string;
    accessUrl: string;
  }) {
    return (
      <EmailTemplate>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          Thank you for your purchase
        </h1>

        <p>Hi,</p>

        <p>
          Your purchase of <strong>{productTitle}</strong> is complete.
        </p>

        <div style={{
          backgroundColor: '#f5f5f5',
          padding: '16px',
          borderRadius: '8px',
          margin: '20px 0',
        }}>
          <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>
            Order: {orderNumber}
          </p>
          <a
            href={accessUrl}
            style={{
              display: 'inline-block',
              padding: '12px 24px',
              backgroundColor: '#0066cc',
              color: '#ffffff',
              textDecoration: 'none',
              borderRadius: '6px',
              marginTop: '8px',
            }}
          >
            Access Your Content
          </a>
        </div>

        <p>
          If you have any questions, reply to this email.
        </p>

        <p style={{ marginTop: '24px' }}>
          Thanks,<br />
          {BUSINESS_IDENTITY.operator.name}
        </p>
      </EmailTemplate>
    );
  }

  // Magic link email (authentication)
  export function MagicLinkEmail({
    magicLink,
  }: {
    magicLink: string;
  }) {
    return (
      <EmailTemplate>
        <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>
          Sign in to your account
        </h1>

        <p>
          Click the button below to sign in. This link expires in 1 hour.
        </p>

        <a
          href={magicLink}
          style={{
            display: 'inline-block',
            padding: '12px 24px',
            backgroundColor: '#0066cc',
            color: '#ffffff',
            textDecoration: 'none',
            borderRadius: '6px',
            margin: '20px 0',
          }}
        >
          Sign In
        </a>

        <p style={{ fontSize: '14px', color: '#666' }}>
          If you didn't request this email, you can safely ignore it.
        </p>
      </EmailTemplate>
    );
  }
  ```

- [ ] **Email Sending Service Configuration**

  ```typescript
  // lib/email/send.ts
  import { Resend } from 'resend';
  import { EMAIL_STANDARDS } from './config';

  const resend = new Resend(process.env.EMAIL_SERVER_PASSWORD);

  export async function sendTransactionalEmail({
    to,
    subject,
    react,
  }: {
    to: string;
    subject: string;
    react: React.ReactElement;
  }) {
    try {
      const { data, error } = await resend.emails.send({
        from: EMAIL_STANDARDS.from.transactional,
        to,
        subject,
        react,
      });

      if (error) {
        console.error('Email send error:', error);
        throw new Error('Failed to send email');
      }

      return data;
    } catch (error) {
      console.error('Email send exception:', error);
      throw error;
    }
  }
  ```

- [ ] **Email Domain Verification Checklist**

  ```markdown
  # Email Domain Setup Checklist

  ## DNS Records Required

  - [ ] SPF record (prevents spoofing)
  ```

  TXT @ "v=spf1 include:\_spf.resend.com ~all"

  ```

  - [ ] DKIM record (email authentication)
  ```

  TXT resend.\_domainkey "p=<public-key>"

  ```

  - [ ] DMARC record (email policy)
  ```

  TXT \_dmarc "v=DMARC1; p=quarantine; rua=mailto:hello@yourdomain.com"

  ```

  ## Verification Steps

  1. Add DNS records via domain registrar
  2. Verify domain in email service (Resend/SendGrid)
  3. Send test email to yourself
  4. Check spam score (mail-tester.com)
  5. Verify sender identity displays correctly

  ## Success Criteria

  - [ ] Emails land in inbox (not spam)
  - [ ] Sender shows as "Your Name <hello@yourdomain.com>"
  - [ ] Reply-to works correctly
  - [ ] No security warnings in Gmail/Outlook
  ```

#### Testing Requirements

```typescript
// __tests__/email/professional-standards.test.ts
import { describe, it, expect, vi } from 'vitest';
import { render } from '@react-email/render';
import { PurchaseConfirmationEmail, MagicLinkEmail } from '@/lib/email/templates';
import { BUSINESS_IDENTITY } from '@/lib/config/business-identity';

describe('Professional Email Standards', () => {
  it('should use custom domain for email', () => {
    expect(BUSINESS_IDENTITY.contact.email).toMatch(/@[a-z0-9-]+\.[a-z]{2,}$/);
    expect(BUSINESS_IDENTITY.contact.email).not.toMatch(/@gmail\.com$/);
    expect(BUSINESS_IDENTITY.contact.email).not.toMatch(/@yahoo\.com$/);
  });

  it('should include professional signature in purchase confirmation', () => {
    const html = render(
      <PurchaseConfirmationEmail
        customerEmail="customer@example.com"
        productTitle="Test Product"
        orderNumber="ORD123"
        accessUrl="https://example.com/access"
      />
    );

    expect(html).toContain(BUSINESS_IDENTITY.operator.name);
    expect(html).toContain(BUSINESS_IDENTITY.domain.primary);
  });

  it('should have clear call-to-action in emails', () => {
    const html = render(
      <PurchaseConfirmationEmail
        customerEmail="customer@example.com"
        productTitle="Test Product"
        orderNumber="ORD123"
        accessUrl="https://example.com/access"
      />
    );

    expect(html).toContain('Access Your Content');
    expect(html).toContain('https://example.com/access');
  });

  it('should not use casual language in transactional emails', () => {
    const html = render(
      <MagicLinkEmail magicLink="https://example.com/auth/verify" />
    );

    // Banned casual phrases
    expect(html.toLowerCase()).not.toContain('lol');
    expect(html.toLowerCase()).not.toContain('tbh');
    expect(html.toLowerCase()).not.toContain('just so you know');
    expect(html.toLowerCase()).not.toContain('hey there');
  });
});
```

---

## Stories 15.6 - 15.13 (Abbreviated)

Following the established pattern from previous epics, the remaining stories are summarized below with key implementation points:

### Story 15.6: Intellectual Property Posture

**Focus:** Protect your work without hostility

**Key Implementation:**

- Clear ownership statement in Terms of Service (already covered in Story 15.2)
- Personal use license for purchasers
- Non-redistribution clause
- Trust-first framing (no DRM theatrics)

**Acceptance Criteria:**

- IP terms are understandable
- Enforcement does not harm legitimate users
- License terms clearly stated on product pages

---

### Story 15.7: Business Identity Clarity

**Focus:** Make the operator real and accountable

**Key Implementation:**

- Business identity configuration (already implemented in Story 15.2)
- Operator name clearly stated in footer and legal pages
- Jurisdiction declared
- Contact method always available

**Acceptance Criteria:**

- Employers know who they're dealing with
- Customers know who to contact
- No ambiguity about business structure

---

### Story 15.8: Email Communication (Already Covered in Story 15.5)

**Focus:** Professional email standards with custom domain

**Key Implementation:**

- Custom domain email (e.g., hello@yourdomain.com)
- Professional email templates
- Consistent sender identity
- Clear email signatures

---

### Story 15.9: Branding Restraint as Legitimacy

**Focus:** Avoid undermining seriousness with style

**Key Implementation:**

```typescript
// lib/content/tone-standards.ts
export const TONE_RULES = {
  legal: 'professional', // No jokes, no memes
  transactional: 'clear-and-calm', // No casual language
  footer: 'straightforward', // No irony
  marketing: 'confident-not-hype', // Can be engaging but not gimmicky
} as const;
```

**Banned Patterns:**

- Meme copy in legal pages
- Irony in transactional contexts
- Casual jokes in footer
- "Side hustle" energy

**Acceptance Criteria:**

- Tone never conflicts with professionalism
- Serious moments treated seriously
- No cringe when showing site to employers

---

### Story 15.10: Accessibility & Fairness Signals

**Focus:** Show professionalism through inclusivity

**Key Implementation:**

- Clear language (readability score 60-80)
- Accessible navigation (semantic HTML, ARIA labels)
- Reasonable refund handling
- Transparent policies (no hidden clauses)

**Testing:**

```bash
# Accessibility testing
npx axe-cli https://yourdomain.com
npx lighthouse https://yourdomain.com --only-categories=accessibility
```

**Acceptance Criteria:**

- No user feels tricked or excluded
- Complaints are rare and reasonable
- Site meets WCAG 2.1 AA standards

---

### Story 15.11: Employer-Facing Legitimacy Checks

**Focus:** Pass subconscious hiring filters

**Signals Employers Look For:**

- ✓ Proper custom domain (not subdomain)
- ✓ HTTPS everywhere
- ✓ Clear legal structure
- ✓ No broken links
- ✓ No legal sloppiness
- ✓ Calm, professional tone

**Red Flags to Avoid:**

- ✗ Missing policies
- ✗ Placeholder text ("Lorem ipsum", "Coming soon")
- ✗ Over-marketing ("10X your income!")
- ✗ "Side hustle" energy
- ✗ Free email addresses (Gmail)
- ✗ Unprofessional domain names

**Pre-Launch Checklist:**

```typescript
// scripts/legitimacy-check.ts
export async function runLegitimacyCheck(siteUrl: string) {
  const checks = [
    { name: 'Has Terms of Service', test: () => fetch(`${siteUrl}/legal/terms`).then((r) => r.ok) },
    { name: 'Has Privacy Policy', test: () => fetch(`${siteUrl}/legal/privacy`).then((r) => r.ok) },
    { name: 'Has Contact Info', test: () => fetch(`${siteUrl}/legal/contact`).then((r) => r.ok) },
    { name: 'Uses HTTPS', test: () => siteUrl.startsWith('https://') },
    {
      name: 'Custom Domain',
      test: () => !siteUrl.includes('vercel.app') && !siteUrl.includes('netlify.app'),
    },
    // Add more checks...
  ];

  for (const check of checks) {
    const result = await check.test();
    console.log(`${result ? '✓' : '✗'} ${check.name}`);
  }
}
```

**Acceptance Criteria:**

- Site feels comparable to serious professionals
- Nothing invites skepticism
- Comfortable showing to potential employers

---

### Story 15.12: Jurisdiction & Future-Proofing

**Focus:** Avoid painting yourself into a corner

**Key Implementation:**

```typescript
// lib/config/business-identity.ts (flexible structure)
export const BUSINESS_IDENTITY = {
  operator: {
    name: process.env.BUSINESS_OPERATOR_NAME!,
    type: process.env.BUSINESS_TYPE as 'individual' | 'sole-trader' | 'company',
    jurisdiction: process.env.BUSINESS_JURISDICTION!,
  },
  // ... can be updated via env vars without code changes
};
```

**Flexible Policy Language:**

- "Operated by [Name]" (can change entity later)
- "Governed by laws of [Jurisdiction]" (can update if relocate)
- "We may update these terms" (allows evolution)

**Acceptance Criteria:**

- Can evolve site without rewriting everything
- Legal posture scales with growth
- Entity can be updated (individual → company) without major changes

---

### Story 15.13: Governance & Periodic Review

**Focus:** Keep legitimacy intact over time

**Key Implementation:**

```typescript
// lib/compliance/governance.ts
export const GOVERNANCE_SCHEDULE = {
  legalReview: {
    frequency: 'annual',
    lastCompleted: null,
    nextDue: null,
    checklist: [
      'Review Terms of Service for accuracy',
      'Review Privacy Policy (update if data practices changed)',
      'Verify contact information current',
      'Check for new legal requirements',
      'Update copyright year in footer',
    ],
  },
  policyUpdates: {
    triggers: [
      'Product changes (new formats, delivery methods)',
      'Entity changes (individual → company)',
      'Jurisdiction changes (relocation)',
      'New legal requirements',
    ],
  },
};
```

**Review Cadence:**

- Annual legal/policy review
- Update when products change
- Update when entity changes
- Monitor for new legal requirements

**Acceptance Criteria:**

- Policies reflect reality
- Drift is caught early
- Review dates documented

---

## EPIC 15 Deliverables Summary

By the end of EPIC 15, you have:

✅ **Clear legal pages**

- Terms of Service (plain language, calm tone)
- Privacy Policy (from Epic 14)
- Contact/Operator information

✅ **Honest, readable policies**

- No legal theater
- No overclaiming
- Flesch reading score 60-80 (plain English)

✅ **Professional communication standards**

- Custom domain email (hello@yourdomain.com)
- Consistent sender identity
- Professional signatures

✅ **Explicit accountability**

- Clear operator identity
- Jurisdiction declared
- Contact method always available

✅ **Legitimacy signals**

- No placeholder text
- No "side hustle" energy
- Employer-grade professionalism

✅ **Commerce compliance**

- No outcome guarantees
- Clear refund policy
- Honest product descriptions

✅ **Governance process**

- Annual review schedule
- Policy accuracy monitoring
- Update triggers defined

---

## Why EPIC 15 Matters

Most personal sites fail here quietly.

Not because they're illegal —
but because they feel **unfinished, unserious, or amateur**.

When EPIC 15 is complete:

> **Nothing undermines trust.**
> **Nothing feels improvised.**
> **Nothing raises questions.**

---

## Dependencies

**Requires:**

- **Epic 0:** Infrastructure (domain, hosting, email service)
- **Epic 9:** Content publishing system (for legal pages)
- **Epic 14:** Privacy Policy (referenced in legal pages)

**Enables:**

- Public launch with professional legitimacy
- Job applications that reference this work
- Customer trust and reduced disputes

---

## Testing Strategy

### Unit Tests

- Legal content validation (tone, readability, completeness)
- Product description compliance checks
- Email template rendering
- Business identity configuration

### Integration Tests

- Legal page rendering with correct links
- Footer displays all legal links
- Email sending with professional standards
- Domain verification

### Manual Checks

- Read all legal pages as if you're a customer
- Send test emails to various providers (Gmail, Outlook, etc.)
- Check spam scores
- Review with fresh eyes for professionalism

### Pre-Launch Checklist

```bash
# Run automated legitimacy check
npm run check:legitimacy

# Accessibility audit
npm run test:a11y

# Email deliverability test
npm run test:email

# Legal content validation
npm run test:legal
```

---

## Risk Mitigation

**Risk:** Legal pages are too aggressive or confusing
**Mitigation:** Plain language validation, readability scoring, tone checking

**Risk:** Email deliverability issues (land in spam)
**Mitigation:** Proper DNS configuration (SPF, DKIM, DMARC), domain verification, testing

**Risk:** Policies drift from reality over time
**Mitigation:** Annual review schedule, update triggers, governance process

**Risk:** Product descriptions make unsupportable claims
**Mitigation:** Pre-publish validation, banned phrase detection, compliance checks

---

## Success Metrics

**Objective Metrics:**

- Legal pages exist and load correctly: 100%
- Email deliverability rate: >95%
- Accessibility score: >90
- Readability score: 60-80 (plain English)

**Subjective Metrics:**

- "Would I show this to a potential employer?" → Yes
- "Do policies reflect how site actually works?" → Yes
- "Can I explain every legal clause?" → Yes
- "Does email look trustworthy?" → Yes

**Business Metrics:**

- Customer disputes: <1% of transactions
- Refund requests: <5% of purchases
- "Who runs this?" questions: 0

---

## Next Steps After Epic 15

With all 15 epics complete, you now have a **complete, employer-grade system architecture**:

0. Identity & Proof (who you are)
1. Content & Publishing (what you teach)
2. Showcase & Discovery (why you're credible)
3. Trial & Proof (try before buy)
4. Clarity & Honesty (transparent pricing)
5. Frictionless Payment (Stripe checkout)
6. Instant Access (immediate delivery)
7. Returning Visitors (persistent access)
8. Content Organization (structured learning)
9. Production Publishing (markdown-based CMS)
10. Delivery & Distribution (PDF generation)
11. Admin & Operations (content management)
12. Performance & Trust (speed, reliability)
13. Analytics & Insight (minimal tracking)
14. Security & Privacy (protection without paranoia)
15. Legal & Legitimacy (professional presence)

**Ready to move from vision to execution:**

1. Collapse into phased execution roadmap (MVP → V1 → V2)
2. Translate into technical architecture diagram
3. Generate launch checklist
4. Begin implementation with Epic 0 (Infrastructure)
