import { PrismaClient } from '@prisma/client';
import { put } from '@vercel/blob';

const db = new PrismaClient();

async function createTestProduct() {
  try {
    console.log('Creating test product...');

    // Create a simple test PDF content
    const testPdfContent = `%PDF-1.4
1 0 obj
<<
/Type /Catalog
/Pages 2 0 R
>>
endobj
2 0 obj
<<
/Type /Pages
/Kids [3 0 R]
/Count 1
>>
endobj
3 0 obj
<<
/Type /Page
/Parent 2 0 R
/Resources <<
/Font <<
/F1 <<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
>>
>>
/MediaBox [0 0 612 792]
/Contents 4 0 R
>>
endobj
4 0 obj
<<
/Length 44
>>
stream
BT
/F1 24 Tf
100 700 Td
(Test Product - Payment Works!) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f
0000000009 00000 n
0000000058 00000 n
0000000115 00000 n
0000000314 00000 n
trailer
<<
/Size 5
/Root 1 0 R
>>
startxref
407
%%EOF`;

    // Upload to Vercel Blob
    console.log('Uploading PDF to Vercel Blob...');
    const blob = await put('test-product.pdf', Buffer.from(testPdfContent), {
      access: 'public',
      contentType: 'application/pdf',
    });

    console.log('Blob uploaded:', blob.url);

    // Create product in database
    const product = await db.product.create({
      data: {
        id: 'prod_test_payment_verification',
        title: 'Test Product - $1 Payment Test',
        slug: 'test-product-payment-verification',
        description:
          'A simple test product to verify the payment system is working correctly. You can refund this purchase after testing.',
        priceInCents: 100, // $1.00 in cents
        currency: 'AUD',
        published: true,
        featured: false,
        displayOrder: 0,
        format: 'PDF',
        downloadUrls: [blob.url],
        whatItIs: 'A test product for payment verification',
        whatItCovers: 'Basic payment flow testing',
        whatYouGet: 'A simple PDF file confirming payment works',
        targetAudience: 'Testing purposes only',
        nonAudience: 'Not for production use',
        howItWasCreated: 'Generated automatically for testing',
        updatedAt: new Date(),
      },
    });

    console.log('\n✅ Test product created successfully!');
    console.log('Product ID:', product.id);
    console.log('Slug:', product.slug);
    console.log('Price: $1.00 AUD');
    console.log('\nYou can now purchase this product at:');
    console.log(`https://riqle.vercel.app/products/${product.slug}`);
    console.log('\nAfter testing, you can refund the purchase through the Stripe dashboard.');
  } catch (error) {
    console.error('Error creating test product:', error);
  } finally {
    await db.$disconnect();
  }
}

createTestProduct();
