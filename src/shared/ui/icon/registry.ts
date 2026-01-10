import Arrow from '@/shared/assets/splash/icon-arrow.svg?react';
import X from '@/shared/assets/icon-x.svg?react';

export const iconRegistry = {
  arrow: Arrow,
  x: X,
} as const;

export type IconName = keyof typeof iconRegistry;
