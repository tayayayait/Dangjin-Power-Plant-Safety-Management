import { useState, useCallback, useEffect } from 'react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

export interface ToastData {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

let memoryState: ToastData[] = [];
let listeners: Array<(state: ToastData[]) => void> = [];

export const toastStore = {
  addToast: (toast: Omit<ToastData, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast = { ...toast, id };
    
    // Max 3 stack
    memoryState = [newToast, ...memoryState].slice(0, 3);
    listeners.forEach((l) => l(memoryState));
    
    if (toast.duration !== Infinity) {
      setTimeout(() => {
        toastStore.dismissToast(id);
      }, toast.duration || 4000);
    }
  },
  dismissToast: (id: string) => {
    memoryState = memoryState.filter((t) => t.id !== id);
    listeners.forEach((l) => l(memoryState));
  },
  subscribe: (listener: (state: ToastData[]) => void) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot: () => memoryState,
};

export function toast(options: Omit<ToastData, 'id'>) {
  toastStore.addToast(options);
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>(toastStore.getSnapshot());

  useEffect(() => {
    return toastStore.subscribe(setToasts);
  }, []);

  return { toasts, toast, dismiss: toastStore.dismissToast };
}
