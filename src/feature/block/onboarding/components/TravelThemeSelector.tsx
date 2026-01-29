import { useState } from 'react';
import { TRAVEL_THEME, type TravleThemeId } from '@/shared/constants/travelTheme';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

const MAX_SELECTED_THEMES = 3;

interface TravelThemeSelectorProps {
  onSelect?: (travelThemeIds: TravleThemeId[]) => void;
}

const TravelThemeSelector = ({ onSelect }: TravelThemeSelectorProps) => {
  const [selectedIds, setSelectedIds] = useState<TravleThemeId[]>([]);

  const handleToggleTheme = (themeId: TravleThemeId) => {
    let newSelectedIds: TravleThemeId[];

    if (selectedIds.includes(themeId)) {
      newSelectedIds = selectedIds.filter((id) => id !== themeId);
    } else {
      if (selectedIds.length >= MAX_SELECTED_THEMES) {
        return;
      }
      newSelectedIds = [...selectedIds, themeId];
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
