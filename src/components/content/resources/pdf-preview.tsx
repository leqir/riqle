/**
 * PDF Preview Component - Canvas-rendered first-page preview via react-pdf.
 *
 * Replaces the previous <iframe src="pdf#page=1..."> approach, which only
 * worked in Chrome's built-in PDF viewer and silently failed in Safari,
 * Firefox, and most mobile browsers.
 */

'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';

const PdfRender = dynamic(() => import('./pdf-render').then((m) => m.PdfRender), {
  ssr: false,
  loading: () => (
    <div className="flex h-[500px] items-center justify-center text-sm text-stone-500">
      loading preview…
    </div>
  ),
});

interface PDFPreviewProps {
  pdfUrl: string;
  totalPages?: number;
}

export function PDFPreview({ pdfUrl, totalPages = 3 }: PDFPreviewProps) {
  return (
    <div className="space-y-8">
      {/* Preview info */}
      <div className="border-l-2 border-stone-300 pl-6">
        <p className="text-sm leading-relaxed text-stone-600">
          first page (partial) • full {totalPages}-page document unlocked after purchase
        </p>
      </div>

      {/* PDF Preview — canvas render, clipped + faded */}
      <div className="relative overflow-hidden border-l-2 border-stone-900 bg-white">
        <div className="relative h-[500px] overflow-hidden bg-stone-50">
          {/* Canvas render of page 1 */}
          <div className="absolute inset-x-0 top-0">
            <PdfRender pdfUrl={pdfUrl} />
          </div>

          {/* Mouse-block overlay (no text selection, no clicks) */}
          <div
            className="absolute inset-0 z-10"
            style={{ pointerEvents: 'auto', cursor: 'default' }}
          />

          {/* Gradient fade — hides clipped lower content */}
          <div className="via-white/98 pointer-events-none absolute inset-x-0 bottom-0 z-20 h-96 bg-gradient-to-t from-white to-transparent" />
        </div>

        {/* Lock footer */}
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
