# Event Usage Guide

## When to Track Events

Track events ONLY when:

1. Event answers a core question
2. Event will be reviewed regularly
3. Event is actionable

## When NOT to Track

Do NOT track:

- Mouse movements
- Click coordinates
- Form field changes
- Individual keystrokes
- Session recordings
- User identification

## Core Events

### PAGE_VIEW (automatic)

**Question:** Employer understanding + Proof effectiveness
**When:** User views any page
**Properties:** path, referrer
**Privacy:** No PII, aggregate only

### CTA_CLICK

**Question:** Employer understanding
**When:** User clicks primary CTA (e.g., "View Work")
**Properties:** cta_id, destination
**Example:**

```typescript
trackEvent('cta_click', {
  cta_id: 'homepage_view_work',
  destination: '/work',
});
```

### PROJECT_VIEW

**Question:** Proof effectiveness
**When:** User views a project detail page
**Properties:** project_slug
**Example:**

```typescript
trackEvent('project_view', {
  project_slug: 'markpoint',
});
```

### CHECKOUT_INITIATED

**Question:** Commerce health
**When:** User clicks "Buy Now" and checkout session is created
**Properties:** product_id, price
**Example:**

```typescript
trackCheckoutInitiated(product.id, product.priceInCents);
```

### SCROLL_DEPTH

**Question:** Proof effectiveness
**When:** User scrolls to milestone (25%, 50%, 75%, 100%)
**Properties:** depth, page
**Example:**

```typescript
trackScrollDepth(50); // User scrolled to 50%
```

## Adding New Events

Use the metric proposal template:

1. Which core question does this answer?
2. Why is this necessary?
3. What action would you take?
4. How often will you review it?

Reject if answers are unclear.
