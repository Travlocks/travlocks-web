import clsx from 'clsx';
import { useState } from 'react';
import DestinationCityDropdown from '../components/DestinationCityDrodown';
import TripDurationDropdown from '../components/TripDurationDropdown';
import TransportTypeSelector from '../components/TransportTypeSelector';
import TravelThemeSelector from '../components/TravelThemeSelector';
import type { DestinationCityId } from '@/shared/constants/destinationCity';
import type { TripDuration } from '@/shared/constants/tripDuration';
import type { TransportTypeKey } from '@/shared/constants/transportType';
import type { TravleThemeId } from '@/shared/constants/travelTheme';
import { OnboardingWidgetStyles } from '../styles/OnboardingWidget.style';

interface OnboardingWidgetRequestDTO {
  destinationCityIds: DestinationCityId[];
  trip: {
    days: number;
    nights: number;
  };
  transportTypes: TransportTypeKey[];
  travelThemeIds: TravleThemeId[];
}

const OnboardingWidget = () => {
  const [selectedCityIds, setSelectedCityIds] = useState<DestinationCityId[]>([]);
  const [selectedTripDuration, setSelectedTripDuration] = useState<TripDuration | null>(null);
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<TransportTypeKey[]>([]);
  const [selectedTravelThemeIds, setSelectedTravelThemeIds] = useState<TravleThemeId[]>([]);

  const isValid =
    selectedCityIds.length > 0 &&
    selectedTripDuration !== null &&
    selectedTransportTypes.length > 0 &&
    selectedTravelThemeIds.length > 0;

  const generateRequestDTO = (): OnboardingWidgetRequestDTO => {
    return {
      destinationCityIds: selectedCityIds,
      trip: {
        days: selectedTripDuration?.trip.days ?? 0,
        nights: selectedTripDuration?.trip.nights ?? 0,
      },
      transportTypes: selectedTransportTypes,
      travelThemeIds: selectedTravelThemeIds,
    };
  };

  const handleSubmit = () => {
    if (!isValid) return;
    const requestDTO = generateRequestDTO();
    console.log(requestDTO);
  };

  return (
    <div className="flex flex-col gap-[45px]">
      <div className="flex flex-col gap-[45px]">
        <div className={OnboardingWidgetStyles.componentsWrapper}>
          <div className="flex">
            <span className={OnboardingWidgetStyles.headerText}>
              여행지 선택<span className="text-primary-color">(최대 2개)</span>
            </span>
          </div>
          <DestinationCityDropdown onSelect={setSelectedCityIds} />
        </div>
        <div className={OnboardingWidgetStyles.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyles.headerText}>여행 기간 선택</span>
          </div>
          <TripDurationDropdown onSelect={setSelectedTripDuration} />
        </div>
        <div className={OnboardingWidgetStyles.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyles.headerText}>
              교통 수단 선택<span className="text-primary-color">(복수 선택 가능)</span>
            </span>
          </div>
          <TransportTypeSelector onSelect={setSelectedTransportTypes} />
        </div>
        <div className={OnboardingWidgetStyles.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyles.headerText}>
              여행 테마 선택<span className="text-primary-color">(최대 3개)</span>
            </span>
          </div>
          <TravelThemeSelector onSelect={setSelectedTravelThemeIds} />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={clsx(OnboardingWidgetStyles.submitButton, {
            [OnboardingWidgetStyles.submitButtonDisabled]: !isValid,
            [OnboardingWidgetStyles.submitButtonAbled]: isValid,
          })}>
          설정 완료
        </button>
      </div>
    </div>
  );
};

export default OnboardingWidget;
