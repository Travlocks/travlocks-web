import type { TripDaysKey } from '@/shared/constants/tripDays';
import type { TransportTypeKey } from '@/shared/constants/transportType';
import type { TravelTheme } from '@/shared/constants/travelTheme';
import type { DestinationCityId } from '@/shared/constants/destinationCity';

export interface OnboardingRequestDto {
  destinationCityIds: DestinationCityId[];
  tripDays: TripDaysKey;
  transportTypes: TransportTypeKey[];
  travelThemeIds: TravelTheme['id'][];
}

export interface OnboardingResponseDto {
  templateId: string;
  dayCount: number;
  isPublic: boolean;
  shareToken: string;
  shareUrl: string;
}
