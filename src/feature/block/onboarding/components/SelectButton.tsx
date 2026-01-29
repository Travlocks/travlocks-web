// src/feature/block/onboarding/components/SelectButton.tsx
import { SelectButtonStyles } from '@/feature/block/onboarding/styles/SelectButton.style';
import type { SelectButtonProps } from '@/feature/block/onboarding/types/selectButtonTypes';

export const SelectButton = (props: SelectButtonProps) => {
  const { isSelected = false } = props;

  // Discriminated union을 통해 item과 onClick 타입 추론
  const item = props.item;
  const Icon = item.icon;

  const handleClick = () => {
    if (props.type === 'theme') {
      props.onClick?.(props.item.id);
    } else {
      props.onClick?.(props.item.id);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={SelectButtonStyles.Root(isSelected)}>
      {/* 아이콘 박스 */}
      <div className={SelectButtonStyles.IconWrapper(isSelected)}>
        <Icon className={SelectButtonStyles.Icon(isSelected)} />
      </div>

      {/* 라벨 */}
      <span className={SelectButtonStyles.Label(isSelected)}>{item.name.korean}</span>
    </button>
  );
};

export default SelectButton;
