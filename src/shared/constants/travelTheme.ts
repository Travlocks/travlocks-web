import type { ComponentType, SVGProps } from 'react';

import NatureIcon from '@shared/assets/preference/icon-preference-nature.svg?react';
import CultureIcon from '@shared/assets/preference/icon-preference-culture.svg?react';
import FoodIcon from '@shared/assets/preference/icon-preference-food.svg?react';
import HealingIcon from '@shared/assets/preference/icon-preference-healing.svg?react';
import ActivityIcon from '@shared/assets/preference/icon-preference-activity.svg?react';
import LocalIcon from '@shared/assets/preference/icon-preference-local.svg?react';

/**
 * 여행 테마 ID 타입입니다.
 *
 * @remarks
 * 1: 자연, 2: 문화, 3: 맛집, 4: 힐링, 5: 액티비티, 6: 로컬을 의미합니다.
 */
export type TravleThemeId = 1 | 2 | 3 | 4 | 5 | 6;

/**
 * 여행 테마 키 타입입니다.
 *
 * @remarks
 * 내부 로직, 필터링, API 통신 시 문자열 기반 식별자로 사용됩니다.
 */
export type TravleThemeKey = 'nature' | 'culture' | 'food' | 'healing' | 'activity' | 'local';

/**
 * 여행 테마 정보를 나타내는 타입입니다.
 */
export interface TravelTheme {
  id: TravleThemeId; // 여행 테마 고유 ID
  key: TravleThemeKey; // 여행 테마 키
  name: {
    korean: string; // 한국어 이름
    english: string; // 영어 이름
  };
  icon: ComponentType<SVGProps<SVGSVGElement>>; // 여행 테마 아이콘
}

/**
 * 여행 테마 목록입니다.
 *
 * @remarks
 * 여행 사전 정보 입력 단계에서 사용자의 여행 테마 선택 UI를 구성하는 데 사용됩니다.
 */
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

/**
 * 여행 테마 ID를 키로 하는 여행 테마 매핑 객체입니다.
 *
 * @remarks
 * 여행 테마 ID를 통해 빠르게 테마 정보를 조회할 때 사용합니다.
 *
 * @example
 * ```ts
 * const theme = TRAVEL_THEME_MAP[3];
 * console.log(theme.name.korean); // '맛집'입니다.
 * ```
 */
export const TRAVEL_THEME_MAP: Record<TravleThemeId, TravelTheme> = TRAVEL_THEME.reduce(
  (acc, category) => {
    acc[category.id] = category;
    return acc;
  },
  {} as Record<TravleThemeId, TravelTheme>,
);
