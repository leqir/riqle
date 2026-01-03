import { z } from 'zod';
import { TRPCError } from '@trpc/server';
import { createTRPCRouter, protectedProcedure } from '../trpc';
import { stripe } from '@/lib/stripe';

export const checkoutRouter = createTRPCRouter({
  /**
   * Create a Stripe Checkout Session for purchasing a product
   *
   * This endpoint:
   * 1. Validates the product and price exist and are active
   * 2. Creates or retrieves a Stripe customer
   * 3. Creates a Checkout Session with proper metadata for webhook processing
   */
  createSession: protectedProcedure
    .input(
      z.object({
        productId: z.string().cuid(),
        priceId: z.string().cuid(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { productId, priceId } = input;
      const userId = ctx.session.user.id;
      const userEmail = ctx.session.user.email;

      if (!userEmail) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'User email is required for checkout',
        });
      }

      // Validate product and price
      const price = await ctx.db.price.findUnique({
        where: { id: priceId },
        include: { product: true },
      });

      if (!price) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Price not found',
        });
      }

      if (!price.active) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'This price is no longer active',
        });
      }

      if (price.productId !== productId) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Price does not belong to the specified product',
        });
      }

      if (price.product.status !== 'published') {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Product is not available for purchase',
        });
      }

      if (!price.stripePriceId) {
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Product is not configured for Stripe checkout',
        });
      }

      // Check if user already has entitlement
      const existingEntitlement = await ctx.db.entitlement.findUnique({
        where: {
          userId_productId: {
            userId,
            productId,
          },
        },
      });

      if (existingEntitlement?.active) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'You already have access to this product',
        });
      }

      // Get or create Stripe customer
      let stripeCustomerId = ctx.session.user.stripeCustomerId;

      if (!stripeCustomerId) {
        try {
          const customer = await stripe.customers.create({
            email: userEmail,
            name: ctx.session.user.name ?? undefined,
            metadata: {
              userId,
            },
          });

          stripeCustomerId = customer.id;

          // Update user with Stripe customer ID
          await ctx.db.user.update({
            where: { id: userId },
            data: { stripeCustomerId },
          });
        } catch (error) {
          console.error('Failed to create Stripe customer:', error);
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to initialize payment customer',
          });
        }
      }

      // Create Stripe Checkout Session
      try {
        const session = await stripe.checkout.sessions.create({
          customer: stripeCustomerId,
          mode: price.interval ? 'subscription' : 'payment',
          line_items: [
            {
              price: price.stripePriceId,
              quantity: 1,
            },
          ],
          success_url: `${process.env.NEXT_PUBLIC_URL}/account/orders?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${process.env.NEXT_PUBLIC_URL}/resources/${price.product.slug}?canceled=true`,
          metadata: {
            userId,
            productId,
            priceId,
          },
          // Allow promotion codes
          allow_promotion_codes: true,
          // Collect billing address
          billing_address_collection: 'required',
          // Payment method types
          payment_method_types: ['card'],
          // Custom fields for additional data (optional)
          custom_fields: [],
        });

        if (!session.url) {
          throw new TRPCError({
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Failed to generate checkout URL',
          });
        }

        return {
          sessionId: session.id,
          url: session.url,
        };
      } catch (error) {
        console.error('Failed to create checkout session:', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to create checkout session',
        });
      }
    }),

  /**
   * Retrieve session details (for success page)
   */
  getSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const session = await stripe.checkout.sessions.retrieve(input.sessionId);

        // Verify this session belongs to the current user
        if (session.metadata?.userId !== ctx.session.user.id) {
          throw new TRPCError({
            code: 'FORBIDDEN',
            message: 'Not authorized to view this session',
          });
        }

        return {
          id: session.id,
          status: session.status,
          paymentStatus: session.payment_status,
          customerEmail: session.customer_email,
          amountTotal: session.amount_total,
          currency: session.currency,
        };
      } catch (error) {
        console.error('Failed to retrieve session:', error);

        if (error instanceof TRPCError) {
          throw error;
        }

        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to retrieve session details',
        });
      }
    }),
});
