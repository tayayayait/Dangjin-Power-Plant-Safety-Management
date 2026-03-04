import { useState, useRef, useCallback } from 'react';

interface PanZoomState {
  scale: number;
  x: number;
  y: number;
}

export function usePanZoom(initialScale = 1) {
  const [state, setState] = useState<PanZoomState>({ scale: initialScale, x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDist = useRef<number | null>(null);
  const initialScaleRef = useRef(1);

  const reset = useCallback(() => {
    setState({ scale: initialScale, x: 0, y: 0 });
  }, [initialScale]);

  const setScale = useCallback((updater: number | ((s: number) => number)) => {
    setState(prev => {
      let newScale = typeof updater === 'function' ? updater(prev.scale) : updater;
      newScale = Math.max(0.5, Math.min(newScale, 5)); // Limit zoom
      return { ...prev, scale: newScale };
    });
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.buttons !== 1) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - state.x, y: e.clientY - state.y };
    if (containerRef.current) {
       containerRef.current.setPointerCapture(e.pointerId);
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    setState(prev => ({
      ...prev,
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    }));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    if (containerRef.current) {
        containerRef.current.releasePointerCapture(e.pointerId);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomSensitivity = 0.005;
    const delta = -e.deltaY * zoomSensitivity;
    setScale(s => s + delta);
  };

  // Touch handlers for Pinch Zoom
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      initialPinchDist.current = dist;
      initialScaleRef.current = state.scale;
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && initialPinchDist.current !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const ratio = dist / initialPinchDist.current;
      setScale(initialScaleRef.current * ratio);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length < 2) {
      initialPinchDist.current = null;
    }
  };

  const handlers = {
    ref: containerRef,
    onPointerDown: handlePointerDown,
    onPointerMove: handlePointerMove,
    onPointerUp: handlePointerUp,
    onPointerCancel: handlePointerUp,
    onWheel: handleWheel,
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchEnd,
  };

  return { state, handlers, reset, setScale };
}
