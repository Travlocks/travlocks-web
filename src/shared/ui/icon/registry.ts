import Arrow from '@/shared/assets/splash/icon-arrow.svg?react';

export const iconRegistry = {
  arrow: Arrow,
} as const;

export type IconName = keyof typeof iconRegistry;
