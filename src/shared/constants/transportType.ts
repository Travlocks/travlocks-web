import type { ComponentType, SVGProps } from 'react';

import TransportationWalkingIcon from '@shared/assets/travel-onboarding/transportation-walking.svg?react';
import TransportationPublicIcon from '@shared/assets/travel-onboarding/transportation-public.svg?react';
import TransportationCarIcon from '@shared/assets/travel-onboarding/transportation-car.svg?react';

/**
 * 이동 수단 ID 타입입니다.
 *
 * @remarks
 * 1: 도보, 2: 대중교통, 3: 차량을 의미합니다.
 */
export type TransportTypeId = 1 | 2 | 3;

/**
 * 이동 수단 키 타입입니다.
 *
 * @remarks
 * 내부 로직 및 API 통신에서 문자열 기반 식별자로 사용됩니다.
 */
export type TransportTypeKey = 'WALK' | 'TRANSIT' | 'CAR';

/**
 * 이동 수단 정보를 나타내는 타입입니다.
 */
export interface TransportType {
  id: TransportTypeId; // 이동 수단 고유 ID
  key: TransportTypeKey; // 이동 수단 키
  name: {
    korean: string; // 한국어 이름
    english: string; // 영어 이름
  };
  icon: ComponentType<SVGProps<SVGSVGElement>>; // 이동 수단 아이콘
}

/**
 * 이동 수단 목록입니다.
 *
 * @remarks
 * 여행 사전 정보 입력 단계에서 사용자의 이동 수단 선택 UI를 구성하는 데 사용됩니다.
 */
export const TRANSPORT_TYPE: TransportType[] = [
  {
    id: 1,
    key: 'WALK',
    name: {
      korean: '도보',
      english: 'Walk',
    },
    icon: TransportationWalkingIcon,
  },
  {
    id: 2,
    key: 'TRANSIT',
    name: {
      korean: '대중교통',
      english: 'Transit',
    },
    icon: TransportationPublicIcon,
  },
  {
    id: 3,
    key: 'CAR',
    name: {
      korean: '차량',
      english: 'Car',
    },
    icon: TransportationCarIcon,
  },
];

/**
 * 이동 수단 ID를 키로 하는 이동 수단 매핑 객체입니다.
 *
 * @remarks
 * 이동 수단 ID를 통해 빠르게 이동 수단 정보를 조회할 때 사용합니다.
 *
 * @example
 * ```ts
 * const transport = TRANSPORT_TYPE_MAP[1];
 * console.log(transport.name.korean); // '도보'입니다.
 * ```
 */
export const TRANSPORT_TYPE_MAP: Record<TransportTypeId, TransportType> = TRANSPORT_TYPE.reduce(
  (acc, transport) => {
    acc[transport.id] = transport;
    return acc;
  },
  {} as Record<TransportTypeId, TransportType>,
);
