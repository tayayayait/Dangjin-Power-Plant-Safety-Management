import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// 로컬 환경을 위한 워커 설정
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

interface PdfViewerProps {
  url: string;
  title: string;
}

export function PdfViewer({ url }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setLoading(false);
  }

  const changePage = (offset: number) => {
    setPageNumber(prevPageNumber => {
      const nextPage = prevPageNumber + offset;
      if (nextPage >= 1 && numPages && nextPage <= numPages) {
        return nextPage;
      }
      return prevPageNumber;
    });
  };

  const changeScale = (offset: number) => {
    setScale(prev => Math.max(0.5, Math.min(prev + offset, 3)));
  };

  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-300">
      
      {/* Viewer Header Toolbar */}
      <div className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-6 shrink-0 shadow-sm z-10">
         <div className="flex items-center gap-2">
            <button 
               onClick={() => changeScale(-0.2)}
               className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700"
            >
                <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-body-sm font-semibold text-gray-700 w-12 text-center">{Math.round(scale * 100)}%</span>
            <button 
               onClick={() => changeScale(0.2)}
               className="w-10 h-10 flex items-center justify-center rounded-md hover:bg-gray-100 text-gray-700"
            >
                <ZoomIn className="w-5 h-5" />
            </button>
         </div>

         <div className="flex items-center gap-4 bg-gray-100 rounded-full p-1">
            <button 
                onClick={() => changePage(-1)} 
                disabled={pageNumber <= 1}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-700 disabled:opacity-50"
            >
                <ChevronLeft className="w-6 h-6" />
            </button>
            <span className="text-body font-semibold text-gray-800 w-24 text-center">
                {pageNumber} <span className="text-gray-500">/ {numPages || '?'}</span>
            </span>
            <button 
                onClick={() => changePage(1)} 
                disabled={!numPages || pageNumber >= numPages}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm text-gray-700 disabled:opacity-50"
            >
                <ChevronRight className="w-6 h-6" />
            </button>
         </div>
      </div>

      {/* PDF Document Area */}
      <div className="flex-1 overflow-auto flex justify-center p-8 bg-gray-200">
         <Document
            file={url}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
                <div className="flex items-center justify-center h-full">
                    <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
                </div>
            }
            error={
                <div className="text-danger flex flex-col items-center justify-center h-full gap-4">
                    <p className="text-h2 font-semibold">문서를 불러올 수 없습니다</p>
                    <p className="text-body text-gray-600">파일 경로: {url}</p>
                </div>
            }
         >
             {loading ? null : (
                 <div className="shadow-lg">
                     <Page 
                         pageNumber={pageNumber} 
                         scale={scale} 
                         renderTextLayer={true}
                         renderAnnotationLayer={true}
                         loading={null}
                     />
                 </div>
             )}
         </Document>
      </div>
    </div>
  );
}
