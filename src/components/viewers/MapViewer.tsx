import { useRef, useEffect, useState } from 'react';
import { ZoomIn, ZoomOut, Maximize } from 'lucide-react';
import { usePanZoom } from '@/hooks/usePanZoom';

interface MapViewerProps {
  url: string;
  title: string;
}

export function MapViewer({ url, title }: MapViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { state: { scale, x, y }, handlers, reset, setScale } = usePanZoom(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const lastTapRef = useRef<{time: number} | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = url;
    img.onload = () => {
      imageRef.current = img;
      setLoading(false);
      draw();
    };
    img.onerror = () => {
      setLoading(false);
      setError(true);
    };
  }, [url]);

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const img = imageRef.current;
    
    if (!canvas || !ctx || !img || !containerRef.current) return;

    // Set canvas internal resolution to match container for crisp rendering
    const containerRect = containerRef.current.getBoundingClientRect();
    canvas.width = containerRect.width;
    canvas.height = containerRect.height;

    // Clear background
    ctx.fillStyle = '#f3f4f6'; // bg-gray-100
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Calculate initial fit scale assuming scale=1 means fit to screen
    const fitScaleX = canvas.width / img.width;
    const fitScaleY = canvas.height / img.height;
    const baseScale = Math.min(fitScaleX, fitScaleY) * 0.9; // 90% fit

    // Apply pan & zoom
    const currentScale = baseScale * scale;
    
    // Center point
    const cx = canvas.width / 2 + x;
    const cy = canvas.height / 2 + y;

    ctx.save();
    ctx.translate(cx, cy);
    ctx.scale(currentScale, currentScale);
    // Draw centered
    ctx.drawImage(img, -img.width / 2, -img.height / 2);
    ctx.restore();
  };

  // Re-draw on state change
  useEffect(() => {
    draw();
  }, [scale, x, y]);
  
  // Re-draw on resize
  useEffect(() => {
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, []);

  const handleDoubleTap = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300;
    
    if (lastTapRef.current && (now - lastTapRef.current.time) < DOUBLE_TAP_DELAY) {
      reset(); // 1x 복귀
      lastTapRef.current = null;
    } else {
      lastTapRef.current = { time: now };
    }
  };

  return (
    <div className="relative w-full h-full bg-gray-100 flex flex-col items-center justify-center overflow-hidden rounded-lg">
      
      {/* Viewport (Canvas Container) */}
      <div 
        ref={containerRef}
        className="relative w-full h-full flex items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        {...handlers}
        onClick={handleDoubleTap}
        onTouchEnd={e => {
            handlers.onTouchEnd(e);
            handleDoubleTap();
        }}
      >
        {loading && !error && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-primary rounded-full animate-spin" />
          </div>
        )}
        
        {error ? (
          <div className="text-danger flex flex-col items-center gap-4">
            <p className="text-h2 font-semibold">지도를 로드할 수 없습니다</p>
          </div>
        ) : (
          <canvas 
            ref={canvasRef} 
            className="w-full h-full pointer-events-none"
            aria-label={title}
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
