import { useState, useCallback, useRef } from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { usePanZoom } from '@/hooks/usePanZoom';
import { cn } from '@/lib/utils';

interface ImageViewerProps {
  url: string;
  title: string;
}

export function ImageViewer({ url, title }: ImageViewerProps) {
  const { state: { scale, x, y }, handlers, reset, setScale } = usePanZoom(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  
  const lastTapRef = useRef<{time: number, x: number, y: number} | null>(null);

  const handleDoubleTap = (e: React.TouchEvent | React.MouseEvent) => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.changedTouches[0].clientX;
      clientY = e.changedTouches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    if (lastTapRef.current && (now - lastTapRef.current.time) < DOUBLE_TAP_DELAY) {
      // Is double tap
      reset();
      lastTapRef.current = null;
    } else {
      lastTapRef.current = { time: now, x: clientX, y: clientY };
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden rounded-lg">
      
      {/* Viewport */}
      <div 
        className="relative w-full h-full flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        {...handlers}
        onClick={handleDoubleTap}
        onTouchEnd={e => {
            handlers.onTouchEnd(e);
            handleDoubleTap(e);
        }}
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        
        {error ? (
          <div className="text-danger flex flex-col items-center gap-4">
            <p className="text-h2 font-semibold">이미지를 로드할 수 없습니다</p>
          </div>
        ) : (
          <img
            src={url}
            alt={title}
            className={cn(
               "max-w-none max-h-none object-contain",
               loading ? "opacity-0" : "opacity-100 transition-opacity duration-300"
            )}
            style={{ 
               transform: `translate(${x}px, ${y}px) scale(${scale})`,
               transformOrigin: '0 0', // adjust as panning moves center
               pointerEvents: 'none' // Let container handle events
            }}
            onLoad={() => setLoading(false)}
            onError={() => { setLoading(false); setError(true); }}
            draggable={false}
          />
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg z-10">
        <button 
           onClick={() => setScale(s => s - 0.2)} 
           className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 text-gray-700"
        >
          <ZoomOut className="w-6 h-6" />
        </button>
        <span className="w-16 text-center text-body font-semibold text-gray-800">
          {Math.round(scale * 100)}%
        </span>
        <button 
           onClick={() => setScale(s => s + 0.2)} 
           className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 text-gray-700"
        >
          <ZoomIn className="w-6 h-6" />
        </button>
        <div className="w-px h-8 bg-gray-300 mx-2" />
        <button 
           onClick={reset} 
           className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-200 active:bg-gray-300 text-gray-700"
           aria-label="원본 크기"
        >
          <Maximize className="w-6 h-6" />
        </button>
      </div>
      
    </div>
  );
}
