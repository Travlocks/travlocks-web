import type { ComponentType, SVGProps } from 'react';

import NatureIcon from '@shared/assets/preference/icon-preference-nature.svg?react';
import CultureIcon from '@shared/assets/preference/icon-preference-culture.svg?react';
import FoodIcon from '@shared/assets/preference/icon-preference-food.svg?react';
import HealingIcon from '@shared/assets/preference/icon-preference-healing.svg?react';
import ActivityIcon from '@shared/assets/preference/icon-preference-activity.svg?react';
import LocalIcon from '@shared/assets/preference/icon-preference-local.svg?react';

export type TravleThemeId = 1 | 2 | 3 | 4 | 5 | 6;

export type TravleThemeKey = 'nature' | 'culture' | 'food' | 'healing' | 'activity' | 'local';

export interface TravelTheme {
  id: TravleThemeId;
  key: TravleThemeKey;
  name: {
    korean: string;
    english: string;
  };
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

export const TRAVEL_THEME: TravelTheme[] = [
  {
    id: 1,
    key: 'nature',
    name: {
      korean: '자연',
      english: 'Nature',
    },
    icon: NatureIcon,
  },
  {
    id: 2,
    key: 'culture',
    name: {
      korean: '문화',
      english: 'Culture',
    },
    icon: CultureIcon,
  },
  {
    id: 3,
    key: 'food',
    name: {
      korean: '맛집',
      english: 'Food',
    },
    icon: FoodIcon,
  },
  {
    id: 4,
    key: 'healing',
    name: {
      korean: '힐링',
      english: 'Healing',
    },
    icon: HealingIcon,
  },
  {
    id: 5,
    key: 'activity',
    name: {
      korean: '액티비티',
      english: 'Activity',
    },
    icon: ActivityIcon,
  },
  {
    id: 6,
    key: 'local',
    name: {
      korean: '로컬',
      english: 'Local',
    },
    icon: LocalIcon,
  },
];

export const TRAVEL_THEME_MAP: Record<TravleThemeId, TravelTheme> = TRAVEL_THEME.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<TravleThemeId, TravelTheme>,
);
