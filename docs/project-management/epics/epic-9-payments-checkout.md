# EPIC 9 — Payments, Checkout & Entitlements

**Epic ID:** 9
**Epic Name:** Payments, Checkout & Entitlements
**Status:** Ready for Implementation
**Dependencies:** Epic 0 (Infrastructure), Epic 8 (Resources & Commerce)
**Total Stories:** 14

---

## Epic Overview

### Purpose

Deliver a flawless, low-friction, zero-drama purchase experience that reinforces trust for **customers** and credibility for **employers**.

**This epic is about making money invisible.**

Not hidden — **boring, reliable, and unquestionable**.

### Critical Principle

**If anything breaks here, everything upstream loses legitimacy.**

### User Outcome

This epic must allow:

- Customers to buy without anxiety
- You to fulfill without manual intervention
- Employers to infer operational competence

### Core Question Answered

**"If this person can run this smoothly, they can probably run other systems too."**

---

## Architecture Decisions

### Technology Stack

```
Stripe Checkout (hosted payment page)
Stripe Webhooks (for fulfillment)
Next.js API Routes (checkout creation, webhook handling)
Prisma (order/entitlement management)
Database as source of truth (not Stripe)
```

### Data Flow

```
1. Customer clicks "Purchase"
2. Server creates Stripe Checkout Session
3. Customer completes payment on Stripe
4. Stripe fires webhook (checkout.session.completed)
5. Backend validates event, creates order, grants entitlement
6. Customer receives immediate access
```

### Source of Truth

**Your database is authoritative for:**

- Orders
- Entitlements
- Access

**Stripe is only a payment processor:**

- Stripe IDs are references, not logic drivers
- Can reconstruct order history without Stripe

---

## Stories

### Story 9.1: Core Job-to-Be-Done

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **customer, operator, and employer evaluator**,
I want **the checkout system to behave like a serious, professional operation**,
So that **customers buy without anxiety, fulfillment happens automatically, and operational competence is evident**.

#### Acceptance Criteria

**Given** the checkout system is operational
**When** all three audiences interact with it
**Then** no purchase ever feels risky
**And** no successful payment fails to deliver access
**And** no manual fixes are required for the happy path

#### Three-Audience Success

1. **Customers:** Buy without anxiety
2. **You (operator):** Fulfill without manual intervention
3. **Employers:** Infer operational competence

#### Implementation Checklist

- [ ] Define success criteria document

  ```markdown
  # Checkout System Success Criteria

  ## Customer Perspective

  Success indicators:

  - Checkout feels trustworthy (Stripe-native)
  - Payment confirmation is immediate
  - Access is granted automatically
  - No anxiety about "did it work?"

  Failure indicators:

  - Payment succeeded but no access
  - Unclear what happens next
  - Manual intervention required

  ## Operator Perspective

  Success indicators:

  - Fulfillment is 100% automatic
  - Can debug any issue in <5 minutes
  - Edge cases handled gracefully
  - No "stuck" payments

  Failure indicators:

  - Manual access grants required
  - Frequent support tickets
  - Can't track payment→access

  ## Employer Perspective (Competence Signal)

  Success indicators:

  - Payment flow suggests operational maturity
  - Systems thinking evident in architecture
  - Professional handling of edge cases

  Failure indicators:

  - Broken or manual processes
  - Amateur handling of payments
  ```

- [ ] Create validation checklist
- [ ] Document happy path requirements
- [ ] Document edge case handling

#### Testing Requirements

- [ ] Customer test: Does purchase feel risky or safe?
- [ ] Operator test: Is fulfillment automatic?
- [ ] Employer test: Does system signal competence?

---

### Story 9.2: Checkout Philosophy (Boring Is a Feature)

**Priority:** Critical
**Complexity:** Low
**Estimated Time:** 2-3 hours

#### User Story

As a **customer**,
I want **checkout to feel familiar and trustworthy**,
So that **I complete the purchase without hesitation**.

#### Acceptance Criteria

**Given** the checkout experience
**When** a customer views it
**Then** checkout feels familiar and trustworthy
**And** it looks like infrastructure, not marketing
**And** there is no "creator checkout energy"

#### Design Principles

✅ Stripe-native look and feel
✅ Minimal copy
✅ One decision per screen
✅ No persuasion language

#### Explicit Bans

❌ Upsells
❌ Cross-sells
❌ Countdown timers
❌ Bonus stacking
❌ Scarcity language

#### Implementation Checklist

