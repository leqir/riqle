# EPIC 10 — Customer Access & Delivery (Post-Purchase Trust)

**Epic ID:** 10
**Epic Name:** Customer Access & Delivery (Post-Purchase Trust)
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 8 (Resources & Commerce), Epic 9 (Payments & Checkout)
**Total Stories:** 14

---

## Epic Overview

### Purpose

Ensure that once someone pays, **everything just works**.

**This epic is about what happens _after_ payment** — the moment where trust is either confirmed or quietly destroyed.

### User Outcome

This epic exists to:

- Eliminate post-purchase anxiety
- Prevent support friction
- Reinforce the perception that this is a **serious, well-run system**

### Core Questions Answered

**"Where is my stuff?"**
**"How do I access it again later?"**
**"What if I lose the link?"**
**"What if something goes wrong?"**

**Before the customer asks.**

### Critical Principle

For employers, this is silent proof of operational maturity.
For customers, this is the difference between relief and regret.

---

## Architecture Decisions

### Access Model

```
Email-based access (primary)
├── Magic links with signed tokens
├── Expiring access URLs (7-day default)
└── Self-serve recovery flow

Account-based access (optional)
├── NextAuth magic link login
└── Persistent entitlement dashboard
```

### Access Flow

```
1. Purchase completes (Epic 9)
2. Entitlement granted
3. Access email sent with magic link
4. Customer clicks link → Access page
5. Access page checks entitlement → Shows downloads
6. Downloads use signed URLs (1-hour expiry)
```

### Security Model

- All files stored privately (Vercel Blob or S3 private bucket)
- Access pages require valid entitlement check
- Downloads served via signed URLs (regenerated on demand)
- Magic links expire after 7 days (can be regenerated)

---

## Stories

### Story 10.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **customer who just purchased**,
I want **to know exactly where my purchase is and how to access it**,
So that **I never wonder what to do after paying**.

#### Acceptance Criteria

**Given** a customer completes a purchase
**When** they navigate through post-purchase flows
**Then** they never wonder what to do after paying
**And** you rarely receive "I can't find my purchase" emails
**And** all questions are answered before being asked

#### Questions to Answer

- "Where is my stuff?"
- "How do I access it again later?"
- "What if I lose the link?"
- "What if something goes wrong?"

#### Implementation Checklist

- [ ] Define post-purchase success criteria

  ```markdown
  # Post-Purchase Success Criteria

  ## Customer Never Wonders

  - [ ] Where purchased content is
  - [ ] How to access it
  - [ ] How to access again later
  - [ ] What to do if link is lost
  - [ ] How to get support

  ## Support Inquiries Target

  - "I can't find my purchase" emails: <5% of purchases
  - "How do I download" emails: <2% of purchases
  - Access-related support: <10% of purchases

  ## Customer Experience Goals

  - Immediate clarity post-purchase
  - Self-serve recovery
  - No confusion about access
  - Relief, not regret
  ```

- [ ] Document all questions customers might ask
- [ ] Create answers for each question
- [ ] Design flows that answer questions proactively

#### Testing Requirements

- [ ] Clarity test: Do customers know where their purchase is?
- [ ] Support test: Are support inquiries <10% of purchases?
- [ ] Anxiety test: Do customers feel relief or confusion?

---

### Story 10.2: Access Philosophy (Calm, Boring, Predictable)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **customer**,
I want **access to feel inevitable, not clever**,
So that **I trust the system works correctly**.

#### Acceptance Criteria

**Given** the access system is designed
**When** evaluating its philosophy
**Then** the access model can be explained in one sentence
**And** nothing feels experimental or fragile
**And** access feels inevitable, not clever

#### Core Principles

✅ Access is **earned**, not "unlocked"
✅ Entitlements govern access, not URLs
✅ The system assumes good faith, not hostility

#### Explicit Bans

❌ Gamified unlocks
❌ "Congratulations!" theatrics
❌ Confusing dashboards
❌ Forced account creation unless necessary

#### Implementation Checklist

- [ ] Create access philosophy document

  ```markdown
  # Access Philosophy: Calm, Boring, Predictable

  ## Core Principles

  1. **Access is earned, not "unlocked"**
     - You paid → You have access
     - No gamification, no artificial steps

  2. **Entitlements govern access, not URLs**
     - Access is tied to email/account, not specific links
     - Links can be regenerated anytime

  3. **System assumes good faith, not hostility**
     - No DRM paranoia
     - Reasonable download limits
     - Trust legitimate customers

  ## One-Sentence Access Model

  "When you purchase, you receive an email with a link to your access page, where you can download files anytime using your purchase email."

  ## Banned Patterns

  - Gamified unlocks ("Achievement unlocked!")
  - Congratulations theatrics ("You're in the VIP club!")
  - Confusing dashboards with unnecessary complexity
  - Forced account creation for simple downloads

  ## Allowed Patterns

  - Simple, direct access
  - Clear access instructions
  - Self-serve recovery
  - Calm, professional tone
  ```

- [ ] Document one-sentence access model
- [ ] Review for experimental or fragile patterns
- [ ] Remove any gamification or theatrics

#### Testing Requirements

- [ ] One-sentence test: Can access be explained in one sentence?
- [ ] Fragility test: Does anything feel experimental?
- [ ] Trust test: Do customers trust the system works?

