import type { TravelTheme } from '@/shared/constants/travelTheme';
import type { TransportType } from '@/shared/constants/transportType';

// Discriminated Union Types
export type SelectButtonProps =
  | {
      type: 'theme';
      item: TravelTheme;
      isSelected?: boolean;
      onClick?: (id: TravelTheme['id']) => void;
    }
  | {
      type: 'transport';
      item: TransportType;
      isSelected?: boolean;
      onClick?: (id: TransportType['id']) => void;
    };