- [ ] Create checkout philosophy document

  ```markdown
  # Checkout Philosophy: Boring Is a Feature

  ## Design Principles

  1. **Stripe-native look and feel**
     - Use Stripe Checkout (hosted)
     - Don't customize beyond logo/brand color
     - Leverage Stripe's trustworthiness

  2. **Minimal copy**
     - Product name
     - Price
     - "Purchase" button
     - No additional persuasion

  3. **One decision per screen**
     - Payment details
     - Confirm purchase
     - No additional choices

  4. **No persuasion language**
     - No "Limited time"
     - No "Only X left"
     - No "Buy now and get..."

  ## Explicit Bans

  - Upsells ("Upgrade to premium?")
  - Cross-sells ("Customers also bought...")
  - Countdown timers
  - Bonus stacking ("Buy now get 3 bonuses!")
  - Scarcity language ("Only 5 spots left!")

  ## Good Example
  ```

  HSC Essay Marking Guide
  $29 AUD
  [Purchase]

  ```

  ## Bad Example
  ```

  HSC Essay Marking Guide
  NORMALLY $99, TODAY ONLY $29!
  ⏰ Offer expires in 2:34:12
  BONUS: Get 3 extra guides FREE!
  Only 3 copies left at this price!
  [BUY NOW BEFORE IT'S GONE]

  ```

  ```

- [ ] Configure Stripe Checkout with minimal settings
- [ ] Remove any persuasion copy
- [ ] Ensure one decision per screen
- [ ] Test checkout feels boring and safe

#### Testing Requirements

- [ ] Familiarity test: Does checkout feel Stripe-native?
- [ ] Trust test: Does it look like infrastructure or marketing?
- [ ] Energy test: Any "creator checkout energy"?

---

### Story 9.3: Purchase Flow (Happy Path)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a **developer**,
I want **a clearly defined canonical purchase sequence**,
So that **the happy path is rock-solid and predictable**.

#### Acceptance Criteria

**Given** the purchase flow is implemented
**When** a customer completes a purchase
**Then** customer access is always consistent with payment state
**And** there are no race conditions
**And** entitlements are granted only via webhook

#### Required Steps

1. Customer clicks "Purchase" or "Get access"
2. Server creates Stripe Checkout Session
3. Customer completes payment on Stripe-hosted page
4. Stripe fires webhook (`checkout.session.completed`)
5. Backend:
   - Validates event
   - Creates order
   - Grants entitlement
   - Sends confirmation email
6. Customer receives access immediately

#### Rules

✅ Entitlements are granted **only** via webhook
✅ Client never assumes payment success
✅ UI handles webhook delays gracefully

#### Implementation Checklist

- [ ] Create checkout session endpoint

  ```typescript
  // app/api/checkout/route.ts
  import { NextRequest, NextResponse } from 'next/server';
  import Stripe from 'stripe';
  import { db } from '@/lib/db';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  export async function POST(req: NextRequest) {
    const { productId } = await req.json();

    // Get product from database
    const product = await db.product.findUnique({
      where: { id: productId },
    });

    if (!product || !product.stripePriceId) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [
        {
          price: product.stripePriceId,
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_URL}/resources/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/resources/${product.slug}`,
      metadata: {
        productId: product.id,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  }
  ```

- [ ] Implement webhook handler

  ```typescript
  // app/api/webhooks/stripe/route.ts
  import { headers } from 'next/headers';
  import { NextRequest, NextResponse } from 'next/server';
  import Stripe from 'stripe';
  import { handleCheckoutCompleted } from '@/lib/stripe/handlers';

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  export async function POST(req: NextRequest) {
    const body = await req.text();
    const signature = headers().get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (err) {
      console.error('Webhook signature verification failed:', err);
      return NextResponse.json({ error: 'Webhook signature verification failed' }, { status: 400 });
    }

    // Handle event
    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
    }

    return NextResponse.json({ received: true });
  }
  ```

- [ ] Implement checkout completion handler

  ```typescript
  // lib/stripe/handlers.ts
  import Stripe from 'stripe';
  import { db } from '@/lib/db';
  import { sendAccessEmail } from '@/lib/email';

  export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    // Check if event already processed (idempotency)
    const existingOrder = await db.order.findUnique({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      console.log('Order already processed:', session.id);
      return;
    }

    const productId = session.metadata?.productId;
    if (!productId) {
      throw new Error('No productId in session metadata');
    }

    // Create order
    const order = await db.order.create({
      data: {
        stripeSessionId: session.id,
        stripePaymentIntentId: session.payment_intent as string,
        customerEmail: session.customer_details?.email!,
        total: session.amount_total!,
        currency: session.currency!.toUpperCase(),
        status: 'paid',
        items: {
          create: {
            productId,
            quantity: 1,
            priceAtPurchase: session.amount_total!,
          },
        },
      },
      include: { items: true },
    });

    // Grant entitlement
    const entitlement = await db.entitlement.create({
      data: {
        userId: session.customer_details?.email!, // Or user ID if available
        productId,
        orderId: order.id,
        active: true,
      },
    });

    // Send access email
    await sendAccessEmail(order, entitlement);

    console.log('Order fulfilled:', order.id);
  }
  ```

- [ ] Create success page
  ```tsx
  // app/resources/success/page.tsx
  export default async function SuccessPage({
    searchParams,
  }: {
    searchParams: { session_id?: string };
  }) {
    return (
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Purchase complete</h1>
        <p className="text-body text-stone-700">
          Thank you for your purchase. You should receive an email with access instructions shortly.
        </p>
        <p className="text-body text-stone-600">
          If you don't receive an email within 5 minutes, please contact support.
        </p>
      </div>
    );
  }
  ```
- [ ] Test complete purchase flow
- [ ] Ensure webhook fires correctly
- [ ] Verify entitlement is granted

#### Testing Requirements

- [ ] Happy path test: Does purchase complete successfully?
- [ ] Race condition test: Multiple webhooks handled correctly?
- [ ] Webhook delay test: UI handles gracefully?

---

### Story 9.4: Stripe Configuration & Data Ownership

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **system architect**,
I want **my database to be the source of truth**,
So that **Stripe is just a payment processor, not a data authority**.

#### Acceptance Criteria

**Given** Stripe integration is configured
**When** evaluating data ownership
**Then** you can reconstruct order history without Stripe
**And** Stripe outages don't corrupt your system state
**And** required mappings exist between Stripe and database

#### Source of Truth

**Your database is authoritative for:**

- Orders
- Entitlements
- Access

**Stripe is only for:**

- Payment processing
- Refund processing
- Customer payment methods

#### Required Mappings

- `stripe_customer_id` ↔ user/email
- `stripe_checkout_session_id` ↔ order intent
- `stripe_payment_intent_id` ↔ completed order

#### Implementation Checklist

- [ ] Create data ownership document

  ````markdown
  # Data Ownership: Database as Source of Truth

  ## Your Database Owns

  - **Orders:** Complete order history
  - **Entitlements:** Access control
  - **User accounts:** User data
  - **Products:** Product catalog

  ## Stripe Owns

  - **Payment methods:** Card tokens, payment details
  - **Payment status:** Authorization, capture, refunds
  - **Customer IDs:** Stripe-specific customer references

  ## Required Mappings

  ```sql
  -- Order table stores Stripe references
  CREATE TABLE "Order" (
    id TEXT PRIMARY KEY,
    stripe_session_id TEXT UNIQUE,      -- Maps to Stripe Checkout Session
    stripe_payment_intent_id TEXT,      -- Maps to Stripe PaymentIntent
    stripe_customer_id TEXT,            -- Maps to Stripe Customer
    -- ... other fields
  );

  -- Can reconstruct order history from database alone
  SELECT * FROM "Order" WHERE customer_email = 'user@example.com';
  ```
  ````

  ## Stripe Outage Handling
  - Database remains consistent
  - Historical data unaffected
  - Can process refunds when Stripe recovers
  - No data loss

  ```

  ```

- [ ] Update Order model with Stripe ID fields (already in Epic 0 schema)
- [ ] Ensure all order data stored in database
- [ ] Test: Can reconstruct order history without Stripe?
- [ ] Document Stripe ID mappings

#### Testing Requirements

- [ ] Reconstruction test: Can you rebuild order history from database?
- [ ] Outage test: Does system handle Stripe downtime gracefully?
- [ ] Mapping test: All Stripe IDs properly referenced?

---

### Story 9.5: Idempotency & Replay Safety (Non-Negotiable)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story

As a **system engineer**,
I want **idempotent webhook processing**,
So that **duplicate events never corrupt system state**.

#### Acceptance Criteria

**Given** webhook processing is implemented
**When** duplicate or late events arrive
**Then** duplicate events never duplicate entitlements
**And** partial failures recover cleanly
**And** system converges to correct state

#### Requirements

✅ Store every processed Stripe `event.id`
✅ Reject already-processed events
✅ Fulfillment steps must be idempotent

#### Failure Scenarios to Handle

- Webhook delivered twice
- Webhook delivered late
- Webhook delivered out of order
- Temporary DB failure during fulfillment

#### Implementation Checklist

- [ ] Create StripeEvent table for tracking

  ```prisma
  // Add to schema.prisma
  model StripeEvent {
    id          String   @id // Stripe event.id
    type        String
    processed   Boolean  @default(false)
    processedAt DateTime?
    data        Json     // Store raw event data
    error       String?  // Store error if processing failed
    createdAt   DateTime @default(now())

    @@index([type])
    @@index([processed])
  }
  ```

- [ ] Implement idempotent webhook handler

  ```typescript
  // lib/stripe/webhooks.ts
  import { db } from '@/lib/db';
  import Stripe from 'stripe';

  export async function processWebhookIdempotently(event: Stripe.Event) {
    // Check if event already processed
    const existingEvent = await db.stripeEvent.findUnique({
      where: { id: event.id },
    });

    if (existingEvent?.processed) {
      console.log('Event already processed:', event.id);
      return { status: 'already_processed' };
    }

    // Store event (idempotency key)
    const stripeEvent = await db.stripeEvent.upsert({
      where: { id: event.id },
      update: {},
      create: {
        id: event.id,
        type: event.type,
        data: event.data as any,
      },
    });

    try {
      // Process event based on type
      if (event.type === 'checkout.session.completed') {
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
      } else if (event.type === 'charge.refunded') {
        await handleChargeRefunded(event.data.object as Stripe.Charge);
      }

      // Mark as processed
      await db.stripeEvent.update({
        where: { id: event.id },
        data: {
          processed: true,
          processedAt: new Date(),
        },
      });

      return { status: 'processed' };
    } catch (error) {
      // Store error for debugging
      await db.stripeEvent.update({
        where: { id: event.id },
        data: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });

      throw error;
    }
  }
  ```

- [ ] Make fulfillment operations idempotent

  ```typescript
  // lib/stripe/handlers.ts
  export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    // Idempotent check: Order already exists?
    const existingOrder = await db.order.findUnique({
      where: { stripeSessionId: session.id },
    });

    if (existingOrder) {
      console.log('Order already exists, skipping creation:', session.id);
      return existingOrder;
    }

    // Create order (will only succeed once due to unique constraint)
    const order = await db.order.create({
      data: {
        stripeSessionId: session.id, // Unique constraint prevents duplicates
        // ... other fields
      },
    });

    // Grant entitlement (idempotent via unique constraint on userId + productId)
    const entitlement = await db.entitlement.upsert({
      where: {
        userId_productId: {
          userId: order.customerEmail,
          productId: order.items[0].productId,
        },
      },
      update: {
        active: true,
        revokedAt: null,
      },
      create: {
        userId: order.customerEmail,
        productId: order.items[0].productId,
        orderId: order.id,
        active: true,
      },
    });

    return order;
  }
  ```

- [ ] Test duplicate webhook delivery
- [ ] Test late webhook delivery
- [ ] Test partial failure recovery

#### Testing Requirements

- [ ] Duplicate test: Send same webhook twice, verify no duplicates
- [ ] Late delivery test: Process webhook after manual grant
- [ ] Failure recovery test: Crash during processing, verify recovery

---

### Story 9.6: Order Model & Lifecycle

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As an **operator**,
I want **explicit order states that are auditable**,
So that **I can see what happened for any purchase**.

#### Acceptance Criteria

**Given** the order model is implemented
**When** viewing order history
**Then** you can see what happened for any purchase
**And** order state reflects reality, not assumptions
**And** orders never disappear

#### Required Order States

- `pending` (optional, pre-webhook)
- `paid`
- `fulfilled`
- `refunded`
- `failed` (rare but explicit)

#### Rules

✅ Orders never disappear
✅ Status transitions are auditable
✅ Historical accuracy is preserved

#### Implementation Checklist

- [ ] Define order status enum

  ```prisma
  // schema.prisma
  enum OrderStatus {
    PENDING
    PAID
    FULFILLED
    REFUNDED
    FAILED
  }

  model Order {
    id     String      @id @default(cuid())
    status OrderStatus @default(PENDING)

    // Status timestamps
    paidAt      DateTime?
    fulfilledAt DateTime?
    refundedAt  DateTime?

    // Audit trail
    statusHistory Json[] // Array of { status, timestamp, note }

    // ... other fields
  }
  ```

- [ ] Implement status transition function

  ```typescript
  // lib/orders.ts
  export async function updateOrderStatus(orderId: string, newStatus: OrderStatus, note?: string) {
    const order = await db.order.findUnique({
      where: { id: orderId },
    });

    if (!order) throw new Error('Order not found');

    // Add to status history
    const statusHistory = [
      ...(order.statusHistory as any[]),
      {
        status: newStatus,
        timestamp: new Date().toISOString(),
        note,
      },
    ];

    // Update order
    return db.order.update({
      where: { id: orderId },
      data: {
        status: newStatus,
        statusHistory,
        paidAt: newStatus === 'PAID' ? new Date() : order.paidAt,
        fulfilledAt: newStatus === 'FULFILLED' ? new Date() : order.fulfilledAt,
        refundedAt: newStatus === 'REFUNDED' ? new Date() : order.refundedAt,
      },
    });
  }
  ```

- [ ] Document order lifecycle

  ```markdown
  # Order Lifecycle

  ## Status Transitions
  ```

  PENDING → PAID → FULFILLED
  ↓
  REFUNDED

  PENDING → FAILED

  ````

  ## Status Definitions
  - **PENDING:** Order created, payment not yet confirmed
  - **PAID:** Payment successful (webhook received)
  - **FULFILLED:** Entitlement granted, email sent
  - **REFUNDED:** Payment refunded, access revoked
  - **FAILED:** Payment failed or order cancelled

  ## Audit Trail
  Every status change recorded in `statusHistory`:
  ```json
  [
    { "status": "PENDING", "timestamp": "2026-01-03T10:00:00Z", "note": "Order created" },
    { "status": "PAID", "timestamp": "2026-01-03T10:01:30Z", "note": "Webhook received" },
    { "status": "FULFILLED", "timestamp": "2026-01-03T10:01:31Z", "note": "Entitlement granted" }
  ]
  ````

  ```

  ```

