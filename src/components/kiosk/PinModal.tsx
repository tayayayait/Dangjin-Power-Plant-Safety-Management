import { useState, useEffect, useCallback } from 'react';
import { Delete } from 'lucide-react';
import { useKiosk } from '@/context/KioskContext';
import { Modal } from './Modal';

interface PinModalProps {
  open: boolean;
  onClose: () => void;
}

const CORRECT_PIN = '000000';

export function PinModal({ open, onClose }: PinModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [lockTimeLeft, setLockTimeLeft] = useState(0);
  const { enterAdminMode, adminPinAttempts, incrementPinAttempts, lockAdmin, adminLockUntil, resetPinAttempts } = useKiosk();

  // Lock countdown
  useEffect(() => {
    if (!adminLockUntil) { setLockTimeLeft(0); return; }
    const interval = setInterval(() => {
      const left = Math.max(0, Math.ceil((adminLockUntil - Date.now()) / 1000));
      setLockTimeLeft(left);
      if (left <= 0) resetPinAttempts();
    }, 1000);
    return () => clearInterval(interval);
  }, [adminLockUntil, resetPinAttempts]);

  const isLocked = lockTimeLeft > 0;

  const handleDigit = useCallback((digit: string) => {
    if (isLocked) return;
    setError(false);
    setPin(prev => {
      const next = prev + digit;
      if (next.length === 6) {
        // Verify
        setTimeout(() => {
          if (next === CORRECT_PIN) {
            enterAdminMode();
            onClose();
            setPin('');
          } else {
            incrementPinAttempts();
            setError(true);
            setPin('');
            if (adminPinAttempts + 1 >= 5) {
              lockAdmin();
            }
          }
        }, 200);
      }
      return next.length <= 6 ? next : prev;
    });
  }, [isLocked, enterAdminMode, onClose, incrementPinAttempts, adminPinAttempts, lockAdmin]);

  const handleDelete = useCallback(() => {
    setError(false);
    setPin(prev => prev.slice(0, -1));
  }, []);

  const handleClear = useCallback(() => {
    setPin('');
    setError(false);
  }, []);

  useEffect(() => {
    if (!open) { setPin(''); setError(false); }
  }, [open]);

  return (
    <Modal 
      open={open} 
      onClose={onClose} 
      title="관리자 인증" 
      maxWidth="max-w-[480px]"
    >
      {isLocked ? (
        <div className="text-center py-8">
          <p className="text-body text-danger font-semibold mb-2">입력이 잠겼습니다</p>
          <p className="text-h2 text-foreground tabular-nums">{Math.floor(lockTimeLeft / 60)}:{String(lockTimeLeft % 60).padStart(2, '0')}</p>
          <p className="text-body-sm text-gray-500 mt-2">후에 다시 시도해주세요</p>
        </div>
      ) : (
        <>
          {/* PIN dots */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className={`w-5 h-5 rounded-full transition-all duration-200 ${
                  i < pin.length
                    ? error ? 'bg-danger' : 'bg-primary'
                    : 'border-2 border-gray-300'
                } ${error ? 'animate-[shake_300ms_ease-in-out]' : ''}`}
              />
            ))}
          </div>

          {error && (
            <p className="text-center text-body-sm text-danger mb-4">
              잘못된 비밀번호입니다 ({adminPinAttempts}/5)
            </p>
          )}

          {/* Number pad */}
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
              <button
                key={n}
                onClick={() => handleDigit(String(n))}
                className="h-[72px] rounded-md bg-gray-50 text-h2 text-foreground font-semibold hover:bg-gray-100 active:bg-primary-light active:scale-[0.97] transition-all duration-100 touch-ripple"
              >
                {n}
              </button>
            ))}
            <button
              onClick={handleClear}
              className="h-[72px] rounded-md bg-gray-50 text-body-sm text-gray-700 font-semibold hover:bg-gray-100 active:scale-[0.97] transition-all duration-100"
            >
              전체삭제
            </button>
            <button
              onClick={() => handleDigit('0')}
              className="h-[72px] rounded-md bg-gray-50 text-h2 text-foreground font-semibold hover:bg-gray-100 active:bg-primary-light active:scale-[0.97] transition-all duration-100 touch-ripple"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="h-[72px] rounded-md bg-gray-50 flex items-center justify-center hover:bg-gray-100 active:scale-[0.97] transition-all duration-100"
              aria-label="삭제"
            >
              <Delete className="w-7 h-7 text-gray-700" />
            </button>
          </div>
        </>
      )}
    </Modal>
  );
}
