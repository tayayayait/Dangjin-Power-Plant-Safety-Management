import { useRef, useState, useCallback } from 'react';
import { useKiosk } from '@/context/KioskContext';

export function useBottomBar() {
  const { goHome, goBack, currentScreen } = useKiosk();
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [longPressProgress, setLongPressProgress] = useState(0);
  const progressInterval = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLongPress = useCallback(() => {
    setLongPressProgress(0);
    progressInterval.current = setInterval(() => {
      setLongPressProgress(prev => {
        if (prev >= 100) return 100;
        return prev + 2;
      });
    }, 100);
    longPressTimer.current = setTimeout(() => {
      if (progressInterval.current) clearInterval(progressInterval.current);
      setLongPressProgress(0);
      window.dispatchEvent(new CustomEvent('open-admin-pin'));
    }, 5000);
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
    if (progressInterval.current) clearInterval(progressInterval.current);
    setLongPressProgress(0);
  }, []);

  const showBack = currentScreen !== 'main' && currentScreen !== 'screensaver';

  return {
    goHome,
    goBack,
    showBack,
    longPressProgress,
    startLongPress,
    cancelLongPress,
  };
}
