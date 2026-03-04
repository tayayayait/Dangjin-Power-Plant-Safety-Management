import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  dangerous?: boolean;
  className?: string;
  maxWidth?: string;
}

export function Modal({ open, onClose, title, children, dangerous = false, className, maxWidth = "max-w-[640px]" }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener('keydown', handleEscape);
      // Focus trap basic setup
      if (modalRef.current) {
        modalRef.current.focus();
      }
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center animate-fade-in"
      style={{ zIndex: 'var(--z-modal-backdrop)' }}
    >
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 transition-opacity" 
        onClick={dangerous ? undefined : onClose} 
        aria-hidden="true"
      />

      {/* Modal Card */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
        tabIndex={-1}
        className={cn(
          "relative bg-white rounded-lg shadow-xl p-10 animate-scale-in outline-none",
          "w-full min-w-[480px]",
          maxWidth,
          className
        )}
        style={{ zIndex: 'var(--z-modal)' }}
      >
        {(title || !dangerous) && (
          <div className="flex items-center justify-between mb-8">
            {title ? <h2 id="modal-title" className="text-h2 text-foreground font-semibold">{title}</h2> : <div></div>}
            {!dangerous && (
              <button 
                onClick={onClose} 
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors" 
                aria-label="닫기"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            )}
          </div>
        )}
        
        {children}
      </div>
    </div>
  );
}