#### Testing Requirements

- [ ] Lifecycle test: Verify all status transitions work
- [ ] Audit test: Status history accurately recorded?
- [ ] Preservation test: Can you view historical orders?

---

### Story 9.7: Entitlements Model (Access Control)

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story

As a **system architect**,
I want **clean separation between payment and access**,
So that **payment logic never leaks into content access logic**.

#### Acceptance Criteria

**Given** the entitlements model is implemented
**When** checking access
**Then** access checks rely only on entitlements
**And** payment logic never leaks into content access logic
**And** entitlements can be granted, revoked, or modified independently

#### Entitlement Principles

- Entitlement = permission to access something
- Entitlements are granted on payment success
- Entitlements are revoked or modified on refund
- Entitlements are time-bound only if required

#### Required Attributes

- user/customer reference
- product reference
- status (active, revoked)
- granted_at
- revoked_at (if applicable)
- order reference (for traceability)

#### Implementation Checklist

- [ ] Entitlement model already defined in Epic 0 schema
- [ ] Create entitlement access check function

  ```typescript
  // lib/entitlements.ts
  export async function checkAccess(userId: string, productId: string): Promise<boolean> {
    const entitlement = await db.entitlement.findUnique({
      where: {
        userId_productId: {
          userId,
          productId,
        },
      },
    });

    if (!entitlement) return false;
    if (!entitlement.active) return false;
    if (entitlement.revokedAt) return false;

    // Check expiration if applicable
    if (entitlement.expiresAt && entitlement.expiresAt < new Date()) {
      return false;
    }

    return true;
  }

  export async function getUserEntitlements(userId: string) {
    return db.entitlement.findMany({
      where: {
        userId,
        active: true,
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: {
        product: true,
      },
    });
  }
  ```

