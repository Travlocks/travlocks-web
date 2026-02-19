import clsx from 'clsx';
import { useState } from 'react';
import DestinationCityDropdown from './components/DestinationCityDrodown';
import TripDaysDropdown from './components/TripDaysDropdown';
import TransportTypeSelector from './components/TransportTypeSelector';
import TravelThemeSelector from './components/TravelThemeSelector';
import type { DestinationCityId } from '@/shared/constants/destinationCity';
import type { TransportTypeKey } from '@/shared/constants/transportType';
import type { TravleThemeId } from '@/shared/constants/travelTheme';

import type { TripDayItem } from '@/shared/constants/tripDays';
import { OnboardingWidgetStyle } from './styles/OnboardingWidget.style';
import { usePostOnboarding } from './hooks/usePostOnboarding';
import type { OnboardingRequestDto } from './types/onboarding.type';

import { useNavigate } from 'react-router-dom';

/**
 * 온보딩 위젯에서 서버로 전송할 요청 DTO 타입입니다.
 *
 * @remarks
 * 사용자가 선택한 여행지, 여행 기간, 교통 수단, 여행 테마 정보를 모두 포함합니다.
 */
// OnboardingWidgetRequestDTO는 onboarding.type.ts의 OnboardingRequestDto로 교체되었습니다.

/**
 * 여행 사전 정보를 입력받는 온보딩 위젯 컴포넌트입니다.
 *
 * @remarks
 * - 모든 필수 항목이 유효하게 선택되면 "설정 완료" 버튼이 활성화됩니다.
 * - 현재는 `console.log`를 통해 요청 DTO를 출력하도록 구현되어 있습니다.
 */
const OnboardingWidget = () => {
  const navigate = useNavigate();
  const [selectedCityIds, setSelectedCityIds] = useState<DestinationCityId[]>([]);

  const [selectedTripDayItem, setSelectedTripDayItem] = useState<TripDayItem | null>(null);
  const [selectedTransportTypes, setSelectedTransportTypes] = useState<TransportTypeKey[]>([]);
  const [selectedTravelThemeIds, setSelectedTravelThemeIds] = useState<TravleThemeId[]>([]);

  const { mutate: postOnboarding, isPending } = usePostOnboarding();

  // 유효성 검사
  const isValid =
    selectedCityIds.length > 0 &&
    selectedTripDayItem !== null &&
    selectedTransportTypes.length > 0 &&
    selectedTravelThemeIds.length > 0;

  // 요청 DTO 생성
  const generateRequestDTO = (): OnboardingRequestDto | null => {
    if (!isValid) return null;
    return {
      destinationCityIds: selectedCityIds,
      tripDays: selectedTripDayItem.key,
      transportTypes: selectedTransportTypes,
      travelThemeIds: selectedTravelThemeIds,
    };
  };

  // 제출 핸들러
  const handleSubmit = () => {
    const requestDTO = generateRequestDTO();
    if (requestDTO) {
      postOnboarding(requestDTO, {
        onSuccess: (data) => {
          navigate(`/block/${data.templateId}`, {
            state: {
              data,
              destinationCityIds: selectedCityIds,
            },
          });
        },
      });
    }
  };

  return (
    <div className="flex flex-col gap-[45px]">
      <div className="flex flex-col gap-[45px]">
        {/* 여행지 선택 섹션 */}
        <div className={OnboardingWidgetStyle.componentsWrapper}>
          <div className="flex">
            <span className={OnboardingWidgetStyle.headerText}>
              여행지 선택<span className="text-primary-color">(최대 2개)</span>
            </span>
          </div>
          <DestinationCityDropdown onSelect={setSelectedCityIds} />
        </div>

        {/* 여행 기간 선택 섹션 */}
        <div className={OnboardingWidgetStyle.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyle.headerText}>여행 기간 선택</span>
          </div>
          {/* <TripDurationDropdown onSelect={setSelectedTripDuration} /> */}
          <TripDaysDropdown onSelect={setSelectedTripDayItem} />
        </div>

        {/* 교통 수단 선택 섹션 */}
        <div className={OnboardingWidgetStyle.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyle.headerText}>
              교통 수단 선택<span className="text-primary-color">(최대 1개)</span>
            </span>
          </div>
          <TransportTypeSelector onSelect={setSelectedTransportTypes} />
        </div>

        {/* 여행 테마 선택 섹션 */}
        <div className={OnboardingWidgetStyle.componentsWrapper}>
          <div>
            <span className={OnboardingWidgetStyle.headerText}>
              여행 테마 선택<span className="text-primary-color">(최대 1개)</span>
            </span>
          </div>
          <TravelThemeSelector onSelect={setSelectedTravelThemeIds} />
        </div>
      </div>

      {/* 설정 완료 버튼 */}
      <div className="flex justify-end">
        <button
          onClick={handleSubmit}
          disabled={!isValid || isPending}
          className={clsx(OnboardingWidgetStyle.submitButton, {
            [OnboardingWidgetStyle.submitButtonDisabled]: !isValid || isPending,
            [OnboardingWidgetStyle.submitButtonAbled]: isValid && !isPending,
          })}>
          {isPending ? '설정 중...' : '설정 완료'}
        </button>
      </div>
    </div>
  );
};

export default OnboardingWidget;
