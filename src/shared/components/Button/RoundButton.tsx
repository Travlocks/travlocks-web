import { type ComponentPropsWithoutRef } from 'react';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import clsx from 'clsx';

/**
 * 둥근 버튼에 사용되는 컴포넌트입니다.
 *
 * 기본 배경색은 primary-color이며,
 * bg prop이 전달될 경우에는 해당 값이 우선 적용됩니다.
 *
 * @param {string} text -- 버튼에 표시될 텍스트
 * @param {'button' | 'submit'} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 * @param {string} bg -- tailwind 배경 클래스
 * @param {number} width -- 버튼 가로 길이 (px, 기본값: 100%)
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수

 *
 * @example
 * <RoundButton text="여행 조립하러 떠나기" width={292} />
 * <RoundButton text="여행 시작하기" />
 *
 * @author 김진효
 * **/

type ButtonBaseProps = ComponentPropsWithoutRef<'button'>;
interface RoundButtonProps extends ButtonBaseProps {
  text: string;
  type?: 'button' | 'submit';
  width?: number;
  bg?: string;
  onClick?: () => void;
  hover?: boolean;
  className?: string;
}

const RoundButton = ({ text, type = 'button', width, bg, onClick, hover, className, ...props }: RoundButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        't2 rounded-[30px] h-[64px] flex items-center justify-center gap-[10px] text-base-color-6 cursor-pointer w-full',
        bg ?? 'bg-primary-color',
        hover && 'hover:bg-gradient-color-hover',
        className,
      )}
      style={{ maxWidth: width ?? '100%' }}
      {...props}>
      {text}
      <AppIcon name="arrow" color="white" size={16} />
    </button>
  );
};

export default RoundButton;