- [ ] Create entitlement grant function
  ```typescript
  export async function grantEntitlement(userId: string, productId: string, orderId: string) {
    return db.entitlement.upsert({
      where: {
        userId_productId: { userId, productId },
      },
      update: {
        active: true,
        revokedAt: null,
        orderId, // Update to latest order
      },
      create: {
        userId,
        productId,
        orderId,
        active: true,
      },
    });
  }
  ```
- [ ] Create entitlement revoke function
  ```typescript
  export async function revokeEntitlement(userId: string, productId: string) {
    return db.entitlement.update({
      where: {
        userId_productId: { userId, productId },
      },
      data: {
        active: false,
        revokedAt: new Date(),
      },
    });
  }
  ```
- [ ] Protect download routes with entitlement checks

  ```typescript
  // app/api/download/[productId]/route.ts
  import { checkAccess } from '@/lib/entitlements';

  export async function GET(req: Request, { params }: { params: { productId: string } }) {
    const session = await getSession(); // Get user session

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 });
    }

    const hasAccess = await checkAccess(session.user.email, params.productId);

    if (!hasAccess) {
      return new Response('No access to this product', { status: 403 });
    }

    // Generate signed URL for download
    const product = await db.product.findUnique({
      where: { id: params.productId },
    });

    const signedUrl = await generateSignedUrl(product.downloadUrls[0]);

    return Response.redirect(signedUrl);
  }
  ```

#### Testing Requirements

- [ ] Access check test: Verify entitlement required for access
- [ ] Revoke test: Revoked entitlement blocks access
- [ ] Expiration test: Expired entitlement blocks access (if applicable)

---

### Story 9.8: Secure Delivery Enforcement

**Priority:** Critical
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **security-conscious operator**,
I want **all paid assets to be private by default**,
So that **access leakage is prevented**.

#### Acceptance Criteria

**Given** digital products exist
**When** enforcing secure delivery
**Then** sharing a link does not grant access
**And** access expires when entitlement is revoked
**And** all downloads use expiring signed URLs

#### Requirements

✅ All paid assets are private by default
✅ Access requires authenticated user OR secure email-based token
✅ Access requires valid entitlement
✅ Downloads use expiring signed URLs

#### Rules

❌ No direct public file URLs
❌ No permanent access links

#### Implementation Checklist

- [ ] Store files in private storage (Vercel Blob with private ACL or S3 with private bucket)
- [ ] Implement signed URL generation

  ```typescript
  // lib/storage.ts
  import { generateSignedUrl } from '@vercel/blob';

  export async function generateSecureDownloadUrl(
    fileUrl: string,
    expiresInSeconds: number = 3600 // 1 hour default
  ): Promise<string> {
    // Generate signed URL that expires
    const signedUrl = await generateSignedUrl(fileUrl, {
      expiresIn: expiresInSeconds,
    });

    return signedUrl;
  }
  ```

- [ ] Implement access-gated download endpoint (already in Story 9.7)
- [ ] Add token-based access for email links

  ```typescript
  // lib/access-tokens.ts
  import jwt from 'jsonwebtoken';

  export function generateAccessToken(userId: string, productId: string): string {
    return jwt.sign({ userId, productId }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  }

  export function verifyAccessToken(token: string): { userId: string; productId: string } | null {
    try {
      return jwt.verify(token, process.env.JWT_SECRET!) as any;
    } catch {
      return null;
    }
  }

  // app/api/access/[token]/route.ts
  export async function GET(req: Request, { params }: { params: { token: string } }) {
    const decoded = verifyAccessToken(params.token);

    if (!decoded) {
      return new Response('Invalid or expired token', { status: 401 });
    }

    const hasAccess = await checkAccess(decoded.userId, decoded.productId);

    if (!hasAccess) {
      return new Response('Access revoked', { status: 403 });
    }

    // Generate signed URL
    const product = await db.product.findUnique({
      where: { id: decoded.productId },
    });

    const signedUrl = await generateSecureDownloadUrl(product.downloadUrls[0]);

    return Response.redirect(signedUrl);
  }
  ```

- [ ] Test: Shared link without entitlement is blocked
- [ ] Test: Revoked entitlement blocks access to previously shared link

#### Testing Requirements

- [ ] Leakage test: Can unauthenticated user access files?
- [ ] Sharing test: Does shared link grant access without entitlement?
- [ ] Revocation test: Does revoked entitlement block existing links?

---

