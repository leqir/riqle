# Stripe Product Setup Guide

This guide walks through creating products in Stripe and linking them to your database.

## Prerequisites

- Stripe account created
- Access to Stripe Dashboard
- Database access (Prisma Studio or SQL client)
- Products created in your database

## Step-by-Step Setup

### Step 1: Create Product in Database

First, create your product in the Riqle database:

```bash
# Open Prisma Studio
pnpm db:studio
```

Navigate to the `Product` table and create a product:

```typescript
{
  name: "Premium Resource Pack",
  slug: "premium-resource-pack",
  description: "A collection of premium resources for developers",
  status: "draft", // Start as draft, publish later
  type: "resource",
  files: null, // Add file references later
}
```

**Note the Product ID** (e.g., `clu8x7y9z0000abcd1234567`)

### Step 2: Create Product in Stripe Dashboard

1. **Login to Stripe Dashboard**
   - Go to https://dashboard.stripe.com
   - Ensure you're in Test mode (toggle in top right)

2. **Navigate to Products**
   - Click "Products" in the left sidebar
   - Click "+ Add product"

3. **Configure Product**
   - **Name:** Premium Resource Pack (match database name)
   - **Description:** A collection of premium resources for developers
   - **Image:** Upload product image (optional but recommended)

4. **Set Pricing**

   **For One-Time Purchases:**
   - **Pricing model:** Standard pricing
   - **Price:** $49.00 (or your price)
   - **Billing period:** One time
   - **Currency:** USD

   **For Subscriptions (Future):**
   - **Pricing model:** Standard pricing
   - **Price:** $9.99
   - **Billing period:** Monthly (or Yearly)
   - **Currency:** USD

5. **Additional Settings**
   - **Statement descriptor:** What appears on customer's bank statement
   - **Unit label:** (optional) e.g., "license", "seat"
   - Click "Save product"

6. **Copy Price ID**
   - After saving, you'll see the price in the product details
   - Click on the price to view details
   - Copy the **Price ID** (starts with `price_`)
   - Example: `price_1OabcdEF2ghiJK3LMnopqr4s`

### Step 3: Create Price in Database

Go back to Prisma Studio and create a `Price` record:

```typescript
{
  productId: "clu8x7y9z0000abcd1234567", // Your product ID from Step 1
  amount: 4900, // Price in cents ($49.00)
  currency: "USD",
  interval: null, // null for one-time, "month" or "year" for subscriptions
  stripePriceId: "price_1OabcdEF2ghiJK3LMnopqr4s", // From Step 2
  active: true,
}
```

**Important:**

- `amount` is in cents (4900 = $49.00)
- `interval` is `null` for one-time purchases
- `stripePriceId` must match exactly what's in Stripe
- `active` must be `true` for checkout to work

### Step 4: Publish Product

Once everything is configured:

1. **In Database (Prisma Studio):**
   - Update Product status to `"published"`
   - Verify Price is `active: true`

2. **In Stripe Dashboard:**
   - Ensure product is not archived
   - Verify price is active

### Step 5: Test the Integration

1. **Start Local Development:**

   ```bash
   # In one terminal
   stripe listen --forward-to http://localhost:3000/api/webhooks/stripe

   # In another terminal
   pnpm dev
   ```

2. **Navigate to Product Page:**
   - Go to your product in the app
   - Click "Purchase" button

3. **Complete Test Purchase:**
   - Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date
   - CVC: Any 3 digits
   - Complete checkout

4. **Verify Fulfillment:**
   - Check console logs for fulfillment confirmation
   - Check database for Order, OrderItem, Entitlement
   - Verify email was logged

## Multiple Pricing Tiers

To offer multiple price points for the same product:

### Example: Basic, Pro, Enterprise Tiers

**Stripe Dashboard:**

Create multiple prices for one product:

1. Basic - $9.99/month - `price_basic123`
2. Pro - $29.99/month - `price_pro456`
3. Enterprise - $99.99/month - `price_enterprise789`

**Database:**

Create multiple Price records:

```typescript
// Basic Price
{
  productId: "clu_yourproduct",
  amount: 999,
  currency: "USD",
  interval: "month",
  stripePriceId: "price_basic123",
  active: true,
}

// Pro Price
{
  productId: "clu_yourproduct",
  amount: 2999,
  currency: "USD",
  interval: "month",
  stripePriceId: "price_pro456",
  active: true,
}

// Enterprise Price
{
  productId: "clu_yourproduct",
  amount: 9999,
  currency: "USD",
  interval: "month",
  stripePriceId: "price_enterprise789",
  active: true,
}
```

**Frontend:**

```tsx
<CheckoutButton
  productId={product.id}
  priceId={basicPrice.id} // Choose which price
  productName={product.name}
  price={basicPrice.amount}
  currency={basicPrice.currency}
/>
```

## Common Product Types

### 1. One-Time Digital Product

**Use Case:** eBook, template, resource pack

**Stripe Configuration:**

- Pricing model: Standard pricing
- Billing period: One time
- Price: $19.99

**Database Price:**

```typescript
{
  amount: 1999,
  interval: null,
  stripePriceId: "price_xxx",
}
```

### 2. Monthly Subscription

**Use Case:** Premium membership, SaaS access

**Stripe Configuration:**

- Pricing model: Standard pricing
- Billing period: Monthly
- Price: $9.99/month

**Database Price:**

```typescript
{
  amount: 999,
  interval: "month",
  stripePriceId: "price_xxx",
}
```

### 3. Annual Subscription (Discounted)

**Use Case:** Yearly plan with discount

**Stripe Configuration:**

- Pricing model: Standard pricing
- Billing period: Yearly
- Price: $99.99/year (vs $119.88 if monthly)

