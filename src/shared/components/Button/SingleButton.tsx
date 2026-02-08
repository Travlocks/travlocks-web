import clsx from 'clsx';

/**
 * 단일 버튼으로 사용되는 버튼 컴포넌트입니다.
 *
 * 기본 배경색은 variant 값에 따라 결정됩니다.
 * bg prop이 전달될 경우에는 variant보다 우선 적용됩니다.
 *
 * @param {string} text -- 버튼에 표시될 텍스트
 * @param {number} width -- 버튼 가로 최대 길이 (max-width)
 * @param {number} height -- 버튼 세로 길이
 * @param {number} textSize -- 버튼에 들어갈 텍스트 크기, 기본 값은 20입니다. (현재 20, 18만 정의)
 * @param {'button' | 'submit'} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 * @param {string} bg -- tailwind 배경 클래스 (variant 설정을 override함)
 * @param {'primary' | 'white'} variant -- 버튼 기본 배경 스타일, 기본 타입은 primary입니다.
 * @param {boolean} disabled -- 버튼 비활성화 여부
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수

 *
 * @example
 * <SingleButton text="변경사항 저장" width={217} height={65} textSize={20} />
 *
 * @author 김진효
 * **/

export interface SingleButtonProps {
  text: string;
  width: number;
  height: number;
  textSize?: number;
  type?: 'button' | 'submit';
  bg?: string;
  variant?: 'primary' | 'white' | 'negative';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// variant별 기본 배경 (bg 넘기면 무시됨)
const VARIANT_BG: Record<NonNullable<SingleButtonProps['variant']>, string> = {
  primary: 'bg-primary-color text-base-color-6 border-primary-color',
  white: 'bg-text-base-color-6 text-base-color-0 border-base-color-3',
  negative: 'bg-negative text-base-color-6 border-negative',
};

// 글씨 크기 별 스타일
const TEXT_SIZE: Record<number, string> = {
  20: 'h9',
  18: 'b3',
};

const SingleButton = ({
  text,
  textSize = 20,
  width,
  height,
  type = 'button',
  bg,
  variant = 'primary',
  disabled,
  onClick,
  className,
}: SingleButtonProps) => {
  const backgroundClass = bg ?? VARIANT_BG[variant];
  const textSizeClass = TEXT_SIZE[textSize];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-full flex justify-center items-center rounded-[10px] transition-all duration-500',
        disabled ? 'cursor-not-allowed bg-base-color-3!' : 'cursor-pointer border',
        backgroundClass,
        textSizeClass,
        className,
      )}
      style={{ maxWidth: width, height }}>
      {text}
    </button>
  );
};

export default SingleButton;
