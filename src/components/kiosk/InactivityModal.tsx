import { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { Button } from './Button';

interface InactivityModalProps {
  open: boolean;
  onContinue: () => void;
  onTimeout: () => void;
  countdownSeconds?: number;
}

export function InactivityModal({ open, onContinue, onTimeout, countdownSeconds = 10 }: InactivityModalProps) {
  const [timeLeft, setTimeLeft] = useState(countdownSeconds);

  useEffect(() => {
    if (!open) { setTimeLeft(countdownSeconds); return; }
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [open, countdownSeconds, onTimeout]);

  return (
    <Modal 
      open={open} 
      onClose={onContinue} 
      maxWidth="max-w-[560px]"
      dangerous={true} // 외부 클릭 시 닫히지 않고 계속 보기 버튼이나 타임아웃으로만 동작하도록
    >
      <div className="text-center flex flex-col items-center">
        <h2 className="text-h2 text-foreground mb-4">계속 보시겠습니까?</h2>
        <p className="text-body text-gray-700 mb-6">
          <span className="text-h1 text-primary font-bold tabular-nums">{timeLeft}</span>
          <span className="text-body-sm text-gray-500 ml-2">초 후 메인 화면으로 돌아갑니다</span>
        </p>
        <Button onClick={onContinue} size="lg" variant="primary" className="px-12 w-auto">
          계속 보기
        </Button>
      </div>
    </Modal>
  );
}
