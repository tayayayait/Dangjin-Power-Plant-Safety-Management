import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast, ToastData } from '@/hooks/useToast';

const icons = {
  success: <CheckCircle2 className="w-6 h-6 text-green-600" />,
  warning: <AlertTriangle className="w-6 h-6 text-yellow-600" />,
  error: <XCircle className="w-6 h-6 text-danger" />,
  info: <Info className="w-6 h-6 text-blue-600" />,
};

const bgColors = {
  success: 'bg-green-50 border-green-200',
  warning: 'bg-yellow-50 border-yellow-200',
  error: 'bg-red-50 border-red-200',
  info: 'bg-blue-50 border-blue-200',
};

export function ToastContainer() {
  const { toasts, dismiss } = useToast();

  return (
    <div 
      className="fixed bottom-[100px] left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-[150] pointer-events-none"
    >
      {toasts.map((toast, index) => (
        <div
          key={toast.id}
          className={cn(
            "pointer-events-auto flex items-center justify-between w-[400px] p-4 rounded-lg shadow-lg border animate-slide-up transition-all",
            bgColors[toast.type]
          )}
          style={{ opacity: 1 - index * 0.15, transform: `scale(${1 - index * 0.05})` }}
        >
          <div className="flex items-center gap-4">
            {icons[toast.type]}
            <p className="text-body font-semibold text-gray-800">{toast.message}</p>
          </div>
          <button 
            onClick={() => dismiss(toast.id)} 
            className="p-1 rounded-full hover:bg-black/5"
            aria-label="닫기"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      ))}
    </div>
  );
}
