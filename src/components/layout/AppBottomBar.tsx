import { Home, ArrowLeft, Lock } from 'lucide-react';
import { useBottomBar } from '@/hooks/useBottomBar';

export function AppBottomBar() {
  const {
    goHome,
    goBack,
    showBack,
    longPressProgress,
    startLongPress,
    cancelLongPress,
  } = useBottomBar();

  return (
    <footer
      className="fixed bottom-0 left-0 right-0 h-[72px] flex items-center justify-between px-12 bg-card/95 backdrop-blur-sm border-t border-gray-200"
      style={{ zIndex: 100 }}
    >
      {/* Left: Home + Back */}
      <div className="flex items-center gap-4">
        <button
          onPointerDown={(e) => { e.preventDefault(); goHome(); }}
          onClick={goHome}
          className="flex items-center gap-2.5 h-[52px] px-7 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-primary-foreground text-body-sm font-semibold shadow-md shadow-primary/20 touch-ripple transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.97]"
          aria-label="홈으로 이동"
        >
          <Home className="w-5 h-5" />
          <span>홈</span>
        </button>
        {showBack && (
          <button
            onPointerDown={(e) => { e.preventDefault(); goBack(); }}
            onClick={goBack}
            className="flex items-center gap-2.5 h-[52px] px-7 rounded-xl border-2 border-primary text-primary text-body-sm font-semibold touch-ripple transition-all duration-200 hover:bg-primary/5 active:scale-[0.97]"
            aria-label="뒤로 가기"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>뒤로</span>
          </button>
        )}
      </div>

      {/* Right: Admin icon with long press */}
      <div className="relative">
        <button
          onTouchStart={startLongPress}
          onTouchEnd={cancelLongPress}
          onTouchCancel={cancelLongPress}
          onMouseDown={startLongPress}
          onMouseUp={cancelLongPress}
          onMouseLeave={cancelLongPress}
          className="w-[52px] h-[52px] rounded-xl flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-all duration-200 relative"
          aria-label="관리자 모드 (5초간 누르기)"
        >
          <Lock className="w-5 h-5" />
          {longPressProgress > 0 && (
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 52 52">
              <circle
                cx="26" cy="26" r="23"
                fill="none"
                stroke="hsl(var(--color-primary))"
                strokeWidth="3"
                strokeDasharray={`${(longPressProgress / 100) * 144.5} 144.5`}
                strokeLinecap="round"
              />
            </svg>
          )}
        </button>
      </div>
    </footer>
  );
}
