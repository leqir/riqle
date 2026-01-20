/**
 * PDF Preview Component - Simple Preview
 *
 * Shows a cropped preview of the first page
 * No PDF.js dependencies - uses native browser PDF rendering
 */

'use client';

import * as React from 'react';

interface PDFPreviewProps {
  pdfUrl: string;
  totalPages?: number;
}

export function PDFPreview({ pdfUrl, totalPages = 3 }: PDFPreviewProps) {
  return (
    <div className="space-y-8">
      {/* Preview Info - Minimal */}
      <div className="border-l-2 border-stone-300 pl-6">
        <p className="text-sm leading-relaxed text-stone-600">
          first page (partial) • full {totalPages}-page document unlocked after purchase
        </p>
      </div>

      {/* PDF Preview - Shows top portion of first page - LARGER */}
      <div className="relative overflow-hidden border-l-2 border-stone-900 bg-white">
        {/* Cropped PDF viewer - Increased height for more visibility */}
        <div className="relative h-[800px] overflow-hidden bg-stone-50">
          <object
            data={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH&zoom=100`}
            type="application/pdf"
            className="absolute left-0 top-0 h-[1600px] w-full"
            style={{ pointerEvents: 'none' }}
          >
            {/* Fallback for browsers that don't support PDF viewing */}
            <div className="flex h-[800px] flex-col items-center justify-center p-8 text-center">
              <svg
                className="mb-6 h-16 w-16 text-stone-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
              </svg>
              <p className="mb-4 text-xl font-semibold text-stone-900">pdf preview unavailable</p>
              <p className="mb-8 text-sm leading-relaxed text-stone-600">
                your browser doesn&apos;t support inline pdf viewing.
              </p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                open pdf in new tab
              </a>
            </div>
          </object>
          {/* Gradient overlay to fade out - stronger gradient */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-white via-white/95 to-transparent" />
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
