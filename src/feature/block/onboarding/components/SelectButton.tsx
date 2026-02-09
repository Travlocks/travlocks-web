import { SelectButtonStyle } from '@/feature/block/onboarding/styles/SelectButton.style';
import type { SelectButtonProps } from '@/feature/block/onboarding/types/selectButtonTypes';

/**
 * 온보딩 단계에서 사용되는 선택 버튼 컴포넌트입니다.
 *
 * @remarks
 * 여행 테마, 이동 수단 등 아이콘과 라벨을 함께 표시하는 공용 선택 버튼입니다.
 * Discriminated Union 기반의 props 구조를 사용하여,
 * 전달되는 item과 onClick 타입이 자동으로 추론되도록 설계되어 있습니다.
 */
export const SelectButton = (props: SelectButtonProps) => {
  const { isSelected = false } = props; // 버튼 선택 여부

  /**
   * 선택 대상 아이템입니다.
   *
   * @remarks
   * Discriminated Union을 통해 type 값에 따라 정확한 타입으로 추론됩니다.
   */
  const item = props.item;

  const Icon = item.icon; // 선택 대상 아이템의 아이콘 컴포넌트

  /**
   * 버튼 클릭 시 실행되는 핸들러입니다.
   *
   * @remarks
   * props.type에 따라 onClick 콜백이 호출되며,
   * 선택된 아이템의 id를 인자로 전달합니다.
   */
  const handleClick = () => {
    if (props.type === 'theme') {
      props.onClick?.(props.item.id);
    } else {
      props.onClick?.(props.item.id);
    }
  };

  return (
    <button type="button" onClick={handleClick} className={SelectButtonStyle.Root(isSelected)}>
      {/* 아이콘 박스 */}
      <div className={SelectButtonStyle.IconWrapper(isSelected)}>
        <Icon className={SelectButtonStyle.Icon(isSelected)} />
      </div>

      <span className={SelectButtonStyle.Label(isSelected)}>{item.name.korean}</span>
    </button>
  );
};

export default SelectButton;
