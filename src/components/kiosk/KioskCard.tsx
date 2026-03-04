import { LucideIcon } from 'lucide-react';

interface KioskCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

export function KioskCard({ icon: Icon, title, description, onClick, disabled }: KioskCardProps) {
  return (
    <button
      onPointerDown={(e) => { e.preventDefault(); onClick(); }}
      onClick={onClick}
      disabled={disabled}
      role="button"
      tabIndex={0}
      className="flex flex-col items-center justify-center p-8 bg-card rounded-2xl border-2 border-transparent shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 hover:border-primary/20 active:scale-[0.96] transition-all duration-300 touch-ripple group focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4"
      aria-label={`${title} 카테고리로 이동`}
    >
      <div className="w-24 h-24 flex items-center justify-center mb-4">
        <Icon className="w-full h-full text-primary" strokeWidth={1.5} />
      </div>
      <h3 className="text-h3 text-foreground text-center mt-4">{title}</h3>
      <p className="text-caption text-gray-500 text-center mt-2">{description}</p>
    </button>
  );
}
