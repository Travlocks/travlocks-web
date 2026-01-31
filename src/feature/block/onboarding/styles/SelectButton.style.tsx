// src/shared/components/SelectButton.style.tsx
import { clsx } from 'clsx';

export const SelectButtonStyles = {
  Root: (isSelected?: boolean) =>
    clsx(
      'inline-flex flex-col items-center justify-center',
      'gap-[4px]',
      'px-[152px] py-[44px]',
      'rounded-[10px] border',
      'bg-[var(--Base-color_6,#FFF)]',
      'border-base-color',
      'transition-colors',
      'cursor-pointer',

      isSelected && ['border-primary-color', 'bg-[var(--Primary-color,rgba(60,78,244,0.10))]'],
    ),

  IconWrapper: (isSelected?: boolean) =>
    clsx(
      'flex items-center justify-center',
      'h-[45px] aspect-[1/1]',
      'rounded-[10px]',
      'bg-base-color-4',

      isSelected && 'bg-primary-color',
    ),

  Icon: (isSelected?: boolean) => clsx('w-6 h-6', isSelected && 'text-base-color-6'),

  Label: (isSelected?: boolean) => clsx('b5 font-[500]', isSelected && 'text-primary-color'),
};
