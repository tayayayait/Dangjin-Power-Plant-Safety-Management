import { ShieldCheck } from 'lucide-react';
import { useCurrentTime, formatTime, formatDate } from '@/hooks/useCurrentTime';

export function AppHeader() {
  const time = useCurrentTime();

  return (
    <header
      className="fixed top-0 left-0 right-0 h-[80px] flex items-center justify-between px-12 bg-card/95 backdrop-blur-sm shadow-sm border-b border-gray-100"
      style={{ zIndex: 'var(--z-sticky)' }}
    >
      {/* Logo + Title */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center shadow-md shadow-primary/20">
          <ShieldCheck className="w-7 h-7 text-primary-foreground" />
        </div>
        <div>
          <h1 className="text-h3 text-foreground font-bold tracking-tight">당진발전본부</h1>
          <p className="text-caption text-gray-500 -mt-0.5">안전관리 시스템</p>
        </div>
      </div>

      {/* Time display */}
      <div className="text-right flex items-center gap-6">
        <div className="w-px h-8 bg-gray-200" />
        <div>
          <div className="text-h3 text-foreground font-bold tabular-nums">{formatTime(time)}</div>
          <div className="text-caption text-gray-500">{formatDate(time)}</div>
        </div>
      </div>
    </header>
  );
}
