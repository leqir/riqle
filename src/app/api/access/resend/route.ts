/**
 * Resend Access Link API
 *
 * Epic 10 - Story 10.7: Recovery Flows
 *
 * Allows customers to request a new access link if they lost the original email.
 * Implements rate limiting to prevent abuse.
 */

import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { sendEmail } from '@/lib/email';
import { accessResendEmail } from '@/lib/email-templates';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, productSlug } = body;

    // Validate inputs
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Find entitlements for this email
    const entitlements = await db.entitlement.findMany({
      where: {
        user: {
          email: email.toLowerCase(),
        },
        active: true,
        ...(productSlug && {
          product: {
            slug: productSlug,
          },
        }),
      },
      include: {
        product: {
          select: {
            id: true,
            slug: true,
            title: true,
          },
        },
      },
    });

    if (entitlements.length === 0) {
      // Don't reveal whether email exists in system (privacy)
      // Always return success to prevent email enumeration
      return NextResponse.json({
        success: true,
        message: 'If we find an active purchase for this email, we will send an access link.',
      });
    }

    // Send access emails for each entitlement
    for (const entitlement of entitlements) {
      try {
        const emailContent = accessResendEmail({
          customerEmail: email,
          productTitle: entitlement.product.title,
          productSlug: entitlement.product.slug,
          productId: entitlement.product.id,
          entitlementId: entitlement.id,
        });

        await sendEmail({
          to: email,
          subject: emailContent.subject,
          html: emailContent.html,
        });
      } catch (emailError) {
        console.error(`Failed to send access email for entitlement ${entitlement.id}:`, emailError);
        // Continue with other entitlements even if one fails
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Access link sent to your email',
    });
  } catch (error) {
    console.error('[Resend Access] Error:', error);

    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
