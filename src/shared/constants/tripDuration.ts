export type TripDurationId = 1 | 2 | 3 | 4 | 5;

export type TripDurationKey = '당일치기' | '1박 2일' | '2박 3일' | '3박 4일' | '4일 이상';

export interface TripDuration {
  id: TripDurationId;
  label: TripDurationKey;
  trip: {
    days: number;
    nights: number;
  };
}

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
    label: '4일 이상',
    trip: {
      days: 4,
      nights: 5,
    },
  },
];

export const TRIP_DURATION_MAP: Record<TripDurationId, TripDuration> = TRIP_DURATION.reduce(
  (acc, duration) => {
    acc[duration.id] = duration;
    return acc;
  },
  {} as Record<TripDurationId, TripDuration>,
);
