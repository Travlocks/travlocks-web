export const TRIP_DAYS = [
  { key: 'ONE_DAY', label: '당일치기' },
  { key: 'TWO_DAYS', label: '1박 2일' },
  { key: 'THREE_DAYS', label: '2박 3일' },
  { key: 'FOUR_DAYS', label: '3박 4일' },
  { key: 'FIVE_DAYS', label: '4박 5일' },
] as const;

export type TripDayItem = (typeof TRIP_DAYS)[number];
export type TripDaysKey = TripDayItem['key'];
