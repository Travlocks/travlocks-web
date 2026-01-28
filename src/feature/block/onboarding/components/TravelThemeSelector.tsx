import { useState } from 'react';
import { TRAVEL_THEME, type TravleThemeId } from '@/shared/constants/travelTheme';
import SelectButton from '@/feature/block/onboarding/components/SelectButton';

const TravelThemeSelector = () => {
  const [selectedId, setSelectedId] = useState<TravleThemeId | null>(null);

  return (
    <div className="grid grid-cols-3 gap-6">
      {TRAVEL_THEME.map((theme) => (
        <SelectButton
          key={theme.id}
          theme={theme}
          isSelected={theme.id === selectedId}
          onClick={(themeId) => setSelectedId(themeId)}
        />
      ))}
    </div>
  );
};

export default TravelThemeSelector;
