import { useState } from 'react';
import { TRAVEL_THEME, type TravleThemeId } from '@/shared/constants/travelTheme';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

const MAX_SELECTED_THEMES = 3;

const TravelThemeSelector = () => {
  const [selectedIds, setSelectedIds] = useState<TravleThemeId[]>([]);

  const handleToggleTheme = (themeId: TravleThemeId) => {
    setSelectedIds((prev) => {
      const isAlreadySelected = prev.includes(themeId);

      // 이미 선택된 값이면 선택 해제
      if (isAlreadySelected) {
        return prev.filter((id) => id !== themeId);
      }

      // 새로 선택하려는데 이미 3개면 더 이상 선택 불가
      if (prev.length >= MAX_SELECTED_THEMES) {
        return prev;
      }

      // 그 외에는 새로 추가
      return [...prev, themeId];
    });
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
