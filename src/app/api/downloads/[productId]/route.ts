import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { db } from '@/lib/db';
import { checkAccess } from '@/lib/entitlements';

/**
 * Secure Download Endpoint
 *
 * Epic 9 - Story 9.8: Secure Download Access
 *
 * Flow:
 * 1. Authenticate user
 * 2. Verify product exists
 * 3. Check entitlement access
 * 4. Return download URLs
 *
 * Security:
 * - Requires authentication
 * - Verifies active entitlement
 * - No direct file access without auth
 * - Audit log for downloads (future enhancement)
 *
 * Future Enhancement:
 * - Generate time-limited signed URLs (S3/CloudFront)
 * - Add download tracking/analytics
 * - Rate limiting for abuse prevention
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    // Step 1: Authenticate user
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { productId } = await params;

    // Step 2: Verify product exists
    const product = await db.product.findUnique({
      where: { id: productId },
      select: {
        id: true,
        title: true,
        downloadUrls: true,
        format: true,
      },
    });

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    // Step 3: Check entitlement access
    const hasAccess = await checkAccess(session.user.id, productId);

    if (!hasAccess) {
      return NextResponse.json(
        {
          error: 'Access denied',
          message: 'You do not have an active entitlement for this product',
        },
        { status: 403 }
      );
    }

    // Step 4: Return download URLs
    // For Epic 9, returning direct URLs (stored in Product.downloadUrls)
    // Future: Generate signed URLs with expiry from S3/CloudFront
    return NextResponse.json({
      product: {
        id: product.id,
        title: product.title,
        format: product.format,
      },
      downloads: product.downloadUrls.map((url, index) => ({
        url,
        filename: `${product.title}-${index + 1}`,
      })),
      expiresAt: null, // Future: Add expiry timestamp for signed URLs
    });
  } catch (error) {
    console.error('[Download] Error processing download request:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Runtime configuration
 */
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
