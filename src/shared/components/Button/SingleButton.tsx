import clsx from 'clsx';
import type { ReactNode } from 'react';

/**
 * 단일 버튼으로 사용되는 버튼 컴포넌트입니다.
 *
 * 기본 배경색은 variant 값에 따라 결정됩니다.
 * bg prop이 전달될 경우에는 variant보다 우선 적용됩니다.
 *
 * @param {string} text -- 버튼에 표시될 텍스트
 * @param {number | 'full'} width -- 버튼 가로 최대 길이 (max-width) 또는 'full'
 * @param {number} height -- 버튼 세로 길이
 * @param {number} textSize -- 버튼에 들어갈 텍스트 크기, 기본 값은 20입니다. (현재 20, 18만 정의)
 * @param {'button' | 'submit'} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 * @param {string} bg -- tailwind 배경 클래스 (variant 설정을 override함)
 * @param {'primary' | 'white'} variant -- 버튼 기본 배경 스타일, 기본 타입은 primary입니다.
 * @param {boolean} disabled -- 버튼 비활성화 여부
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수
 * @param {ReactNode} icon -- 버튼에 표시될 아이콘 (옵션)
 * @param {'left' | 'right'} iconPosition -- 아이콘 위치, 기본값은 left입니다.
 * @param {string} gap -- 아이콘과 텍스트 사이 간격 (Tailwind gap 클래스), 기본값은 gap-[10px]입니다.

 *
 * @example
 * <SingleButton text="변경사항 저장" width={217} height={65} textSize={20} />
 * <SingleButton text="리믹스 하기" width={387} height={45} textSize={18} icon={<RemixIcon />} />
 *
 * @author 김진효
 * **/

export interface SingleButtonProps {
  text: string;
  width: number | 'full';
  height: number;
  textSize?: number;
  type?: 'button' | 'submit';
  bg?: string;
  variant?: 'primary' | 'white' | 'negative';
  disabled?: boolean;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  icon?: ReactNode;
  iconPosition?: 'left' | 'right';
  iconSize?: string;
  gap?: string;
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
  icon,
  iconPosition = 'left',
  iconSize = 'w-[16px] h-[16px]',
  gap = 'gap-[10px]',
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
        icon && gap,
        className,
      )}
      style={{ maxWidth: width === 'full' ? '100%' : width, height }}>
      {icon && iconPosition === 'left' && <span className={clsx('flex items-center', iconSize)}>{icon}</span>}
      {text}
      {icon && iconPosition === 'right' && <span className={clsx('flex items-center', iconSize)}>{icon}</span>}
    </button>
  );
};

export default SingleButton;
