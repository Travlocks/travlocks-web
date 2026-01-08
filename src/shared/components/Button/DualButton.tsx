import SingleButton, { type SingleButtonProps } from './SingleButton';

/**
 * 두 가지 선택(좌,우)에 사용되는 버튼 컴포넌트입니다.
 *
 * 내부적으로 SingleButton을 사용하며
 * width, height, textSize는 두 버튼에 공통적으로 적용됩니다.
 *
 * 각 버튼의 스타일 (variant, bg), 상태 (disabled), 이벤트 (onClick)는
 * left / right 객체를 통해 개별적으로 제어할 수 있습니다.
 *
 * @param {object} left -- 왼쪽 버튼 설정 (SingleButton props 일부)
 * @param {object} right -- 오른쪽 버튼 설정 (SingleButton props 일부)
 * @param {number} width -- 각 버튼의 가로 길이
 * @param {number} height -- 각 버튼의 세로 길이
 * @param {number} textSize -- 버튼에 들어갈 텍스트 크기, 기본 값은 20입니다. (현재 20, 18만 정의)
 * @param {number} gap -- 버튼 사이 간격
 *
 * @example
 * <DualButton
 *    left={{
 *      text: '이전',
 *      variant: 'white',
 *    }}
 *    right={{
 *      text: '다음',
 *    }}
 *    width={215}
 *    height={64}
 *    gap={10}
 *    textSize={20}
 * />
 *
 * @author 김진효
 * **/

interface DualButtonProps {
  left: Omit<SingleButtonProps, 'width' | 'height' | 'textSize'>;
  right: Omit<SingleButtonProps, 'width' | 'height' | 'textSize'>;
  width: number;
  height: number;
  textSize?: number;
  gap: number;
}

const DualButton = ({ left, right, width, height, gap, textSize }: DualButtonProps) => {
  return (
    <div className="flex" style={{ gap }}>
      <SingleButton {...left} width={width} height={height} textSize={textSize} />
      <SingleButton {...right} width={width} height={height} textSize={textSize} />
    </div>
  );
};

export default DualButton;
