import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useMemo } from 'react';
import clsx from 'clsx';

import { AppIcon } from '@/shared/ui/icon/AppIcon';
import { useToastStore } from '@/shared/stores/toastStore';

const TOAST_DURATION = 2000;

type ToastPosition = 'top-center' | 'top-left' | 'top-right' | 'bottom-center' | 'bottom-left' | 'bottom-right';

const toastConfig = {
  success: { icon: 'check', bg: 'bg-primary-color' },
  error: { icon: 'alert', bg: 'bg-negative' },
  favorite: { icon: 'heartFull', bg: 'bg-[#FF69B4]' },
  unfavorite: { icon: 'heartEmpty', bg: 'bg-base-color-2' },
} as const;

const positionClasses: Record<ToastPosition, string> = {
  'top-center': 'top-[140px] left-1/2 -translate-x-1/2',
  'top-left': 'top-[140px] left-[20px]',
  'top-right': 'top-[140px] right-[20px]',
  'bottom-center': 'bottom-[50px] left-1/2 -translate-x-1/2',
  'bottom-left': 'bottom-[50px] left-[20px]',
  'bottom-right': 'bottom-[50px] right-[20px]',
};

interface ToastItemProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'favorite' | 'unfavorite';
  position?: ToastPosition;
}

// 토스트 아이템 컴포넌트
function ToastItem({ id, message, type, position = 'top-center' }: ToastItemProps) {
  const removeToast = useToastStore((s) => s.removeToast);
  const { icon, bg } = toastConfig[type];

  useEffect(() => {
    const timer = setTimeout(() => removeToast(id), TOAST_DURATION);
    return () => clearTimeout(timer);
  }, [id, removeToast]);

  const isTop = position.startsWith('top');
  const yOffset = isTop ? -20 : 20;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: yOffset, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: yOffset, scale: 0.95 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={clsx('flex items-center gap-3 px-8 py-5 rounded-full shadow-lg', bg)}>
      <AppIcon
        name={icon}
        size={30}
        fill={type === 'favorite' ? '#FFFFFF' : 'none'}
        stroke={type === 'favorite' || type === 'unfavorite' ? 'currentColor' : 'none'}
        className={clsx('shrink-0', type === 'error' && 'text-negative')}
      />
      <p className="t2 font-medium text-white whitespace-nowrap">{message}</p>
    </motion.div>
  );
}

// 토스트 컴포넌트
export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);

  const toastsByPosition = useMemo(() => {
    const grouped: Record<ToastPosition, typeof toasts> = {
      'top-center': [],
      'top-left': [],
      'top-right': [],
      'bottom-center': [],
      'bottom-left': [],
      'bottom-right': [],
    };

    toasts.forEach((toast) => {
      const position = toast.position || 'top-center';
      grouped[position].push(toast);
    });

    return grouped;
  }, [toasts]);

  return createPortal(
    <>
      {(Object.keys(positionClasses) as ToastPosition[]).map((position) => {
        const positionToasts = toastsByPosition[position];
        if (positionToasts.length === 0) return null;

        return (
          <div
            key={position}
            className={clsx(
              'fixed z-toast flex flex-col items-center gap-3 pointer-events-none',
              position === 'top-center' || position === 'bottom-center' ? 'items-center' : '',
              position === 'top-left' || position === 'bottom-left' ? 'items-start' : '',
              position === 'top-right' || position === 'bottom-right' ? 'items-end' : '',
              positionClasses[position],
            )}>
            <AnimatePresence>
              {positionToasts.map((t) => (
                <ToastItem key={t.id} {...t} />
              ))}
            </AnimatePresence>
          </div>
        );
      })}
    </>,
    document.body,
  );
}
