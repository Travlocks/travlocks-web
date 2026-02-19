import { create } from 'zustand';

type ToastType = 'success' | 'error' | 'favorite' | 'unfavorite';
type ToastPosition = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  position?: ToastPosition;
}

interface ToastState {
  toasts: Toast[];
  addToast: (message: string, type: ToastType, position?: ToastPosition) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type, position = 'top-center') => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message, type, position }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export const toast = {
  success: (message: string, position?: ToastPosition) =>
    useToastStore.getState().addToast(message, 'success', position),
  error: (message: string, position?: ToastPosition) => useToastStore.getState().addToast(message, 'error', position),
  favorite: (message: string, position?: ToastPosition) =>
    useToastStore.getState().addToast(message, 'favorite', position),
  unfavorite: (message: string, position?: ToastPosition) =>
    useToastStore.getState().addToast(message, 'unfavorite', position),
};