---

### Story 10.3: Access Models (Choose Deliberately)

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **system architect**,
I want **to support the simplest viable access paths**,
So that **access method matches product complexity and customer expectations**.

#### Acceptance Criteria

**Given** access models are designed
**When** evaluating them
**Then** access method matches product complexity
**And** customers are not confused by options
**And** one primary access strategy per resource type

#### Supported Access Types

**1. Email-based access (primary)**

- Secure, expiring magic links
- Ideal for one-off resources
- No account required

**2. Account-based access (optional, if needed)**

- Email login via NextAuth
- Used only when repeat access is valuable
- Persistent entitlement dashboard

#### Rules

✅ Do not force accounts unnecessarily
✅ Do not mix access models for the same product
✅ Choose one primary access strategy per resource type

#### Implementation Checklist

- [ ] Define access model decision matrix

  ```markdown
  # Access Model Decision Matrix

  ## Email-Based Access

  **Use when:**

  - One-time resources (PDFs, guides)
  - Simple products with few files
  - Customer doesn't need frequent re-access
  - Simplicity is paramount

  **Implementation:**

  - Generate magic link (JWT token with email + productId)
  - Email link to access page
  - Access page checks token validity
  - Access page checks entitlement
  - Show download links

  ## Account-Based Access

  **Use when:**

  - Multiple products per customer
  - Frequent re-access expected
  - Customer wants to see all purchases
  - Future product updates delivered

  **Implementation:**

  - NextAuth magic link login
  - User dashboard showing all entitlements
  - Each product has dedicated access page
  - Downloads require authentication

  ## Decision for Riqle

  **Primary:** Email-based access
  **Rationale:** Simple resources, one-time purchases, avoid complexity

  ## Migration Path

  If needed later:

  - Add account creation option
  - Migrate email-based access to accounts
  - Preserve existing magic links
  ```

- [ ] Choose primary access model (email-based recommended)
- [ ] Implement chosen access model
- [ ] Document why this model was chosen
- [ ] Ensure no mixing of models per product

#### Testing Requirements

- [ ] Complexity match test: Does access match product complexity?
- [ ] Confusion test: Are customers confused by access options?
- [ ] Consistency test: Is one model used per product type?

---

### Story 10.4: Post-Purchase Confirmation Experience

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer who just paid**,
I want **immediate certainty about what happens next**,
So that **I feel relief, not anxiety**.

#### Acceptance Criteria

**Given** a purchase completes
**When** customer views confirmation
**Then** they feel relief immediately after payment
**And** email alone is sufficient to regain access later
**And** no marketing content is present

#### Immediate Confirmation (On-Screen)

- Clear success message
- Simple statement of what happens next
- Link to access (if instant)
- Statement that email has been sent

#### Confirmation Email

- Arrives within seconds
- Contains:
  - What was purchased
  - How to access it
  - How to get help

#### Rules

❌ No marketing content
❌ No additional offers
❌ No urgency

#### Implementation Checklist

- [ ] Create success page (already in Epic 9, enhance here)

  ```tsx
  // app/resources/success/page.tsx
  export default async function SuccessPage({
    searchParams,
  }: {
    searchParams: { session_id?: string };
  }) {
    const session = searchParams.session_id
      ? await stripe.checkout.sessions.retrieve(searchParams.session_id)
      : null;

    const order = session
      ? await db.order.findUnique({
          where: { stripeSessionId: session.id },
          include: { items: { include: { product: true } } },
        })
      : null;

    return (
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Purchase complete</h1>

          {order && (
            <p className="text-body text-stone-700">
              Thank you for purchasing <strong>{order.items[0].product.title}</strong>.
            </p>
          )}
        </div>

        <div className="space-y-4 rounded-lg bg-stone-50 p-6">
          <h2 className="text-h3 font-semibold text-stone-900">What happens next</h2>
          <ol className="text-body list-inside list-decimal space-y-2 text-stone-700">
            <li>You'll receive an email with access instructions within 1 minute</li>
            <li>Click the access link in the email to view and download your files</li>
            <li>Save the email — you can use it to access your purchase anytime</li>
          </ol>
        </div>

        <div className="space-y-4">
          <h2 className="text-h3 font-semibold text-stone-900">Need help?</h2>
          <p className="text-body text-stone-600">
            If you don't receive an email within 5 minutes, check your spam folder or contact{' '}
            <a href="mailto:support@example.com" className="text-accent hover:underline">
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
  ```

