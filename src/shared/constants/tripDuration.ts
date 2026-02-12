/**
 * 여행 기간 ID 타입입니다.
 *
 * @remarks
 * 1: 당일치기, 2: 1박 2일, 3: 2박 3일, 4: 3박 4일, 5: 4일 이상을 의미합니다.
 */
export type TripDurationId = 1 | 2 | 3 | 4 | 5;

/**
 * 여행 기간 라벨 타입입니다.
 *
 * @remarks
 * UI에서 사용자에게 노출되는 여행 기간 문자열 값입니다.
 */
export type TripDurationKey = '당일치기' | '1박 2일' | '2박 3일' | '3박 4일' | '4박 5일';

/**
 * 여행 기간 정보를 나타내는 타입입니다.
 */
export interface TripDuration {
  id: TripDurationId; // 여행 기간 고유 ID
  label: TripDurationKey; // 여행 기간 라벨
  trip: {
    days: number; // 여행 일수
    nights: number; // 여행 박수
  };
}

/**
 * 여행 기간 목록입니다.
 *
 * @remarks
 * 여행 사전 정보 입력 단계에서 사용자의 여행 기간 선택 옵션을 구성하는 데 사용됩니다.
 */
export const TRIP_DURATION: TripDuration[] = [
  {
    id: 1,
    label: '당일치기',
    trip: {
      days: 0,
      nights: 1,
    },
  },
  {
    id: 2,
    label: '1박 2일',
    trip: {
      days: 1,
      nights: 2,
    },
  },
  {
    id: 3,
    label: '2박 3일',
    trip: {
      days: 2,
      nights: 3,
    },
  },
  {
    id: 4,
    label: '3박 4일',
    trip: {
      days: 3,
      nights: 4,
    },
  },
  {
    id: 5,
    label: '4박 5일',
    trip: {
      days: 4,
      nights: 5,
    },
  },
];

/**
 * 여행 기간 ID를 키로 하는 여행 기간 매핑 객체입니다.
 *
 * @remarks
 * 여행 기간 ID를 통해 빠르게 여행 기간 정보를 조회할 때 사용합니다.
 *
 * @example
 * ```ts
 * const duration = TRIP_DURATION_MAP[2];
 * console.log(duration.label); // '1박 2일'입니다.
 * ```
 */
export const TRIP_DURATION_MAP: Record<TripDurationId, TripDuration> = TRIP_DURATION.reduce(
  (acc, duration) => {
    acc[duration.id] = duration;
    return acc;
  },
  {} as Record<TripDurationId, TripDuration>,
);