**Database Price:**

```typescript
{
  amount: 9999,
  interval: "year",
  stripePriceId: "price_xxx",
}
```

### 4. Tiered Pricing

**Use Case:** Different feature sets at different prices

Create separate Product records for each tier, or use multiple Price records for one Product (recommended).

## Production Setup

### 1. Switch to Live Mode

**In Stripe Dashboard:**

- Toggle from Test mode to Live mode (top right)
- Recreate products and prices in Live mode
- Products created in Test mode won't appear in Live mode

### 2. Update Environment Variables

```bash
# Production .env
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_... # From production webhook
```

### 3. Configure Production Webhook

**In Stripe Dashboard (Live mode):**

1. Go to Developers > Webhooks
2. Click "+ Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events:
   - `checkout.session.completed`
   - `checkout.session.async_payment_succeeded`
   - `charge.refunded`
5. Click "Add endpoint"
6. Copy webhook signing secret
7. Update production environment variable

### 4. Update Database

Update Price records with Live mode Stripe price IDs:

```sql
UPDATE "Price"
SET "stripePriceId" = 'price_live_xxx'
WHERE id = 'clu_yourpriceid';
```

## Bulk Product Import

For importing many products at once:

### Using Stripe CLI

```bash
# Export products from test mode
stripe products list --limit 100 > products.json

# Import to production (manual process)
# Review products.json and recreate in live mode
```

### Using Prisma Script

Create `scripts/import-products.ts`:

```typescript
import { db } from '../src/lib/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
});

async function importProducts() {
  const products = await db.product.findMany({
    where: { status: 'published' },
    include: { prices: true },
  });

  for (const product of products) {
    // Create product in Stripe
    const stripeProduct = await stripe.products.create({
      name: product.name,
      description: product.description,
    });

    // Create prices in Stripe
    for (const price of product.prices) {
      const stripePrice = await stripe.prices.create({
        product: stripeProduct.id,
        unit_amount: price.amount,
        currency: price.currency,
        recurring: price.interval ? { interval: price.interval } : undefined,
      });

      // Update database with Stripe price ID
      await db.price.update({
        where: { id: price.id },
        data: { stripePriceId: stripePrice.id },
      });
    }
  }
}

importProducts();
```

Run with:

```bash
tsx scripts/import-products.ts
```

## Verification Checklist

Before going live, verify each product:

- [ ] Product exists in database with status "published"
- [ ] Product exists in Stripe (correct mode: test/live)
- [ ] Price record exists in database
- [ ] Price.stripePriceId matches Stripe
- [ ] Price.amount matches Stripe (in cents)
- [ ] Price.currency matches Stripe
- [ ] Price.active is true
- [ ] Product.slug is unique and URL-friendly
- [ ] Test purchase completes successfully
- [ ] Webhook fulfills order correctly
- [ ] Entitlement is granted
- [ ] Email is sent

## Troubleshooting

### "Product not configured for Stripe checkout"

**Cause:** `Price.stripePriceId` is null

**Fix:**

1. Create price in Stripe Dashboard
2. Copy price ID
3. Update database Price record

### "Invalid product/price"

**Cause:** Price doesn't belong to product

**Fix:**

1. Verify `Price.productId` matches `Product.id`
2. Verify price ID is correct in Stripe

### "Product is not available for purchase"

**Cause:** Product status is not "published"

**Fix:**

```sql
UPDATE "Product"
SET status = 'published'
WHERE id = 'your_product_id';
```

### "This price is no longer active"

**Cause:** Price.active is false

**Fix:**

```sql
UPDATE "Price"
SET active = true
WHERE id = 'your_price_id';
```

### Stripe price doesn't match database

**Cause:** Prices updated in Stripe but not in database

**Fix:**

1. Always update both Stripe and database
2. Use database as source of truth
3. Stripe is for payment processing only

## Best Practices

1. **Naming Consistency:**
   - Use same names in database and Stripe
   - Makes debugging easier

2. **Version Control:**
   - Document price changes
   - Keep old prices for historical orders

3. **Testing:**
   - Always test in Test mode first
   - Use test cards, never real cards in Test mode

4. **Price Updates:**
   - Don't delete old prices
   - Create new prices and set old ones inactive
   - Preserves order history

5. **Product Organization:**
   - Use clear, descriptive names
   - Tag products in Stripe for categorization
   - Use metadata for additional info

6. **Documentation:**
   - Document which Stripe product maps to which database product
   - Keep spreadsheet of price IDs
   - Note any special configurations

## Reference Tables

### Currency Codes

| Currency          | Code |
| ----------------- | ---- |
| US Dollar         | USD  |
| Euro              | EUR  |
| British Pound     | GBP  |
| Canadian Dollar   | CAD  |
| Australian Dollar | AUD  |

### Subscription Intervals

| Interval | Database Value |
| -------- | -------------- |
| One-time | `null`         |
| Monthly  | `"month"`      |
| Yearly   | `"year"`       |
| Weekly   | `"week"`       |
| Daily    | `"day"`        |

### Price Conversions

| Display | Database (cents) |
| ------- | ---------------- |
| $9.99   | 999              |
| $19.99  | 1999             |
| $29.99  | 2999             |
| $49.99  | 4999             |
| $99.99  | 9999             |

## Support

For issues with product setup:

1. Check this guide
2. Review Stripe Dashboard for errors
3. Check database schema
4. Test locally with Stripe CLI
5. Review application logs

## Additional Resources

- [Stripe Products Documentation](https://stripe.com/docs/products-prices/overview)
- [Stripe Pricing Models](https://stripe.com/docs/products-prices/pricing-models)
- [Stripe API Reference](https://stripe.com/docs/api/products)