- [ ] Enhance access email (already in Epic 9, refine here)

  ```typescript
  // lib/email/templates.ts
  export function accessEmailTemplate(
    order: Order & { items: Array<{ product: Product }> },
    entitlement: Entitlement
  ) {
    const product = order.items[0].product;
    const accessToken = generateAccessToken(entitlement.userId, product.id);
    const accessUrl = `${process.env.NEXT_PUBLIC_URL}/access/${product.slug}?token=${accessToken}`;

    return {
      subject: `Access: ${product.title}`,
      html: `
        <h1>Purchase Complete</h1>

        <p>Thank you for purchasing <strong>${product.title}</strong>.</p>

        <h2>Access your files</h2>
        <p><a href="${accessUrl}" style="display: inline-block; padding: 12px 24px; background: #1c1917; color: white; text-decoration: none; border-radius: 6px;">Access ${product.title}</a></p>

        <p>Or copy this link: ${accessUrl}</p>

        <h2>What you get</h2>
        ${product.whatYouGet}

        <h2>Access anytime</h2>
        <p>Save this email. You can use the link above to access your files anytime within 7 days. After that, you can request a new access link.</p>

        <h2>Need help?</h2>
        <p>Reply to this email or contact support@example.com</p>

        <h2>Refund policy</h2>
        <p>14-day refund window, no questions asked. Just reply to this email.</p>

        <p>—<br>Nathanael</p>
      `,
      text: `Purchase Complete
  ```

Thank you for purchasing ${product.title}.

Access your files:
${accessUrl}

What you get:
${product.whatYouGet}

Access anytime:
Save this email. You can use the link above to access your files anytime within 7 days. After that, you can request a new access link.

Need help?
Reply to this email or contact support@example.com

Refund policy:
14-day refund window, no questions asked. Just reply to this email.

—
Nathanael
`,
};
}

````
- [ ] Test confirmation appears immediately
- [ ] Test email arrives within 60 seconds
- [ ] Remove any marketing content

#### Testing Requirements
- [ ] Immediacy test: Does confirmation appear immediately?
- [ ] Relief test: Do customers feel relief or anxiety?
- [ ] Email test: Does email arrive within 60 seconds?
- [ ] Sufficiency test: Is email alone sufficient for future access?

---

### Story 10.5: Access Landing Pages (Single Source of Truth)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story
As a **customer**,
I want **a dedicated access page for my purchase**,
So that **I can return anytime and know where I am**.

#### Acceptance Criteria
**Given** an access page exists
**When** customers visit it
**Then** they can return anytime and know where they are
**And** there's no reliance on buried emails alone
**And** the page is bookmarkable

#### Requirements
- A dedicated access page per product
- Clear title ("Access: [Resource Name]")
- Description of what's included
- Download / view links
- Support contact link

#### Rules
✅ One access page per product
✅ Access page is bookmarkable
✅ Access page checks entitlement on load

