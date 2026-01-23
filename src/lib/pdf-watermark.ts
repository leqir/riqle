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
  options: WatermarkOptions
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

    const fontSize = 11;
    const smallFontSize = 7;
    const angle = -45; // Diagonal watermark

    // Watermark text
    const shortWatermark = `${options.buyerEmail}`;
    const orderInfo = `Order ${options.orderId}`;
    const fullWatermark = `Licensed to ${options.buyerEmail}`;

    // Calculate margins to avoid overlapping with edges
    const _margin = 50;
    const edgeMargin = 25;

    // 1. REPEATING DIAGONAL PATTERN (background coverage)
    // Adjusted spacing to prevent overlap with other watermarks
    const diagonalSpacing = 250;
    const diagonalFontSize = 10;

    for (let x = -width; x < width * 2; x += diagonalSpacing) {
      for (let y = -height; y < height * 2; y += diagonalSpacing) {
        // Skip center area to avoid overlap with main center watermark
        const distanceFromCenter = Math.sqrt(
          Math.pow(x - width / 2, 2) + Math.pow(y - height / 2, 2)
        );
        if (distanceFromCenter > 150) {
          page.drawText(shortWatermark, {
            x: x,
            y: y,
            size: diagonalFontSize,
            font,
            color: rgb(0.8, 0.8, 0.8),
            opacity: 0.2,
            rotate: { type: 'degrees', angle },
          });
        }
      }
    }

    // 2. CENTER WATERMARK (most prominent) - only on upper half to avoid footer overlap
    const centerY = height * 0.6; // Position in upper-middle area

    watermarkLines.forEach((line, index) => {
      const textWidth = font.widthOfTextAtSize(line, fontSize);
      page.drawText(line, {
        x: width / 2 - textWidth / 2,
        y: centerY - index * 18,
        size: fontSize,
        font,
        color: rgb(0.6, 0.6, 0.6),
        opacity: 0.35,
        rotate: { type: 'degrees', angle },
      });
    });

    // 3. TOP AND BOTTOM BARS (horizontal, non-overlapping)
    // Top bar - order info
    const topText = `${orderInfo} - ${options.purchaseDate.toLocaleDateString()}`;
    const topTextWidth = font.widthOfTextAtSize(topText, smallFontSize);
    page.drawText(topText, {
      x: width / 2 - topTextWidth / 2,
      y: height - edgeMargin,
      size: smallFontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.6,
    });

    // Bottom bar - license info
    const bottomTextWidth = font.widthOfTextAtSize(fullWatermark, smallFontSize);
    page.drawText(fullWatermark, {
      x: width / 2 - bottomTextWidth / 2,
      y: edgeMargin,
      size: smallFontSize,
      font,
      color: rgb(0.5, 0.5, 0.5),
      opacity: 0.6,
    });

    // 4. STRATEGIC QUADRANT WATERMARKS (non-overlapping positions)
    // These are positioned to avoid the center watermark and edges
    const quadrants = [
      { x: width * 0.25, y: height * 0.8, angle: -30 }, // Top-left
      { x: width * 0.75, y: height * 0.8, angle: -30 }, // Top-right
      { x: width * 0.25, y: height * 0.3, angle: -30 }, // Bottom-left
      { x: width * 0.75, y: height * 0.3, angle: -30 }, // Bottom-right
    ];

    quadrants.forEach((pos) => {
      const textWidth = font.widthOfTextAtSize(shortWatermark, diagonalFontSize);
      page.drawText(shortWatermark, {
        x: pos.x - textWidth / 2,
        y: pos.y,
        size: diagonalFontSize,
        font,
        color: rgb(0.7, 0.7, 0.7),
        opacity: 0.3,
        rotate: { type: 'degrees', angle: pos.angle },
      });
    });

    // 5. SIDE MARGINS (vertical text on left and right)
    // Left margin
    page.drawText(shortWatermark, {
      x: 12,
      y: height / 2,
      size: smallFontSize - 1,
      font,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.4,
      rotate: { type: 'degrees', angle: 90 },
    });

    // Right margin
    page.drawText(shortWatermark, {
      x: width - 12,
      y: height / 2,
      size: smallFontSize - 1,
      font,
      color: rgb(0.6, 0.6, 0.6),
      opacity: 0.4,
      rotate: { type: 'degrees', angle: -90 },
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
  maxPages: number = 3
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
