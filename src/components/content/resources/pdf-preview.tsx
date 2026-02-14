/**
 * PDF Preview Component - Shows first page preview using iframe
 */

'use client';

import * as React from 'react';

interface PDFPreviewProps {
  pdfUrl: string;
  totalPages?: number;
}

export function PDFPreview({ pdfUrl, totalPages = 3 }: PDFPreviewProps) {
  // Debug logging
  React.useEffect(() => {
    console.log('=== PDF Preview Debug ===');
    console.log('PDF URL received:', pdfUrl);
    console.log('Total pages:', totalPages);
    console.log('========================');
  }, [pdfUrl, totalPages]);

  return (
    <div className="space-y-8">
      {/* Preview Info - Minimal */}
      <div className="border-l-2 border-stone-300 pl-6">
        <p className="text-sm leading-relaxed text-stone-600">
          first page (partial) • full {totalPages}-page document unlocked after purchase
        </p>
      </div>

      {/* PDF Preview - Shows minimal top portion of first page */}
      <div className="relative overflow-hidden border-l-2 border-stone-900 bg-white">
        {/* Cropped PDF viewer - Shows less text with heavy fade */}
        <div className="relative h-[500px] overflow-hidden bg-stone-50">
          {/* Wrapper to clip iframe and prevent scrolling */}
          <div className="absolute inset-0 overflow-hidden">
            {/* PDF iframe - browser-native rendering - NOT scrollable */}
            <iframe
              src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=page-width`}
              className="absolute left-0 top-0 h-[200%] w-full border-0"
              title="PDF Preview"
              style={{
                pointerEvents: 'none',
                overflow: 'hidden',
              }}
              scrolling="no"
            />
          </div>

          {/* Solid overlay to block mouse interaction completely */}
          <div
            className="absolute inset-0 z-10"
            style={{ pointerEvents: 'auto', cursor: 'default' }}
          />

          {/* Gradient overlay to fade out - covers more of the content */}
          <div className="via-white/98 pointer-events-none absolute inset-x-0 bottom-0 z-20 h-96 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Lock overlay at bottom - Minimalist */}
        <div className="relative border-t border-stone-900 bg-stone-50 px-8 py-12 text-center">
          <p className="mb-2 text-xl font-semibold tracking-tight text-stone-900">
            remaining content locked
          </p>
          <p className="text-sm text-stone-600">
            purchase to unlock the full {totalPages}-page document
          </p>
        </div>
      </div>
    </div>
  );
}