### Story 9.9: Handling Edge Cases Gracefully

**Priority:** High
**Complexity:** High
**Estimated Time:** 5-6 hours

#### User Story

As a **customer in an edge case scenario**,
I want **the system to handle my situation gracefully**,
So that **I never feel stuck or anxious**.

#### Acceptance Criteria

**Given** edge cases occur
**When** customers encounter them
**Then** customers never feel stuck
**And** you can resolve any edge case manually if needed
**And** common edge cases have automatic handling

#### Edge Cases to Support

- Payment succeeds but webhook delayed
- Customer closes browser early
- Email fails to send
- Customer uses different email at checkout
- Customer purchases twice accidentally

#### Required Handling

- "Processing payment…" state
- Email resend capability
- Admin reconciliation tools
- Deduplication logic where appropriate

#### Implementation Checklist

- [ ] Create "processing" state for checkout success page

  ```tsx
  // app/resources/success/page.tsx
  'use client';

  import { useEffect, useState } from 'react';

  export default function SuccessPage({ searchParams }: { searchParams: { session_id?: string } }) {
    const [status, setStatus] = useState<'processing' | 'complete' | 'error'>('processing');

    useEffect(() => {
      if (!searchParams.session_id) return;

      // Poll for order confirmation
      const checkOrder = async () => {
        const res = await fetch(`/api/orders/check?session_id=${searchParams.session_id}`);
        const data = await res.json();

        if (data.status === 'fulfilled') {
          setStatus('complete');
        } else if (data.status === 'failed') {
          setStatus('error');
        }
      };

      // Poll every 3 seconds for up to 30 seconds
      const interval = setInterval(checkOrder, 3000);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        if (status === 'processing') {
          setStatus('complete'); // Assume success, email will arrive
        }
      }, 30000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }, [searchParams.session_id, status]);

    if (status === 'processing') {
      return (
        <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
          <h1 className="text-h1 font-semibold text-stone-900">Processing your purchase...</h1>
          <p className="text-body text-stone-700">
            Please wait while we confirm your payment and set up your access.
          </p>
        </div>
      );
    }

    return (
      <div className="mx-auto max-w-3xl space-y-6 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Purchase complete</h1>
        <p className="text-body text-stone-700">
          Thank you for your purchase. You should receive an email with access instructions shortly.
        </p>
        <p className="text-body text-stone-600">
          If you don't receive an email within 5 minutes, please contact support.
        </p>
      </div>
    );
  }
  ```

- [ ] Implement email resend endpoint

  ```typescript
  // app/api/orders/resend-email/route.ts
  export async function POST(req: Request) {
    const { orderId } = await req.json();

    const order = await db.order.findUnique({
      where: { id: orderId },
      include: { items: true },
    });

    if (!order) {
      return Response.json({ error: 'Order not found' }, { status: 404 });
    }

    const entitlement = await db.entitlement.findFirst({
      where: {
        orderId: order.id,
        active: true,
      },
    });

    if (!entitlement) {
      return Response.json({ error: 'No active entitlement' }, { status: 404 });
    }

    await sendAccessEmail(order, entitlement);

    return Response.json({ success: true });
  }
  ```

- [ ] Implement duplicate purchase detection

  ```typescript
  // lib/stripe/handlers.ts
  export async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
    const productId = session.metadata?.productId;
    const customerEmail = session.customer_details?.email;

    // Check for existing active entitlement
    const existingEntitlement = await db.entitlement.findUnique({
      where: {
        userId_productId: {
          userId: customerEmail!,
          productId: productId!,
        },
      },
    });

    if (existingEntitlement?.active) {
      console.warn('Customer already has access, but purchased again:', customerEmail);
      // Still create order for record-keeping
      // Consider flagging for review or automatic refund
    }

    // ... proceed with order creation
  }
  ```

- [ ] Create admin reconciliation tools (Story 9.12)

#### Testing Requirements

- [ ] Delayed webhook test: Does UI handle gracefully?
- [ ] Browser close test: Can customer access via email?
- [ ] Email failure test: Can support resend email?
- [ ] Duplicate purchase test: Is customer notified?

---

### Story 9.10: Refund Handling & Entitlement Revocation

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer requesting a refund**,
I want **the process to be smooth and automatic**,
So that **access is revoked appropriately and I'm notified**.

#### Acceptance Criteria

**Given** a refund is processed
**When** the webhook fires
**Then** refunded users lose access appropriately
**And** no stale entitlements remain
**And** refunds are reversible only via Stripe

#### Refund Flow

1. Refund initiated in Stripe
2. Webhook fires (`charge.refunded` or `payment_intent.refunded`)
3. Order marked refunded
4. Entitlement revoked or flagged
5. Customer notified (optional but recommended)

#### Rules

✅ Refunds are reversible only via Stripe
✅ Access reflects refund status promptly

#### Implementation Checklist

- [ ] Implement refund webhook handler

  ```typescript
  // lib/stripe/handlers.ts
  export async function handleChargeRefunded(charge: Stripe.Charge) {
    // Find order by payment intent
    const order = await db.order.findFirst({
      where: { stripePaymentIntentId: charge.payment_intent as string },
      include: { items: true },
    });

    if (!order) {
      console.error('Order not found for refunded charge:', charge.id);
      return;
    }

    // Update order status
    await updateOrderStatus(order.id, 'REFUNDED', 'Charge refunded in Stripe');

    // Revoke entitlements
    for (const item of order.items) {
      await revokeEntitlement(order.customerEmail, item.productId);
    }

    // Send refund confirmation email
    await sendRefundEmail(order);

    console.log('Refund processed:', order.id);
  }
  ```

- [ ] Add refund webhook event type

  ```typescript
  // app/api/webhooks/stripe/route.ts
  export async function POST(req: NextRequest) {
    // ... webhook validation

    if (event.type === 'checkout.session.completed') {
      await handleCheckoutCompleted(event.data.object);
    } else if (event.type === 'charge.refunded') {
      await handleChargeRefunded(event.data.object);
    }

    return NextResponse.json({ received: true });
  }
  ```

- [ ] Create refund email template

  ```typescript
  // lib/email/templates.ts
  export function refundEmailTemplate(order: Order) {
    return `
  Subject: Refund processed: ${order.items[0].product.title}
  
  Hi,
  
  Your refund for ${order.items[0].product.title} has been processed.
  
  Refund amount: ${formatCurrency(order.total, order.currency)}
  Original purchase: ${formatDate(order.createdAt)}
  
  The refund should appear in your account within 5-7 business days.
  
  Your access to this product has been removed.
  
  If you have any questions, please reply to this email.
  
  —
  Nathanael
    `;
  }
  ```

