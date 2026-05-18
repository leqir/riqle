'use client';

import * as React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf/pdf.worker.min.mjs';

interface PdfRenderProps {
  pdfUrl: string;
}

export function PdfRender({ pdfUrl }: PdfRenderProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(0);

  React.useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const update = () => setWidth(el.clientWidth);
    update();
    const obs = new ResizeObserver(update);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  if (!pdfUrl) {
    return (
      <div className="flex h-[500px] items-center justify-center text-sm text-stone-500">
        preview unavailable
      </div>
    );
  }

  return (
    <div ref={ref} className="w-full">
      <Document
        file={pdfUrl}
        loading={
          <div className="flex h-[500px] items-center justify-center text-sm text-stone-500">
            loading preview…
          </div>
        }
        error={
          <div className="flex h-[500px] items-center justify-center px-8 text-center text-sm text-stone-500">
            preview unavailable — purchase to read the full document
          </div>
        }
      >
        {width > 0 && (
          <Page
            pageNumber={1}
            width={width}
            renderAnnotationLayer={false}
            renderTextLayer={false}
          />
        )}
      </Document>
    </div>
  );
}