#### Implementation Checklist
- [ ] Create access page route
```tsx
// app/access/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { verifyAccessToken } from '@/lib/access-tokens';
import { checkAccess } from '@/lib/entitlements';

export default async function AccessPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { token?: string };
}) {
  // Get product
  const product = await db.product.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!product) {
    notFound();
  }

  // Verify access token
  const decoded = searchParams.token
    ? verifyAccessToken(searchParams.token)
    : null;

  if (!decoded) {
    return <AccessDenied product={product} />;
  }

  // Check entitlement
  const hasAccess = await checkAccess(decoded.userId, product.id);

  if (!hasAccess) {
    return <AccessRevoked product={product} />;
  }

  return <AccessGranted product={product} userId={decoded.userId} />;
}
````

- [ ] Create AccessGranted component

  ```tsx
  // components/access/AccessGranted.tsx
  export function AccessGranted({ product, userId }: { product: Product; userId: string }) {
    return (
      <div className="mx-auto max-w-3xl space-y-12 px-6 py-16">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Access: {product.title}</h1>
          <p className="text-body text-stone-600">You have full access to this resource.</p>
        </div>

        {/* What's included */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">What's included</h2>
          <div className="prose prose-stone max-w-none">{product.whatYouGet}</div>
        </section>

        {/* Download links */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Download files</h2>
          <div className="space-y-3">
            {product.downloadUrls.map((url, index) => (
              <a
                key={index}
                href={`/api/download/${product.id}/${index}?userId=${userId}`}
                className="block rounded-lg border border-stone-200 p-4 transition-colors hover:border-stone-300"
              >
                <div className="flex items-center justify-between">
                  <span className="text-body text-stone-900">{getFileName(url)}</span>
                  <span className="text-meta text-stone-500">Download →</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Support */}
        <section className="space-y-4 border-t border-stone-200 pt-8">
          <h2 className="text-h3 font-semibold text-stone-900">Need help?</h2>
          <p className="text-body text-stone-600">
            Contact{' '}
            <a href="mailto:support@example.com" className="text-accent hover:underline">
              support@example.com
            </a>
          </p>
        </section>
      </div>
    );
  }
  ```

- [ ] Create AccessDenied component
- [ ] Create AccessRevoked component
- [ ] Test access page loads correctly
- [ ] Test entitlement check works
- [ ] Ensure page is bookmarkable

#### Testing Requirements

- [ ] Bookmarkable test: Can customers bookmark and return?
- [ ] Clarity test: Do customers know where they are?
- [ ] Entitlement test: Does page properly check access?

---

### Story 10.6: Secure Downloads & Content Viewing

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **operator**,
I want **to protect content without punishing users**,
So that **legitimate customers aren't locked out and sharing doesn't grant access**.

#### Acceptance Criteria

**Given** secure downloads are implemented
**When** customers download files
**Then** sharing links does not grant access
**And** legitimate customers are not locked out
**And** all files are served via expiring signed URLs

#### Requirements

✅ All files stored privately
✅ Downloads served via expiring signed URLs
✅ Access links regenerated on demand
✅ View limits reasonable (no paranoia)

#### Rules

❌ Do not show raw storage URLs
❌ Do not expose permanent links
❌ Do not over-restrict legitimate use

#### Implementation Checklist

- [ ] Implement secure download endpoint

  ```typescript
  // app/api/download/[productId]/[fileIndex]/route.ts
  import { NextRequest, NextResponse } from 'next/server';
  import { checkAccess } from '@/lib/entitlements';
  import { generateSignedUrl } from '@/lib/storage';

  export async function GET(
    req: NextRequest,
    { params }: { params: { productId: string; fileIndex: string } }
  ) {
    const searchParams = req.nextUrl.searchParams;
    const userId = searchParams.get('userId');

    if (!userId) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Check entitlement
    const hasAccess = await checkAccess(userId, params.productId);

    if (!hasAccess) {
      return new Response('Access denied', { status: 403 });
    }

    // Get product
    const product = await db.product.findUnique({
      where: { id: params.productId },
    });

    if (!product) {
      return new Response('Product not found', { status: 404 });
    }

    const fileIndex = parseInt(params.fileIndex);
    const fileUrl = product.downloadUrls[fileIndex];

    if (!fileUrl) {
      return new Response('File not found', { status: 404 });
    }

    // Generate signed URL (1 hour expiry)
    const signedUrl = await generateSignedUrl(fileUrl, 3600);

    // Redirect to signed URL
    return NextResponse.redirect(signedUrl);
  }
  ```

- [ ] Implement signed URL generation (already in Epic 9)
- [ ] Store files in private storage
- [ ] Test sharing link doesn't grant access
- [ ] Test legitimate customers can download multiple times

#### Testing Requirements

- [ ] Sharing test: Does shared link grant access? (Should be no)
- [ ] Lockout test: Can legitimate customers re-download?
- [ ] Expiry test: Do signed URLs expire correctly?

---

### Story 10.7: Re-Access & Recovery Flows

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a **customer who lost my access link**,
I want **to recover access without contacting support**,
So that **I can regain access to my purchase quickly**.

#### Acceptance Criteria

**Given** recovery flows exist
**When** customers lose access links
**Then** they can recover access without contacting you
**And** support requests drop over time
**And** error messages are calm and helpful

#### Required Recovery Paths

1. "Resend access email"
2. Email-based lookup (enter purchase email)
3. Admin manual resend (fallback)

#### Rules

✅ Recovery must be self-serve where possible
✅ No account required just to recover access
✅ Error messages must be calm and helpful

#### Implementation Checklist

- [ ] Create recovery page

  ```tsx
  // app/access/recover/page.tsx
  'use client';

  import { useState } from 'react';

  export default function RecoverAccessPage() {
    const [email, setEmail] = useState('');
    const [productId, setProductId] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    async function handleSubmit(e: React.FormEvent) {
      e.preventDefault();
      setStatus('loading');

      const res = await fetch('/api/access/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, productId }),
      });

      if (res.ok) {
        setStatus('success');
        setMessage('Access email sent. Check your inbox within 5 minutes.');
      } else {
        setStatus('error');
        const data = await res.json();
        setMessage(data.error || 'Something went wrong. Please try again.');
      }
    }

    return (
      <div className="mx-auto max-w-md space-y-8 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Recover access</h1>
          <p className="text-body text-stone-600">
            Enter the email you used to purchase and we'll send you a new access link.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-body block font-medium text-stone-900">
              Purchase email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="focus:ring-accent w-full rounded-md border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="product" className="text-body block font-medium text-stone-900">
              Product (optional)
            </label>
            <select
              id="product"
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="focus:ring-accent w-full rounded-md border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2"
            >
              <option value="">All products</option>
              {/* Fetch and populate products */}
            </select>
          </div>

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full rounded-md bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-800 disabled:opacity-50"
          >
            {status === 'loading' ? 'Sending...' : 'Send access link'}
          </button>
        </form>

        {status === 'success' && (
          <div className="rounded-md border border-green-200 bg-green-50 p-4">
            <p className="text-body text-green-900">{message}</p>
          </div>
        )}

        {status === 'error' && (
          <div className="rounded-md border border-red-200 bg-red-50 p-4">
            <p className="text-body text-red-900">{message}</p>
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] Create recovery API endpoint

  ```typescript
  // app/api/access/recover/route.ts
  import { NextRequest, NextResponse } from 'next/server';
  import { db } from '@/lib/db';
  import { sendAccessEmail } from '@/lib/email';

  export async function POST(req: NextRequest) {
    const { email, productId } = await req.json();

    // Find entitlements for this email
    const entitlements = await db.entitlement.findMany({
      where: {
        userId: email,
        active: true,
        ...(productId && { productId }),
      },
      include: {
        product: true,
        order: true,
      },
    });

    if (entitlements.length === 0) {
      return NextResponse.json({ error: 'No purchases found for this email' }, { status: 404 });
    }

    // Send access email for each entitlement
    for (const entitlement of entitlements) {
      await sendAccessEmail(entitlement.order, entitlement);
    }

    return NextResponse.json({ success: true });
  }
  ```

- [ ] Add recovery link to access page error states
- [ ] Test email-based recovery
- [ ] Test error messages are helpful

#### Testing Requirements

- [ ] Self-serve test: Can customers recover without support?
- [ ] Error test: Are error messages calm and helpful?
- [ ] Support reduction test: Do support requests decrease?

---

### Story 10.8: Handling Multiple Purchases & Bundles

**Priority:** Medium
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer with multiple purchases**,
I want **to see all my entitlements in one place**,
So that **I never guess what I own**.

#### Acceptance Criteria

**Given** customers have multiple purchases
**When** they access their entitlements
**Then** they always know what they've bought
**And** duplicate purchases do not cause support issues
**And** bundles show constituent resources clearly

#### Requirements

- Access pages list all entitlements for a user/email
- Bundles show constituent resources clearly
- Duplicate purchases handled gracefully

#### Rules

✅ Never make users guess what they own
✅ Never punish accidental duplicates

#### Implementation Checklist

- [ ] Create "My Purchases" page (optional, if account-based)

  ```tsx
  // app/purchases/page.tsx
  export default async function MyPurchasesPage() {
    const session = await getSession();

    if (!session?.user) {
      redirect('/login');
    }

    const entitlements = await db.entitlement.findMany({
      where: {
        userId: session.user.email,
        active: true,
      },
      include: {
        product: true,
        order: true,
      },
    });

    return (
      <div className="mx-auto max-w-4xl space-y-12 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">My Purchases</h1>

        <div className="space-y-6">
          {entitlements.map((entitlement) => (
            <div key={entitlement.id} className="rounded-lg border border-stone-200 p-6">
              <h2 className="text-h3 font-semibold text-stone-900">{entitlement.product.title}</h2>
              <p className="text-body mt-2 text-stone-600">
                Purchased {formatDate(entitlement.order.createdAt)}
              </p>
              <a
                href={`/access/${entitlement.product.slug}?token=${generateAccessToken(
                  entitlement.userId,
                  entitlement.product.id
                )}`}
                className="text-accent mt-4 inline-block hover:underline"
              >
                Access files →
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }
  ```

- [ ] Handle duplicate purchases in checkout (warn before)

  ```typescript
  // app/api/checkout/route.ts
  export async function POST(req: NextRequest) {
    const { productId } = await req.json();
    const session = await getSession();

    if (session?.user) {
      // Check for existing entitlement
      const existing = await db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId: session.user.email,
            productId,
          },
        },
      });

      if (existing?.active) {
        return NextResponse.json({ error: 'You already own this product' }, { status: 400 });
      }
    }

    // ... proceed with checkout
  }
  ```

- [ ] Document bundle handling (if applicable)
- [ ] Test multiple purchases display correctly

#### Testing Requirements

- [ ] Clarity test: Do customers know what they own?
- [ ] Duplicate test: Are duplicates prevented or handled gracefully?
- [ ] Bundle test: Are bundle components clear?

---

### Story 10.9: Access Revocation & Expiry (If Applicable)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **customer whose access was revoked**,
I want **to understand why and what happened**,
So that **I'm not confused or frustrated**.

#### Acceptance Criteria

**Given** access is revoked
**When** customer attempts to access
**Then** revoked users understand why
**And** there are no broken states or silent failures
**And** revocation is clean and quiet

#### Revocation Triggers

- Refunds
- Chargebacks
- Explicit time-limited access (if used)

#### Rules

✅ Revocation should be clean and quiet
✅ Access page should explain status calmly
❌ No shaming language

#### Implementation Checklist

- [ ] Create AccessRevoked component

  ```tsx
  // components/access/AccessRevoked.tsx
  export function AccessRevoked({ product }: { product: Product }) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <div className="space-y-4">
          <h1 className="text-h1 font-semibold text-stone-900">Access no longer available</h1>
          <p className="text-body text-stone-700">
            Your access to <strong>{product.title}</strong> has been revoked.
          </p>
        </div>

        <div className="space-y-4 rounded-lg bg-stone-50 p-6">
          <h2 className="text-h3 font-semibold text-stone-900">Why was my access revoked?</h2>
          <p className="text-body text-stone-700">
            Access is typically revoked when a purchase is refunded or a payment is disputed.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-h3 font-semibold text-stone-900">Questions?</h2>
          <p className="text-body text-stone-600">
            If you believe this is an error, please contact{' '}
            <a href="mailto:support@example.com" className="text-accent hover:underline">
              support@example.com
            </a>
            .
          </p>
        </div>
      </div>
    );
  }
  ```

- [ ] Handle revocation in access page (already in Story 10.5)
- [ ] Test refund triggers revocation
- [ ] Ensure no shaming language

#### Testing Requirements

- [ ] Understanding test: Do revoked users understand why?
- [ ] Broken state test: Are there any silent failures?
- [ ] Tone test: Is language calm, not shaming?

---

### Story 10.10: Error States & Failure Handling

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer encountering an error**,
I want **clear explanation and next steps**,
So that **I know how to resolve the issue**.

#### Acceptance Criteria

**Given** errors can occur
**When** customers encounter them
**Then** errors reduce panic, not increase it
**And** users know how to resolve issues
**And** no internal errors are exposed

#### Required Error Handling

- Entitlement not found
- Expired link
- System error
- Email mismatch

#### Rules

✅ Errors must explain what happened
✅ Always offer a next step
❌ Never expose internal errors to users

#### Implementation Checklist

- [ ] Create error components for each state

  ```tsx
  // components/access/ErrorStates.tsx

  export function AccessDenied({ product }: { product: Product }) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Access denied</h1>

        <p className="text-body text-stone-700">
          We couldn't verify your access to <strong>{product.title}</strong>.
        </p>

        <div className="space-y-4 rounded-lg bg-stone-50 p-6">
          <h2 className="text-h3 font-semibold text-stone-900">What to do</h2>
          <ul className="text-body list-inside list-disc space-y-2 text-stone-700">
            <li>Check that you used the correct access link from your email</li>
            <li>
              If your link expired,{' '}
              <a href="/access/recover" className="text-accent hover:underline">
                request a new one
              </a>
            </li>
            <li>
              If you continue to have issues,{' '}
              <a href="mailto:support@example.com" className="text-accent hover:underline">
                contact support
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }

  export function ExpiredLink({ product }: { product: Product }) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Link expired</h1>

        <p className="text-body text-stone-700">
          Your access link for <strong>{product.title}</strong> has expired.
        </p>

        <div className="space-y-4 rounded-lg bg-stone-50 p-6">
          <h2 className="text-h3 font-semibold text-stone-900">Get a new link</h2>
          <p className="text-body text-stone-700">
            Access links expire after 7 days for security. You can request a new one anytime.
          </p>
          <a
            href="/access/recover"
            className="inline-block rounded-md bg-stone-900 px-4 py-2 font-medium text-white hover:bg-stone-800"
          >
            Request new link
          </a>
        </div>
      </div>
    );
  }

  export function SystemError({ product }: { product: Product }) {
    return (
      <div className="mx-auto max-w-3xl space-y-8 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Something went wrong</h1>

        <p className="text-body text-stone-700">
          We encountered an error while loading your access for <strong>{product.title}</strong>.
        </p>

        <div className="space-y-4 rounded-lg bg-stone-50 p-6">
          <h2 className="text-h3 font-semibold text-stone-900">What to do</h2>
          <ul className="text-body list-inside list-disc space-y-2 text-stone-700">
            <li>Try refreshing the page</li>
            <li>If the problem persists, contact support@example.com</li>
          </ul>
        </div>
      </div>
    );
  }
  ```

- [ ] Handle errors in access page (already started in Story 10.5)
- [ ] Log errors without exposing to users
- [ ] Test each error state displays correctly

#### Testing Requirements

- [ ] Panic test: Do errors reduce or increase panic?
- [ ] Resolution test: Do users know how to resolve?
- [ ] Exposure test: Are internal errors hidden?

---

### Story 10.11: Admin Intervention Tools (Operator Confidence)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 5-6 hours

#### User Story

As an **operator**,
I want **admin tools to handle edge cases quickly**,
So that **any access issue can be resolved in under 5 minutes**.

#### Acceptance Criteria

**Given** admin tools exist
**When** handling access issues
**Then** any access issue can be resolved in under 5 minutes
**And** no database surgery is required
**And** all manual actions are logged

#### Required Admin Actions

- View user entitlements
- Manually grant/revoke access
- Resend access email
- Generate fresh access link
- Annotate support cases

#### Rules

✅ Admin tools are powerful but simple
✅ All manual actions are logged

#### Implementation Checklist

- [ ] Create admin entitlements page

  ```tsx
  // app/admin/entitlements/page.tsx
  export default async function AdminEntitlementsPage({
    searchParams,
  }: {
    searchParams: { email?: string };
  }) {
    const entitlements = searchParams.email
      ? await db.entitlement.findMany({
          where: { userId: searchParams.email },
          include: {
            product: true,
            order: true,
          },
        })
      : [];

    return (
      <div className="mx-auto max-w-7xl space-y-8 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Entitlements</h1>

        <form method="GET" className="flex gap-4">
          <input
            type="email"
            name="email"
            placeholder="customer@example.com"
            defaultValue={searchParams.email}
            className="flex-1 rounded-md border border-stone-300 px-4 py-2"
          />
          <button type="submit" className="rounded-md bg-stone-900 px-4 py-2 text-white">
            Search
          </button>
        </form>

        {entitlements.length > 0 && (
          <div className="space-y-4">
            {entitlements.map((ent) => (
              <div key={ent.id} className="rounded-lg border border-stone-200 p-6">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <h2 className="text-h3 font-semibold text-stone-900">{ent.product.title}</h2>
                    <p className="text-body text-stone-600">
                      Status: {ent.active ? 'Active' : 'Revoked'}
                    </p>
                    <p className="text-meta text-stone-500">
                      Granted: {formatDateTime(ent.createdAt)}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <form action="/api/admin/entitlements/resend" method="POST">
                      <input type="hidden" name="entitlementId" value={ent.id} />
                      <button className="rounded bg-stone-200 px-3 py-1 text-sm">
                        Resend Email
                      </button>
                    </form>

                    {ent.active ? (
                      <form action="/api/admin/entitlements/revoke" method="POST">
                        <input type="hidden" name="entitlementId" value={ent.id} />
                        <button className="rounded bg-red-200 px-3 py-1 text-sm">Revoke</button>
                      </form>
                    ) : (
                      <form action="/api/admin/entitlements/restore" method="POST">
                        <input type="hidden" name="entitlementId" value={ent.id} />
                        <button className="rounded bg-green-200 px-3 py-1 text-sm">Restore</button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
  ```

- [ ] Create admin action endpoints

  ```typescript
  // app/api/admin/entitlements/resend/route.ts
  export async function POST(req: Request) {
    const formData = await req.formData();
    const entitlementId = formData.get('entitlementId') as string;

    const entitlement = await db.entitlement.findUnique({
      where: { id: entitlementId },
      include: {
        product: true,
        order: true,
      },
    });

    if (!entitlement) {
      return new Response('Entitlement not found', { status: 404 });
    }

    await sendAccessEmail(entitlement.order, entitlement);

    // Log action
    await db.auditLog.create({
      data: {
        action: 'resend_access_email',
        entityType: 'entitlement',
        entityId: entitlementId,
        userId: 'admin', // Get from session
      },
    });

    return Response.redirect('/admin/entitlements?email=' + entitlement.userId);
  }
  ```

- [ ] Implement logging for all manual actions
- [ ] Test admin tools work correctly

#### Testing Requirements

- [ ] Resolution time test: Can issues be resolved in <5 minutes?
- [ ] Logging test: Are all actions logged?
- [ ] Power test: Can all necessary actions be performed?

---

### Story 10.12: UX Tone & Language (Post-Purchase)

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **customer**,
I want **post-purchase language to be neutral and professional**,
So that **I trust the system and feel respected**.

#### Acceptance Criteria

**Given** post-purchase content exists
**When** evaluating language
**Then** language feels transactional and reassuring
**And** nothing feels sales-oriented after purchase
**And** tone is neutral, professional, and helpful

#### Tone Rules

✅ Neutral
✅ Professional
✅ Helpful
❌ No hype

#### Explicit Bans

❌ "You're in!"
❌ "Exclusive"
❌ "VIP access"
❌ "Unlock now"

#### Implementation Checklist

- [ ] Create post-purchase language guide

  ```markdown
  # Post-Purchase Language Guide

  ## Tone Rules

  - **Neutral:** State facts calmly
  - **Professional:** Serious, competent
  - **Helpful:** Clear next steps
  - **No hype:** No excitement, no celebration

  ## Good Examples

  - "Purchase complete"
  - "Access: [Product Name]"
  - "Your files are ready to download"
  - "Need help? Contact support"

  ## Bad Examples

  - "You're in!" (too casual)
  - "Welcome to the VIP club!" (hype)
  - "Unlock your exclusive content!" (sales language)
  - "Congratulations!" (unnecessary celebration)

  ## Templates

  **Success page:**

  - "Purchase complete"
  - "Thank you for purchasing [Product]"
  - "You'll receive an email with access instructions"

  **Access page:**

  - "Access: [Product]"
  - "You have full access to this resource"
  - "Download files"

  **Error states:**

  - "Access denied"
  - "Link expired"
  - "Something went wrong"
  ```

- [ ] Review all post-purchase copy
- [ ] Remove hype language
- [ ] Ensure neutral, professional tone

#### Testing Requirements

- [ ] Tone test: Is language neutral and professional?
- [ ] Sales test: Does anything feel sales-oriented?
- [ ] Trust test: Do customers feel respected?

---

### Story 10.13: Accessibility & Usability

**Priority:** Medium
**Complexity:** Low
**Estimated Time:** 3-4 hours

#### User Story

As a **customer using assistive technology or mobile device**,
I want **access to work for everyone**,
So that **no one is excluded from their purchase**.

#### Acceptance Criteria

**Given** accessibility requirements
**When** testing access flows
**Then** access works on mobile
**And** there are no hidden or tiny controls
**And** keyboard navigation works
**And** screen readers can navigate

#### Requirements

✅ Keyboard-accessible links
✅ Clear contrast
✅ Mobile-friendly downloads
✅ Readable file names

#### Implementation Checklist

- [ ] Test keyboard navigation
- [ ] Test mobile downloads
- [ ] Ensure proper ARIA labels
  ```tsx
  // components/access/AccessGranted.tsx
  <a
    href={`/api/download/${product.id}/${index}?userId=${userId}`}
    className="block rounded-lg border border-stone-200 p-4 transition-colors hover:border-stone-300"
    aria-label={`Download ${getFileName(url)}`}
  >
    {/* ... */}
  </a>
  ```
- [ ] Use semantic HTML
- [ ] Test with screen reader
- [ ] Test on mobile devices
- [ ] Ensure file names are readable

#### Testing Requirements

- [ ] Mobile test: Does access work on mobile?
- [ ] Keyboard test: Can page be navigated with keyboard?
- [ ] Screen reader test: Is page accessible with screen reader?
- [ ] Contrast test: Is text readable?

---

### Story 10.14: Testing & Validation

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a **quality assurance engineer**,
I want **comprehensive testing of all post-purchase flows**,
So that **the experience is bulletproof**.

#### Acceptance Criteria

**Given** all post-purchase flows are implemented
**When** running tests
**Then** all flows behave predictably
**And** there are no dead ends
**And** recovery works in all scenarios

#### Required Tests

✅ Purchase → immediate access
✅ Purchase → delayed email → recovery
✅ Expired link → regeneration
✅ Refund → access revoked
✅ Duplicate purchase handling

#### Manual QA Checklist

- Buy product
- Close browser
- Recover access from email
- Download again a week later

#### Implementation Checklist

- [ ] Create test suite for access flows

  ```typescript
  // __tests__/access.test.ts
  describe('Access Flows', () => {
    it('grants access after purchase', async () => {
      // Complete purchase
      const order = await createTestOrder();

      // Generate access token
      const token = generateAccessToken(order.customerEmail, order.items[0].productId);

      // Access page
      const res = await fetch(`/access/${order.items[0].product.slug}?token=${token}`);
      expect(res.status).toBe(200);

      const html = await res.text();
      expect(html).toContain('Download files');
    });

    it('denies access with invalid token', async () => {
      const res = await fetch('/access/test-product?token=invalid');
      expect(res.status).toBe(200);

      const html = await res.text();
      expect(html).toContain('Access denied');
    });

    it('shows revoked state after refund', async () => {
      // Create order and entitlement
      const order = await createTestOrder();

      // Revoke entitlement
      await revokeEntitlement(order.customerEmail, order.items[0].productId);

      // Try to access
      const token = generateAccessToken(order.customerEmail, order.items[0].productId);
      const res = await fetch(`/access/${order.items[0].product.slug}?token=${token}`);

      const html = await res.text();
      expect(html).toContain('Access no longer available');
    });

    it('allows access recovery', async () => {
      const order = await createTestOrder();

      // Request recovery
      const res = await fetch('/api/access/recover', {
        method: 'POST',
        body: JSON.stringify({ email: order.customerEmail }),
      });

      expect(res.status).toBe(200);

      // Verify email sent (check email log)
      const emailLog = await db.emailLog.findFirst({
        where: { type: 'access', orderId: order.id },
      });
      expect(emailLog).toBeDefined();
    });
  });
  ```

- [ ] Create manual QA checklist

  ```markdown
  # Manual QA Checklist: Post-Purchase Access

  ## Happy Path

  - [ ] Complete test purchase
  - [ ] Verify success page appears
  - [ ] Verify access email arrives within 60 seconds
  - [ ] Click access link in email
  - [ ] Verify access page loads correctly
  - [ ] Download file
  - [ ] Verify download works

  ## Recovery Flow

  - [ ] Close browser after purchase
  - [ ] Open email later
  - [ ] Click access link
  - [ ] Verify access still works
  - [ ] Simulate lost email
  - [ ] Use recovery page
  - [ ] Verify new email sent
  - [ ] Verify new link works

  ## Edge Cases

  - [ ] Wait 8 days after purchase
  - [ ] Try old access link
  - [ ] Verify shows expired state
  - [ ] Request new link
  - [ ] Verify new link works

  ## Refund Flow

  - [ ] Process refund in Stripe
  - [ ] Try to access with existing link
  - [ ] Verify shows revoked state
  - [ ] Verify message is calm and helpful

  ## Mobile

  - [ ] Access on mobile device
  - [ ] Download file on mobile
  - [ ] Verify mobile-friendly
  ```

- [ ] Run all automated tests
- [ ] Complete manual QA checklist
- [ ] Test on multiple devices

#### Testing Requirements

- [ ] Automated test coverage >80%
- [ ] All flows tested end-to-end
- [ ] Manual QA checklist completed
- [ ] No dead ends found

---

## Epic Completion Criteria

Epic 10 is considered complete when:

### Access & Delivery

- [ ] All 14 stories implemented and tested
- [ ] Immediate access after purchase
- [ ] Access email arrives within 60 seconds
- [ ] Access page bookmarkable and always works
- [ ] Downloads use signed URLs (1-hour expiry)
- [ ] Recovery flow is self-serve

### Security

- [ ] All files stored privately
- [ ] No permanent public URLs
- [ ] Sharing links doesn't grant access
- [ ] Access tokens expire after 7 days (renewable)
- [ ] Revocation is immediate and clean

### UX & Communication

- [ ] Post-purchase confirmation is clear
- [ ] Language is neutral and professional
- [ ] Error states are calm and helpful
- [ ] Mobile-friendly access and downloads
- [ ] Keyboard-accessible

### Operations

- [ ] Admin can resolve access issues in <5 minutes
- [ ] Support requests <10% of purchases
- [ ] All manual actions logged
- [ ] Recovery email rate >90% success

### Testing

- [ ] All automated tests passing
- [ ] Manual QA checklist completed
- [ ] No dead ends in any flow
- [ ] Tested on mobile devices

---

## EPIC 10 Deliverables

By the end of EPIC 10, you have:

1. **A calm, professional post-purchase experience**
   Customers know exactly where their purchase is

2. **Secure, entitlement-based access**
   Private files, signed URLs, no leakage

3. **Self-serve recovery flows**
   Customers can regain access without support

4. **Minimal support burden**
   <10% support rate, issues resolved quickly

5. **Strong silent proof of operational competence**
   Employers see: "This person runs systems professionally"

---

## Why EPIC 10 Matters

### Most commerce systems fail after payment

Common failures:

- Broken access after payment
- Confusing delivery
- Lost links with no recovery
- Poor mobile experience
- Support overwhelm

### When this epic is done well

**Customers feel relief,**
**employers infer maturity,**
**and you stop firefighting.**

When employers see:

- Immediate, clear access
- Self-serve recovery
- Professional error handling
- Mobile-friendly delivery
- Low support burden

They conclude: **"This person can deliver products professionally."**

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 11 — Admin Experience & Operator UX
