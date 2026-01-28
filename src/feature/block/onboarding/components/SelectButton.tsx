// src/shared/components/TravelCategoryButton.tsx
import { clsx } from 'clsx';
import type { TravelTheme } from '@/shared/constants/travelTheme';

interface TravelThemeButtonProps {
  theme: TravelTheme;
  isSelected?: boolean;
  onClick?: (themeId: TravelTheme['id']) => void;
}

export const TravelThemeButton = ({ theme, isSelected = false, onClick }: TravelThemeButtonProps) => {
  const Icon = theme.icon;

  return (
    <button
      type="button"
      onClick={() => onClick?.(theme.id)}
      className={clsx(
        // 바깥 버튼 레이아웃
        'inline-flex flex-col items-center justify-center',
        'gap-[5px]',
        'px-[152px] py-[44px]',
        'rounded-[10px] border',
        'bg-[var(--Base-color_6,#FFF)]',
        'border-[var(--base-color,#D9D9D9)]',
        'transition-colors',

        // 선택(클릭) 상태
        isSelected && [
          'border-[var(--Primary-color,#3C4EF4)]',
          'bg-[var(--Primary-color_checkbox_fill,rgba(60,78,244,0.10))]',
        ],
      )}>
      {/* 아이콘 박스 */}
      <div
        className={clsx(
          'flex items-center justify-center',
          'h-[45px] aspect-square',
          'self-stretch',
          'rounded-[10px]',
          'bg-[var(--Base-color_4,#F3F4F6)]',
        )}>
        <Icon className="w-6 h-6" aria-hidden />
      </div>

      {/* 라벨 */}
      <span className="text-[16px] leading-[1.4] text-[#111827]">{theme.name.korean}</span>
    </button>
  );
};

export default TravelThemeButton;
