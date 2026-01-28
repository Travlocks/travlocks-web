// src/shared/components/SelectButton.tsx
import type { TravelTheme } from '@/shared/constants/travelTheme';
import { SelectButton } from '@/feature/block/onboarding/styles/SelectButton.style';

interface TravelThemeButtonProps {
  theme: TravelTheme;
  isSelected?: boolean;
  onClick?: (themeId: TravelTheme['id']) => void;
}

export const TravelThemeButton = ({ theme, isSelected = false, onClick }: TravelThemeButtonProps) => {
  const Icon = theme.icon;

  return (
    <button type="button" onClick={() => onClick?.(theme.id)} className={SelectButton.Root(isSelected)}>
      {/* 아이콘 박스 */}
      <div className={SelectButton.IconWrapper(isSelected)}>
        <Icon className={SelectButton.Icon(isSelected)} aria-hidden />
      </div>

      {/* 라벨 */}
      <span className={SelectButton.Label(isSelected)}>{theme.name.korean}</span>
    </button>
  );
};

export default TravelThemeButton;
