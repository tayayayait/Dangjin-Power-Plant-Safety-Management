import { useEffect, useRef, useCallback } from 'react';

export function useInactivityTimer(
  timeoutSeconds: number,
  onTimeout: () => void,
  enabled: boolean = true
) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    if (enabled) {
      timerRef.current = setTimeout(onTimeout, timeoutSeconds * 1000);
    }
  }, [timeoutSeconds, onTimeout, enabled]);

  useEffect(() => {
    if (!enabled) return;

    const events = ['touchstart', 'mousedown', 'mousemove', 'keydown', 'scroll'];
    
    resetTimer();
    
    events.forEach(event => {
      document.addEventListener(event, resetTimer, { passive: true });
    });

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      events.forEach(event => {
        document.removeEventListener(event, resetTimer);
      });
    };
  }, [resetTimer, enabled]);

  return resetTimer;
}