- [ ] Test refund flow end-to-end
- [ ] Verify entitlement revocation
- [ ] Verify access blocked after refund

#### Testing Requirements

- [ ] Refund test: Process refund in Stripe, verify webhook handled
- [ ] Access test: Verify refunded user cannot access product
- [ ] Email test: Verify refund confirmation sent

---

### Story 9.11: Email Confirmations (Transactional Only)

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 4-5 hours

#### User Story

As a **customer**,
I want **clear, calm email confirmations**,
So that **I know what to do next and feel reassured**.

#### Acceptance Criteria

**Given** transactional emails are configured
**When** customers receive them
**Then** emails arrive promptly
**And** content is clear and calm
**And** emails reduce support inquiries

#### Required Emails

1. Payment confirmation
2. Access instructions
3. Refund confirmation (if applicable)

#### Rules

✅ Clear, neutral tone
✅ No marketing language
✅ No upsells
✅ No newsletters unless explicitly opted in

#### Implementation Checklist

- [ ] Set up email provider (Resend, SendGrid, or similar)
- [ ] Create access email template

  ```typescript
  // lib/email/templates.ts
  import { Order, Entitlement, Product } from '@prisma/client';

  export function accessEmailTemplate(
    order: Order & { items: Array<{ product: Product }> },
    entitlement: Entitlement
  ) {
    const product = order.items[0].product;
    const accessToken = generateAccessToken(entitlement.userId, product.id);
    const accessUrl = `${process.env.NEXT_PUBLIC_URL}/api/access/${accessToken}`;

    return {
      subject: `Access granted: ${product.title}`,
      html: `
        <p>Hi,</p>
  
        <p>Thank you for purchasing <strong>${product.title}</strong>.</p>
  
        <h2>Access your files:</h2>
        <p><a href="${accessUrl}">Download ${product.title}</a></p>
  
        <h2>What's included:</h2>
        ${product.whatYouGet}
  
        <h2>Need help?</h2>
        <p>Reply to this email or contact support@example.com.</p>
  
        <h2>Refund policy:</h2>
        <p>14-day refund window, no questions asked. Just reply to this email.</p>
  
        <p>—<br>Nathanael</p>
      `,
      text: `
  Hi,
  
  Thank you for purchasing ${product.title}.
  
  Access your files:
  ${accessUrl}
  
  What's included:
  ${product.whatYouGet}
  
  Need help?
  Reply to this email or contact support@example.com.
  
  Refund policy:
  14-day refund window, no questions asked. Just reply to this email.
  
  —
  Nathanael
      `,
    };
  }
  ```

- [ ] Implement email sending function

  ```typescript
  // lib/email/send.ts
  import { Resend } from 'resend';

  const resend = new Resend(process.env.RESEND_API_KEY);

  export async function sendAccessEmail(
    order: Order & { items: Array<{ product: Product }> },
    entitlement: Entitlement
  ) {
    const template = accessEmailTemplate(order, entitlement);

    try {
      await resend.emails.send({
        from: 'Nathanael <orders@example.com>',
        to: order.customerEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      });

      console.log('Access email sent:', order.id);
    } catch (error) {
      console.error('Failed to send access email:', error);
      // Log for manual follow-up
      await db.emailLog.create({
        data: {
          orderId: order.id,
          type: 'access',
          status: 'failed',
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      });
    }
  }
  ```

- [ ] Create payment confirmation template
- [ ] Create refund confirmation template
- [ ] Test email delivery
- [ ] Verify no marketing language

#### Testing Requirements

- [ ] Delivery test: Emails arrive within 1 minute?
- [ ] Clarity test: Are instructions clear?
- [ ] Tone test: Is tone calm and professional?
- [ ] Support reduction test: Do emails answer common questions?

---

### Story 9.12: Admin Visibility & Reconciliation Tools

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 5-6 hours

#### User Story

As an **operator**,
I want **complete visibility into all orders and entitlements**,
So that **I can debug any issue in under 5 minutes**.

#### Acceptance Criteria

**Given** admin tools exist
**When** debugging a purchase issue
**Then** you can debug any purchase in under 5 minutes
**And** you don't need to log into Stripe for routine checks
**And** manual intervention is possible when needed

#### Required Admin Views

- Orders list
- Order detail view
- Stripe IDs visible
- Entitlements per user
- Ability to:
  - Resend access
  - Manually grant/revoke entitlement
  - Annotate issues

#### Implementation Checklist

