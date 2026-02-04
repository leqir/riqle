/**
 * PDF Preview Component - Cross-Browser PDF Rendering
 *
 * Shows a cropped preview of the first page using react-pdf for cross-browser support
 */

'use client';

import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Configure PDF.js worker - use unpkg CDN with specific version
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PDFPreviewProps {
  pdfUrl: string;
  totalPages?: number;
}

export function PDFPreview({ pdfUrl, totalPages = 3 }: PDFPreviewProps) {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(800);
  const [numPages, setNumPages] = React.useState<number | null>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Measure container width for responsive PDF rendering
  React.useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerWidth(entry.contentRect.width);
      }
    });

    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  const onDocumentLoadSuccess = ({ numPages: pages }: { numPages: number }) => {
    setNumPages(pages);
    setLoading(false);
    setError(null);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error('PDF loading error:', err);
    setLoading(false);
    setError('Failed to load PDF preview');
  };

  return (
    <div className="space-y-8">
      {/* Preview Info - Minimal */}
      <div className="border-l-2 border-stone-300 pl-6">
        <p className="text-sm leading-relaxed text-stone-600">
          first page (partial) • full {totalPages}-page document unlocked after purchase
        </p>
      </div>

      {/* PDF Preview - Shows minimal top portion of first page */}
      <div className="relative overflow-hidden border-l-2 border-stone-900 bg-white" ref={containerRef}>
        {/* Cropped PDF viewer - Shows less text with heavy fade */}
        <div className="relative h-[500px] overflow-hidden bg-stone-50">
          {loading && (
            <div className="absolute inset-0 z-10 flex items-center justify-center bg-stone-50">
              <div className="text-center">
                <div className="mb-3 inline-block h-8 w-8 animate-spin rounded-full border-4 border-stone-300 border-t-stone-900"></div>
                <p className="text-sm text-stone-600">loading preview...</p>
              </div>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-stone-50 p-8 text-center">
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
              <p className="mb-4 text-xl font-semibold text-stone-900">preview unavailable</p>
              <p className="mb-8 text-sm leading-relaxed text-stone-600">{error}</p>
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-800"
              >
                open pdf in new tab
              </a>
            </div>
          )}

          <div className="absolute left-0 top-0" style={{ pointerEvents: 'none' }}>
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading=""
              error=""
              options={{
                cMapUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/cmaps/`,
                cMapPacked: true,
                standardFontDataUrl: `https://unpkg.com/pdfjs-dist@${pdfjs.version}/standard_fonts/`,
              }}
            >
              <Page
                pageNumber={1}
                width={containerWidth}
                renderTextLayer={true}
                renderAnnotationLayer={false}
                loading=""
                error=""
              />
            </Document>
          </div>

          {/* Gradient overlay to fade out - covers more of the content */}
          {!loading && !error && (
            <div className="via-white/98 pointer-events-none absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-white to-transparent" />
          )}
        </div>

        {/* Lock overlay at bottom - Minimalist */}
        <div className="relative border-t border-stone-900 bg-stone-50 px-8 py-12 text-center">
          <p className="mb-2 text-xl font-semibold tracking-tight text-stone-900">
            remaining content locked
          </p>
          <p className="text-sm text-stone-600">
            purchase to unlock the full {numPages || totalPages}-page document
          </p>
        </div>
      </div>
    </div>
  );
}
