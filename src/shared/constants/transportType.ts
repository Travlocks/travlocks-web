import type { ComponentType, SVGProps } from 'react';

import TransportationWalkingIcon from '@shared/assets/travel-onboarding/transportation-walking.svg?react';
import TransportationPublicIcon from '@shared/assets/travel-onboarding/transportation-public.svg?react';
import TransportationCarIcon from '@shared/assets/travel-onboarding/transportation-car.svg?react';

export type TransportTypeId = 1 | 2 | 3;

export type TransportTypeKey = 'WALK' | 'TRANSIT' | 'CAR';

export interface TransportType {
  id: TransportTypeId;
  key: TransportTypeKey;
  name: {
    korean: string;
    english: string;
  };
  icon: ComponentType<SVGProps<SVGSVGElement>>;
}

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

export const TRANSPORT_TYPE_MAP: Record<TransportTypeId, TransportType> = TRANSPORT_TYPE.reduce(
  (acc, transport) => {
    acc[transport.id] = transport;
    return acc;
  },
  {} as Record<TransportTypeId, TransportType>,
);