- [ ] Create admin orders page

  ```tsx
  // app/admin/orders/page.tsx
  import { db } from '@/lib/db';

  export default async function AdminOrdersPage() {
    const orders = await db.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
      include: {
        items: {
          include: { product: true },
        },
      },
    });

    return (
      <div className="mx-auto max-w-7xl px-6 py-16">
        <h1 className="text-h1 mb-8 font-semibold text-stone-900">Orders</h1>

        <table className="w-full">
          <thead>
            <tr className="border-b border-stone-200 text-left">
              <th className="pb-3">Date</th>
              <th className="pb-3">Customer</th>
              <th className="pb-3">Product</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-stone-100">
                <td className="py-3">{formatDate(order.createdAt)}</td>
                <td className="py-3">{order.customerEmail}</td>
                <td className="py-3">{order.items[0]?.product.title}</td>
                <td className="py-3">{formatCurrency(order.total, order.currency)}</td>
                <td className="py-3">
                  <span className={`rounded px-2 py-1 text-sm ${getStatusColor(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3">
                  <a href={`/admin/orders/${order.id}`} className="text-accent hover:underline">
                    View
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  ```

- [ ] Create admin order detail page

  ```tsx
  // app/admin/orders/[id]/page.tsx
  export default async function AdminOrderDetailPage({ params }: { params: { id: string } }) {
    const order = await db.order.findUnique({
      where: { id: params.id },
      include: {
        items: { include: { product: true } },
        entitlements: true,
      },
    });

    if (!order) {
      return <div>Order not found</div>;
    }

    return (
      <div className="mx-auto max-w-4xl space-y-8 px-6 py-16">
        <h1 className="text-h1 font-semibold text-stone-900">Order {order.id}</h1>

        {/* Order details */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Details</h2>
          <dl className="grid grid-cols-2 gap-4">
            <dt className="text-meta text-stone-600">Status:</dt>
            <dd className="text-body">{order.status}</dd>

            <dt className="text-meta text-stone-600">Customer:</dt>
            <dd className="text-body">{order.customerEmail}</dd>

            <dt className="text-meta text-stone-600">Amount:</dt>
            <dd className="text-body">{formatCurrency(order.total, order.currency)}</dd>

            <dt className="text-meta text-stone-600">Created:</dt>
            <dd className="text-body">{formatDateTime(order.createdAt)}</dd>
          </dl>
        </section>

        {/* Stripe IDs */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Stripe IDs</h2>
          <dl className="grid grid-cols-1 gap-2 font-mono text-sm">
            <dt className="text-meta text-stone-600">Session:</dt>
            <dd className="text-body">{order.stripeSessionId}</dd>

            <dt className="text-meta text-stone-600">Payment Intent:</dt>
            <dd className="text-body">{order.stripePaymentIntentId}</dd>
          </dl>
        </section>

        {/* Entitlements */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Entitlements</h2>
          {order.entitlements.map((ent) => (
            <div key={ent.id} className="rounded border border-stone-200 p-4">
              <p>Product: {ent.productId}</p>
              <p>Status: {ent.active ? 'Active' : 'Revoked'}</p>
              <p>Granted: {formatDateTime(ent.createdAt)}</p>
            </div>
          ))}
        </section>

        {/* Actions */}
        <section className="space-y-4">
          <h2 className="text-h2 font-semibold text-stone-900">Actions</h2>
          <div className="flex gap-4">
            <form action="/api/admin/orders/resend-email" method="POST">
              <input type="hidden" name="orderId" value={order.id} />
              <button type="submit" className="rounded bg-stone-900 px-4 py-2 text-white">
                Resend Email
              </button>
            </form>
          </div>
        </section>
      </div>
    );
  }
  ```

- [ ] Create entitlements management page
- [ ] Implement manual grant/revoke actions
- [ ] Add order annotation capability

#### Testing Requirements

- [ ] Debug test: Can you find and fix issue in <5 minutes?
- [ ] Visibility test: All necessary info available?
- [ ] Action test: Manual interventions work correctly?

---

### Story 9.13: Performance & Reliability Constraints

**Priority:** High
**Complexity:** Medium
**Estimated Time:** 3-4 hours

#### User Story

As a **customer**,
I want **checkout to be fast and reliable**,
So that **I complete my purchase without friction**.

#### Acceptance Criteria

**Given** the checkout system is deployed
**When** customers use it
**Then** checkout creation does not time out
**And** webhooks acknowledge receipt quickly
**And** failures trigger alerts/logs

#### Requirements

✅ Checkout creation endpoint is fast (<500ms)
✅ Webhook endpoint is resilient and quick
✅ Heavy work happens async
✅ Failures are logged, not silent

#### Implementation Checklist

- [ ] Optimize checkout creation endpoint

  ```typescript
  // app/api/checkout/route.ts
  export async function POST(req: NextRequest) {
    const startTime = Date.now();

    try {
      const { productId } = await req.json();

      // Validate product exists (should be fast with index)
      const product = await db.product.findUnique({
        where: { id: productId },
        select: {
          id: true,
          stripePriceId: true,
          slug: true,
        },
      });

      if (!product || !product.stripePriceId) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }

      // Create Stripe session (network call, typically <300ms)
      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [{ price: product.stripePriceId, quantity: 1 }],
        success_url: `${process.env.NEXT_PUBLIC_URL}/resources/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/resources/${product.slug}`,
        metadata: { productId: product.id },
      });

      const duration = Date.now() - startTime;
      console.log(`Checkout created in ${duration}ms`);

      return NextResponse.json({ sessionId: session.id });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Checkout creation failed after ${duration}ms:`, error);

      return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
    }
  }
  ```

- [ ] Optimize webhook endpoint (acknowledge quickly, process async)

  ```typescript
  // app/api/webhooks/stripe/route.ts
  export async function POST(req: NextRequest) {
    const startTime = Date.now();

    try {
      // Validate webhook signature
      const body = await req.text();
      const signature = headers().get('stripe-signature')!;

      const event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );

      // Acknowledge receipt immediately (Stripe expects response within ~30s)
      // Process event asynchronously
      processWebhookAsync(event);

      const duration = Date.now() - startTime;
      console.log(`Webhook acknowledged in ${duration}ms`);

      return NextResponse.json({ received: true });
    } catch (error) {
      const duration = Date.now() - startTime;
      console.error(`Webhook validation failed after ${duration}ms:`, error);

      return NextResponse.json({ error: 'Webhook validation failed' }, { status: 400 });
    }
  }

  async function processWebhookAsync(event: Stripe.Event) {
    try {
      await processWebhookIdempotently(event);
    } catch (error) {
      console.error('Webhook processing failed:', error);

      // Send alert (e.g., to Sentry, email, Slack)
      await sendAlert({
        type: 'webhook_processing_failed',
        event: event.type,
        eventId: event.id,
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }
  ```

- [ ] Add performance monitoring
- [ ] Set up error alerting (Sentry or similar)
- [ ] Add timeout handling

#### Testing Requirements

- [ ] Speed test: Checkout creation <500ms?
- [ ] Reliability test: Webhook acknowledgment <1s?
- [ ] Failure test: Errors logged and alerted?

---

### Story 9.14: Testing & Validation

**Priority:** Critical
**Complexity:** High
**Estimated Time:** 6-8 hours

#### User Story

As a **quality assurance engineer**,
I want **comprehensive testing of all payment flows**,
So that **we prevent "works in theory" commerce**.

#### Acceptance Criteria

**Given** all payment flows are implemented
**When** running tests
**Then** all flows are tested in staging
**And** at least one live-mode test is completed before launch
**And** edge cases are validated

#### Required Tests

✅ Successful purchase (test mode)
✅ Duplicate webhook delivery
✅ Failed payment
✅ Refund flow
✅ Access after payment
✅ Access after refund

#### Manual Validation Checklist

- Buy → access works
- Refund → access removed
- Replay webhook → no duplication

#### Implementation Checklist

- [ ] Create test suite for checkout

  ```typescript
  // __tests__/checkout.test.ts
  import { describe, it, expect } from '@jest/globals';
  import { POST as createCheckout } from '@/app/api/checkout/route';

  describe('Checkout API', () => {
    it('creates Stripe session successfully', async () => {
      const req = new Request('http://localhost/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ productId: 'test-product-id' }),
      });

      const response = await createCheckout(req);
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.sessionId).toBeDefined();
      expect(data.sessionId).toMatch(/^cs_test_/);
    });

    it('returns 404 for invalid product', async () => {
      const req = new Request('http://localhost/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ productId: 'invalid-id' }),
      });

      const response = await createCheckout(req);

      expect(response.status).toBe(404);
    });
  });
  ```

- [ ] Create test suite for webhooks

  ```typescript
  // __tests__/webhooks.test.ts
  import { describe, it, expect } from '@jest/globals';
  import { processWebhookIdempotently } from '@/lib/stripe/webhooks';

  describe('Webhook Processing', () => {
    it('processes checkout.session.completed', async () => {
      const mockEvent = {
        id: 'evt_test_123',
        type: 'checkout.session.completed',
        data: {
          object: {
            id: 'cs_test_123',
            payment_intent: 'pi_test_123',
            customer_details: { email: 'test@example.com' },
            amount_total: 2900,
            currency: 'aud',
            metadata: { productId: 'test-product-id' },
          },
        },
      };

      const result = await processWebhookIdempotently(mockEvent as any);

      expect(result.status).toBe('processed');

      // Verify order created
      const order = await db.order.findUnique({
        where: { stripeSessionId: 'cs_test_123' },
      });

      expect(order).toBeDefined();
      expect(order?.status).toBe('PAID');
    });

    it('is idempotent (duplicate webhook)', async () => {
      const mockEvent = {
        id: 'evt_test_456',
        type: 'checkout.session.completed',
        data: {
          object: {
            /* ... */
          },
        },
      };

      // Process once
      await processWebhookIdempotently(mockEvent as any);

      // Process again (duplicate)
      const result = await processWebhookIdempotently(mockEvent as any);

      expect(result.status).toBe('already_processed');

      // Verify only one order created
      const orders = await db.order.findMany({
        where: { stripeSessionId: mockEvent.data.object.id },
      });

      expect(orders.length).toBe(1);
    });
  });
  ```

- [ ] Create integration tests

  ```typescript
  // __tests__/purchase-flow.integration.test.ts
  describe('Full Purchase Flow', () => {
    it('completes end-to-end purchase', async () => {
      // 1. Create checkout session
      const checkoutRes = await fetch('/api/checkout', {
        method: 'POST',
        body: JSON.stringify({ productId: 'test-product' }),
      });
      const { sessionId } = await checkoutRes.json();

      // 2. Simulate Stripe webhook (checkout completed)
      const webhookRes = await fetch('/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'stripe-signature': generateTestSignature(mockEvent),
        },
        body: JSON.stringify(mockCheckoutCompletedEvent),
      });

      expect(webhookRes.status).toBe(200);

      // 3. Verify entitlement granted
      const hasAccess = await checkAccess('test@example.com', 'test-product');
      expect(hasAccess).toBe(true);

      // 4. Verify access email sent
      const emailLog = await db.emailLog.findFirst({
        where: { type: 'access', orderId: mockEvent.id },
      });
      expect(emailLog?.status).toBe('sent');
    });
  });
  ```

- [ ] Create manual validation checklist

  ```markdown
  # Manual Validation Checklist

  ## Before Launch

  - [ ] Create test product in Stripe
  - [ ] Complete test purchase in Stripe test mode
  - [ ] Verify webhook received and processed
  - [ ] Verify order created in database
  - [ ] Verify entitlement granted
  - [ ] Verify access email sent
  - [ ] Test download with entitlement
  - [ ] Process test refund in Stripe
  - [ ] Verify entitlement revoked
  - [ ] Verify access blocked after refund
  - [ ] Test webhook replay (send same event twice)
  - [ ] Verify no duplicate orders/entitlements

  ## Live Mode Test (Before Public Launch)

  - [ ] Create real product in Stripe live mode
  - [ ] Complete real purchase with real payment method
  - [ ] Verify complete flow works in production
  - [ ] Process refund to self
  - [ ] Verify refund flow works in production
  ```

- [ ] Run all automated tests
- [ ] Complete manual validation checklist
- [ ] Perform at least one live-mode test

#### Testing Requirements

- [ ] Automated test coverage >80%
- [ ] All edge cases tested
- [ ] Manual validation checklist completed
- [ ] Live-mode test successful

---

## Epic Completion Criteria

Epic 9 is considered complete when:

### Purchase Flow

- [ ] All 14 stories implemented and tested
- [ ] Checkout creation <500ms
- [ ] Webhook processing is idempotent
- [ ] Happy path works 100% automatically
- [ ] Edge cases handled gracefully

### Data & Security

- [ ] Database is source of truth (not Stripe)
- [ ] All Stripe IDs properly mapped
- [ ] Entitlements control access (not payment logic)
- [ ] All downloads use signed URLs
- [ ] No public access to paid assets

### Reliability & Operations

- [ ] Duplicate webhooks don't corrupt state
- [ ] Failed payments logged and alerted
- [ ] Refunds revoke access automatically
- [ ] Admin can debug any issue in <5 minutes
- [ ] No manual intervention needed for happy path

### Email & Communication

- [ ] Access emails sent immediately
- [ ] Refund confirmations sent
- [ ] No marketing language
- [ ] Emails reduce support inquiries

### Testing & Validation

- [ ] All automated tests passing
- [ ] Manual validation checklist completed
- [ ] Live-mode test successful
- [ ] Edge cases validated

---

## EPIC 9 Deliverables

By the end of EPIC 9, you have:

1. **A rock-solid Stripe checkout**
   Boring, reliable, professional

2. **Idempotent webhook processing**
   Handles duplicates, delays, failures gracefully

3. **Clean separation of payment and access**
   Entitlements control access, not payment state

4. **Secure entitlement-based delivery**
   No public URLs, signed downloads, automatic revocation

5. **Admin confidence in every transaction**
   Can debug any issue in <5 minutes, complete visibility

---

## Why EPIC 9 Matters

### Many personal sites lose credibility here by

- Breaking access after payment
- Mishandling refunds
- Feeling amateurish
- Manual fulfillment
- Race conditions

### With this epic complete

**Money becomes invisible — and trust becomes visible.**

When employers see:

- Professional payment handling
- Automatic fulfillment
- Proper refund process
- Edge cases handled
- Admin tooling in place

They conclude: **"This person can run systems that matter."**

---

**Epic Status:** Ready for Implementation
**Next Epic:** Epic 10 — Customer Access & Delivery UX
