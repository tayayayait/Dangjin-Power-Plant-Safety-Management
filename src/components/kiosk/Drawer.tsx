import React, { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export function Drawer({ open, onClose, title, children }: DrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      drawerRef.current?.focus();
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [open, onClose]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const distance = touchEndX - touchStartX.current;

    // 스와이프 우측으로 50px 이상 이동 시 닫기
    if (distance > 50) {
      onClose();
    }
    touchStartX.current = null;
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 animate-fade-in"
      style={{ zIndex: 'var(--z-drawer)' }}
    >
      <div 
        className="absolute inset-0 bg-black/30" 
        onClick={onClose} 
        aria-hidden="true"
      />
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={cn(
          "absolute right-0 top-0 bottom-0 w-[480px] bg-white shadow-xl flex flex-col outline-none",
          "animate-slide-in-right"
        )}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-300">
          <h2 className="text-h2 font-semibold text-foreground">{title}</h2>
          <button 
            onClick={onClose} 
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" 
            aria-label="닫기"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
