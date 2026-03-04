import { useScreensaver } from '@/hooks/useScreensaver';

export default function Screensaver() {
  const {
    currentImage,
    nextImage,
    transitioning,
    crossfadeDuration,
    handleTouch,
  } = useScreensaver();

  return (
    <div
      className="fixed inset-0 bg-screensaver-bg flex flex-col items-center justify-center cursor-pointer select-none"
      onClick={handleTouch}
      onTouchStart={handleTouch}
      role="button"
      tabIndex={0}
      aria-label="화면을 터치하여 시작하세요"
    >
      {/* Background slideshow — crossfade */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${currentImage})`,
            opacity: transitioning ? 0 : 0.3,
            transitionDuration: `${crossfadeDuration}ms`,
            transitionTimingFunction: 'var(--easing-default)',
          }}
        />
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity"
          style={{
            backgroundImage: `url(${nextImage})`,
            opacity: transitioning ? 0.3 : 0,
            transitionDuration: `${crossfadeDuration}ms`,
            transitionTimingFunction: 'var(--easing-default)',
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-screensaver-bg/80 via-screensaver-bg/60 to-screensaver-bg/80" />
      </div>

      {/* Centered brand lockup */}
      <div className="relative z-10 text-center">
        {/* Concentric circles */}
        <div className="w-24 h-24 mx-auto mb-10 rounded-full bg-primary/10 flex items-center justify-center ring-1 ring-primary/20">
          <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center ring-1 ring-primary/30">
            <div className="w-8 h-8 rounded-full bg-primary shadow-lg shadow-primary/40" />
          </div>
        </div>

        <h1 className="text-display text-screensaver-text mb-3 tracking-tight">
          당진발전본부
        </h1>
        <p className="text-h2 text-screensaver-accent mb-20 tracking-wide">
          안전관리 키오스크
        </p>

        <p className="text-h2 text-screensaver-text/70 animate-gentle-pulse tracking-wider">
          화면을 터치하세요
        </p>
      </div>

      {/* Subtle bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
    </div>
  );
}
