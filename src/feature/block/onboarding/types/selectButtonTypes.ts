import type { TravelTheme } from '@/shared/constants/travelTheme';
import type { TransportType } from '@/shared/constants/transportType';

/**
 * SelectButton 컴포넌트의 props 타입입니다.
 *
 * @remarks
 * Discriminated Union 패턴을 사용하여,
 * `type` 값에 따라 `item`과 `onClick`의 타입이 자동으로 좁혀집니다.
 */
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
