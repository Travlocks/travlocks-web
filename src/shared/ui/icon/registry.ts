import Arrow from '@/shared/assets/splash/icon-arrow.svg?react';
import Clock from '@/feature/block/blockBuild/assets/edit-icon-clock.svg?react';
import DragHandle from '@/shared/assets/icon-drag-handle.svg?react';
import Food from '@/shared/assets/preference/icon-preference-food.svg?react';
import X from '@/shared/assets/icon-x.svg?react';

export const iconRegistry = {
  arrow: Arrow,
  clock: Clock,
  dragHandle: DragHandle,
  food: Food,
  x: X,
} as const;

export type IconName = keyof typeof iconRegistry;
