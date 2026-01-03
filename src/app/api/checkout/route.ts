/**
 * Stripe Checkout API Endpoint
 *
 * Epic 8 - Story 8.9: Checkout Flow
 *
 * Creates a Stripe Checkout Session for product purchases.
 * Handles authentication, product validation, and session creation.
 */

import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { stripe } from '@/lib/stripe';
import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    // 3. Fetch product from database
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        priceInCents: true,
        currency: true,
        stripeProductId: true,
        stripePriceId: true,
        published: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    if (!product.published) {
      return NextResponse.json({ error: 'Product not available' }, { status: 404 });
    }

    // 4. Check if user already has entitlement (prevent duplicate purchases)
    const existingEntitlement = await db.entitlement.findUnique({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: product.id,
        },
      },
    });

    if (existingEntitlement && existingEntitlement.active) {
      return NextResponse.json(
        { error: 'You already own this product' },
        { status: 400 }
      );
    }

    // 5. Create or get Stripe Price
    let stripePriceId = product.stripePriceId;

    if (!stripePriceId) {
      // If no Stripe price exists yet, create it
      // This handles the case where products are seeded without Stripe IDs

      // First, create or get Stripe Product
      let stripeProductId = product.stripeProductId;

      if (!stripeProductId) {
        const stripeProduct = await stripe.products.create({
          name: product.title,
          description: product.description,
          metadata: {
            productId: product.id,
          },
        });
        stripeProductId = stripeProduct.id;

        // Update database with Stripe Product ID
        await db.product.update({
          where: { id: product.id },
          data: { stripeProductId: stripeProduct.id },
        });
      }

      // Create Stripe Price
      const stripePrice = await stripe.prices.create({
        product: stripeProductId,
        currency: product.currency.toLowerCase(),
        unit_amount: product.priceInCents,
        metadata: {
          productId: product.id,
        },
      });

      stripePriceId = stripePrice.id;

      // Update database with Stripe Price ID
      await db.product.update({
        where: { id: product.id },
        data: { stripePriceId: stripePrice.id },
      });
    }

    // 6. Create Stripe Checkout Session
    const checkoutSession = await stripe.checkout.sessions.create({
      customer_email: session.user.email,
      line_items: [
        {
          price: stripePriceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/resources/${product.slug}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/resources/${product.slug}?canceled=true`,
      metadata: {
        userId: session.user.id,
        productId: product.id,
      },
      allow_promotion_codes: false, // Epic 8: No discount codes
    });

    // 7. Return checkout URL
    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error('Checkout error:', error);

    const errorMessage = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { error: 'Failed to create checkout session', message: errorMessage },
      { status: 500 }
    );
  }
}
