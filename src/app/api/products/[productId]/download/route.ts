/**
 * Product Download API with Watermarking
 *
 * Verifies entitlement and serves watermarked PDF
 * Each download is forensically traceable to the buyer
 */

import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth.config';
import { db } from '@/lib/db';
import { watermarkPDF } from '@/lib/pdf-watermark';
import { readFile } from 'fs/promises';
import { join } from 'path';

type RouteContext = {
  params: Promise<{ productId: string }>;
};

export async function GET(request: NextRequest, context: RouteContext) {
  try {
    const { productId } = await context.params;
    const { searchParams } = new URL(request.url);
    const eid = searchParams.get('eid');

    let entitlement;
    let user;

    // Support two access methods: magic link (eid) or authenticated session
    if (eid) {
      // Magic link access - verify entitlement ID
      entitlement = await db.entitlement.findUnique({
        where: { id: eid },
        include: {
          Order: true,
          Product: true,
          User: true,
        },
      });

      if (!entitlement || entitlement.productId !== productId || !entitlement.active) {
        return NextResponse.json({ error: 'Invalid or expired access link' }, { status: 403 });
      }

      user = entitlement.User;
    } else {
      // Session-based access - require authentication
      const session = await getServerSession(authOptions);
      if (!session?.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }

      // Get user
      user = await db.user.findUnique({
        where: { email: session.user.email },
      });

      if (!user) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }

      // Check entitlement (user has purchased this product)
      entitlement = await db.entitlement.findFirst({
        where: {
          userId: user.id,
          productId: productId,
          active: true,
          OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
        },
        include: {
          Order: true,
          Product: true,
        },
      });

      if (!entitlement) {
        return NextResponse.json(
          { error: 'No valid entitlement found. Please purchase this product first.' },
          { status: 403 }
        );
      }
    }

    // Get product details
    const product = entitlement.Product;

    // Get PDF path from product downloadUrls
    if (!product.downloadUrls || product.downloadUrls.length === 0) {
      return NextResponse.json(
        { error: 'No download available for this product' },
        { status: 404 }
      );
    }

    // Use the first download URL (remove leading slash if present)
    const downloadPath = product.downloadUrls[0].replace(/^\//, '');
    const pdfPath = join(process.cwd(), 'public', downloadPath);

    // Read the original PDF
    const pdfBuffer = await readFile(pdfPath);

    // Watermark the PDF with buyer information
    const watermarkedPDF = await watermarkPDF(pdfBuffer.buffer, {
      buyerEmail: user.email,
      buyerName: user.name || undefined,
      purchaseDate: entitlement.createdAt,
      orderId: entitlement.orderId || entitlement.id,
    });

    // Return the watermarked PDF
    return new NextResponse(watermarkedPDF, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${product.slug}-${user.email}.pdf"`,
        'Cache-Control': 'private, no-cache, no-store, must-revalidate',
      },
    });
  } catch (error) {
    console.error('Download error:', error);
    return NextResponse.json({ error: 'Failed to process download' }, { status: 500 });
  }
}
