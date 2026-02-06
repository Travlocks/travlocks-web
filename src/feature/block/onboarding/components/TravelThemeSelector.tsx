import { useState } from 'react';
import { TRAVEL_THEME, type TravleThemeId } from '@/shared/constants/travelTheme';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

interface TravelThemeSelectorProps {
  /**
   * 선택된 여행 테마 ID 목록이 변경될 때 호출되는 콜백입니다.
   *
   * @param travelThemeIds 현재 선택된 여행 테마 ID 배열입니다.
   */
  onSelect?: (travelThemeIds: TravleThemeId[]) => void;
}

/**
 * 여행 테마 선택 컴포넌트입니다.
 *
 * @remarks
 * 온보딩 과정에서 사용자가 선호하는 여행 테마를 최대 3개까지 선택할 수 있도록 합니다.
 * 각 테마는 아이콘과 라벨을 포함한 선택 버튼 형태로 표시됩니다.
 */
const TravelThemeSelector = ({ onSelect }: TravelThemeSelectorProps) => {
  const [selectedIds, setSelectedIds] = useState<TravleThemeId[]>([]); // 현재 선택된 여행 테마 목록 ID

  /**
   * 특정 여행 테마의 선택 상태를 토글하는 핸들러입니다.
   *
   * @param themeId 토글할 여행 테마 ID입니다.
   *
   * @remarks
   * 이미 선택된 테마이면 해제하고, 선택되지 않았다면 기존 선택 해제 후 해당 테마를 선택합니다. (최대 1개 선택 가능)
   * 선택 결과는 onSelect 콜백을 통해 상위 컴포넌트로 전달됩니다.
   */
  const handleToggleTheme = (themeId: TravleThemeId) => {
    let newSelectedIds: TravleThemeId[];

    if (selectedIds.includes(themeId)) {
      newSelectedIds = selectedIds.filter((id) => id !== themeId);
    } else {
      newSelectedIds = [themeId];
    }

    setSelectedIds(newSelectedIds);
    onSelect?.(newSelectedIds);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {TRAVEL_THEME.map((theme) => (
        <SelectButton
          key={theme.id}
          type="theme"
          item={theme}
          isSelected={selectedIds.includes(theme.id)}
          onClick={handleToggleTheme}
        />
      ))}
    </div>
  );
};

export default TravelThemeSelector;
