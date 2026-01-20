/**
 * PDF Watermarking Service
 *
 * Adds forensic watermarks to PDFs with buyer information
 * Makes shared PDFs traceable back to the purchaser
 */

import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';

export interface WatermarkOptions {
  buyerEmail: string;
  buyerName?: string;
  purchaseDate: Date;
  orderId: string;
}

/**
 * Adds watermark to every page of a PDF
 * Watermark includes: buyer email, purchase date, order ID
 * Semi-transparent diagonal text across pages
 */
export async function watermarkPDF(
  pdfBuffer: ArrayBuffer,
  options: WatermarkOptions,
): Promise<Uint8Array> {
  // Load the PDF
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pages = pdfDoc.getPages();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  // Watermark text components
  const watermarkLines = [
    `Licensed to: ${options.buyerEmail}`,
    `Order: ${options.orderId}`,
    `Date: ${options.purchaseDate.toLocaleDateString()}`,
  ];

  // Add watermark to every page
  for (const page of pages) {
    const { width, height } = page.getSize();

    // Add semi-transparent watermark in center (diagonal)
    const fontSize = 12;
    const lineHeight = fontSize + 4;
    const angle = -45; // Diagonal watermark

    // Calculate center position
    const textWidth = Math.max(...watermarkLines.map((line) => font.widthOfTextAtSize(line, fontSize)));
    const textHeight = watermarkLines.length * lineHeight;

    // Draw each line
    watermarkLines.forEach((line, index) => {
      page.drawText(line, {
        x: width / 2 - textWidth / 2,
        y: height / 2 + textHeight / 2 - index * lineHeight,
        size: fontSize,
        font,
        color: rgb(0.7, 0.7, 0.7), // Light gray
        opacity: 0.3, // Semi-transparent
        rotate: { type: 'degrees', angle },
      });
    });

    // Add small footer watermark (visible but not obtrusive)
    page.drawText(`Licensed to ${options.buyerEmail} - ${options.orderId}`, {
      x: 50,
      y: 20,
      size: 7,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.6,
    });

    // Add header watermark
    page.drawText(`Order ${options.orderId} - ${options.purchaseDate.toLocaleDateString()}`, {
      x: 50,
      y: height - 20,
      size: 7,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.6,
    });
  }

  // Save and return the watermarked PDF
  return await pdfDoc.save();
}

/**
 * Generate preview thumbnails from PDF pages
 * Returns base64 encoded images of first N pages
 */
export async function generatePDFPreview(
  pdfBuffer: ArrayBuffer,
  maxPages: number = 3,
): Promise<{ pageCount: number; previewPages: number[] }> {
  const pdfDoc = await PDFDocument.load(pdfBuffer);
  const pageCount = pdfDoc.getPageCount();

  // Return metadata about available pages for preview
  // Actual rendering would be done client-side with PDF.js
  return {
    pageCount,
    previewPages: Array.from({ length: Math.min(maxPages, pageCount) }, (_, i) => i),
  };
}
