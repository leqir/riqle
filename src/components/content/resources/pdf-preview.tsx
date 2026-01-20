/**
 * PDF Preview Component - Studocu-style
 *
 * Shows paginated preview of PDF with thumbnails
 * Allows users to see content before purchase
 */

'use client';

import * as React from 'react';

interface PDFPreviewProps {
  pdfUrl: string;
  maxPreviewPages?: number; // Number of pages to show as preview
  totalPages?: number;
}

export function PDFPreview({ pdfUrl, maxPreviewPages = 3, totalPages }: PDFPreviewProps) {
  const [pages, setPages] = React.useState<string[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [pageCount, setPageCount] = React.useState(totalPages || 0);

  React.useEffect(() => {
    let isMounted = true;

    async function loadPDF() {
      try {
        setLoading(true);
        setError(null);

        // Dynamically import PDF.js only on client side
        const pdfjs = await import('pdfjs-dist');

        // Configure worker
        pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

        // Load the PDF document
        const loadingTask = pdfjs.getDocument(pdfUrl);
        const pdf = await loadingTask.promise;

        if (!isMounted) return;

        setPageCount(pdf.numPages);

        // Render first N pages as thumbnails
        const pagesToRender = Math.min(maxPreviewPages, pdf.numPages);
        const renderedPages: string[] = [];

        for (let pageNum = 1; pageNum <= pagesToRender; pageNum++) {
          const page = await pdf.getPage(pageNum);

          // Set up canvas for rendering
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');

          if (!context) continue;

          canvas.height = viewport.height;
          canvas.width = viewport.width;

          // Render the page
          await page.render({
            canvasContext: context,
            viewport,
          }).promise;

          // Convert canvas to data URL
          renderedPages.push(canvas.toDataURL());
        }

        if (isMounted) {
          setPages(renderedPages);
          setLoading(false);
        }
      } catch (err) {
        console.error('PDF loading error:', err);
        if (isMounted) {
          setError('Failed to load PDF preview');
          setLoading(false);
        }
      }
    }

    loadPDF();

    return () => {
      isMounted = false;
    };
  }, [pdfUrl, maxPreviewPages]);

  if (loading) {
    return (
      <div className="flex items-center justify-center rounded-xl border border-stone-200 bg-white p-12">
        <div className="text-center">
          <div className="mb-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-sm text-stone-600">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-900">{error}</p>
      </div>
    );
  }

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
            <p className="text-sm font-semibold text-blue-900">
              Preview: First {pages.length} of {pageCount} pages
            </p>
            <p className="text-xs text-blue-700">Purchase to access full document</p>
          </div>
        </div>
        <div className="hidden rounded-lg bg-blue-600 px-3 py-1 text-xs font-semibold text-white sm:block">
          {pageCount} pages total
        </div>
      </div>

      {/* Page Thumbnails */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pages.map((pageDataUrl, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-all hover:shadow-md"
          >
            <div className="aspect-[8.5/11] overflow-hidden bg-stone-50">
              <img
                src={pageDataUrl}
                alt={`Page ${index + 1}`}
                className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="border-t border-stone-200 bg-white px-4 py-3">
              <p className="text-center text-sm font-medium text-stone-900">Page {index + 1}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Locked Pages Indicator */}
      {pageCount > maxPreviewPages && (
        <div className="rounded-xl border border-stone-300 bg-stone-50 p-8 text-center">
          <svg
            className="mx-auto mb-4 h-12 w-12 text-stone-400"
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
          <p className="mb-2 text-lg font-semibold text-stone-900">
            {pageCount - maxPreviewPages} more pages locked
          </p>
          <p className="text-sm text-stone-600">
            Purchase to unlock the full {pageCount}-page document
          </p>
        </div>
      )}
    </div>
  );
}
