export const TRIP_DAYS = [
  { key: 'ONE_DAY', label: '당일치기', dayCount: 1 },
  { key: 'TWO_DAYS', label: '1박 2일', dayCount: 2 },
  { key: 'THREE_DAYS', label: '2박 3일', dayCount: 3 },
  { key: 'FOUR_DAYS', label: '3박 4일', dayCount: 4 },
  { key: 'FIVE_DAYS', label: '4박 5일', dayCount: 5 },
] as const;

export type TripDayItem = (typeof TRIP_DAYS)[number];
export type TripDaysKey = TripDayItem['key'];

export const TRIP_DAYS_TO_DAY_COUNT: Record<TripDaysKey, TripDayItem['dayCount']> = TRIP_DAYS.reduce(
  (acc, tripDay) => {
    acc[tripDay.key] = tripDay.dayCount;
    return acc;
  },
  {} as Record<TripDaysKey, TripDayItem['dayCount']>,
);
