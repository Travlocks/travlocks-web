import clsx from 'clsx';

/**
 * 가장 기본적으로 사용되는 버튼 컴포넌트입니다.
 *
 * 기본 배경색은 variant 값에 따라 결정됩니다.
 * bg prop이 전달될 경우에는 variant보다 우선 적용됩니다.
 *
 * @param {string} text -- 버튼에 표시될 텍스트
 * @param {'button' | 'submit'} type -- 버튼 타입, 기본 타입은 button이며 필요에 따라 타입을 지정할 수 있습니다.
 * @param {string} bg -- tailwind 배경 클래스 (variant 설정을 override함)
 * @param {'primary' | 'gradient'} variant -- 버튼 기본 배경 스타일, 기본 타입은 primary입니다.
 * @param {boolean} disabled -- 버튼 비활성화 여부
 * @param {function} onClick -- 버튼 클릭 시 실행될 함수

 *
 * @example
 * <Button text="Vlock 쌓으러 가기" />
 * <Button text="Vlock 쌓으러 가기" variant="gradient" />
 * <Button text="Vlock 쌓으러 가기" bg="bg-red-400" />
 *
 * @author 김진효
 * **/

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: 'button' | 'submit';
  bg?: string;
  variant?: 'primary' | 'gradient';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

// variant별 기본 배경 (bg 넘기면 무시됨)
const VARIANT_BG: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-primary-color',
  gradient: 'bg-gradient-color-hover',
};

const Button = ({ text, type = 'button', bg, variant = 'primary', disabled, className, onClick }: ButtonProps) => {
  const backgroundClass = bg ?? VARIANT_BG[variant]; // bg 있으면 최우선, 없으면 variant 사용

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        't2 max-w-[500px] w-full h-[64px] flex justify-center items-center text-base-color-6 rounded-[5px] cursor-pointer',
        backgroundClass,
        disabled && 'cursor-not-allowed',
        className,
      )}>
      {text}
    </button>
  );
};

export default Button;
