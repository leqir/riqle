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
    <div className="space-y-6">
      {/* Preview Info */}
      <div className="flex items-center justify-between rounded-xl bg-blue-50 p-4">
        <div className="flex items-center gap-3">
          <svg
            className="h-5 w-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          <div>
            <p className="text-sm font-semibold text-blue-900">Preview: First page (partial)</p>
            <p className="text-xs text-blue-700">
              Purchase to access full {totalPages}-page document
            </p>
          </div>
        </div>
        <div className="hidden rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white sm:block">
          {totalPages} pages total
        </div>
      </div>

      {/* PDF Preview - Shows top portion of first page */}
      <div className="relative overflow-hidden rounded-xl border-2 border-stone-200 bg-white shadow-lg">
        {/* Cropped PDF embed */}
        <div className="relative h-[600px] overflow-hidden bg-stone-100">
          <embed
            src={`${pdfUrl}#page=1&toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            type="application/pdf"
            className="absolute left-0 top-0 h-[1000px] w-full"
            style={{ pointerEvents: 'none' }}
          />
          {/* Gradient overlay to fade out */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-white via-white/90 to-transparent" />
        </div>

        {/* Lock overlay at bottom */}
        <div className="relative border-t-4 border-blue-600 bg-gradient-to-b from-blue-50 to-blue-100 px-6 py-8 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          <p className="mb-2 text-xl font-bold text-blue-900">Remaining content locked</p>
          <p className="text-sm text-blue-700">
            Purchase to unlock the full document ({totalPages} pages)
          </p>
        </div>
      </div>

      {/* What you'll get */}
      <div className="rounded-xl border border-stone-200 bg-stone-50 p-6">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-stone-900">
          Full document includes:
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-stone-700">
              Complete {totalPages}-page document with full content
            </span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-stone-700">Downloadable PDF format</span>
          </li>
          <li className="flex items-start gap-3">
            <svg
              className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span className="text-sm text-stone-700">
              Forensically watermarked with your purchase details
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
