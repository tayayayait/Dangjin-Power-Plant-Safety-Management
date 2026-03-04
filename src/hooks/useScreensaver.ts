import { useEffect, useState, useCallback } from 'react';
import { useKiosk } from '@/context/KioskContext';

const screensaverImages = [
  '/content/screensaver/slide-01.png',
  '/content/screensaver/slide-02.png',
  '/content/screensaver/slide-03.png',
];

const SLIDE_INTERVAL = 5000;
const CROSSFADE_DURATION = 600;

export function useScreensaver() {
  const { goToScreen } = useKiosk();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTransitioning(true);
      setTimeout(() => {
        setCurrentIndex(prev => {
          const next = (prev + 1) % screensaverImages.length;
          setNextIndex((next + 1) % screensaverImages.length);
          return next;
        });
        setTransitioning(false);
      }, CROSSFADE_DURATION);
    }, SLIDE_INTERVAL);

    return () => clearInterval(timer);
  }, []);

  const handleTouch = useCallback(() => {
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.warn(`Error attempting to enable fullscreen: ${err.message}`);
      });
    }
    goToScreen('main');
  }, [goToScreen]);

  return {
    currentImage: screensaverImages[currentIndex],
    nextImage: screensaverImages[nextIndex],
    transitioning,
    crossfadeDuration: CROSSFADE_DURATION,
    handleTouch,
  };
}
