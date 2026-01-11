import type { UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';

import EmailIcon from '@assets/icon-email.svg?react';
import PasswordIcon from '@assets/icon-password.svg?react';
import EyeClosed from '@assets/icon-eye-closed.svg?react';
import EyeOpen from '@assets/icon-eye-open.svg?react';
import { IconBase } from '@/shared/ui/icon/IconBase';

/**
 * react-hook-form의 register를 기반으로 동작하는 공통 Input 컴포넌트입니다.
 *
 * HTML <input>의 기본 속성들 (placeholder, disabled, type 등)을
 * 그대로 전달하여 사용할 수 있습니다.
 *
 * @param {UseFormRegisterReturn} register -- react-hook-form의 register 반환값
 * @param {'top' | 'left'} label -- 라벨 위치
 * @param {number} width -- input의 max-width. 전달하지 않으면 label 타입에 따라 기본 값 적용됩니다.
 *
 * @example
 * <Input register={register('email')} type="email" label="top" />
 * <Input register={register('nickname')} label="left" placeholder="닉네임 (한글, 영문 2자 이상 ~ 10자 이하)" />
 *
 * @author 김진효
 * **/

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegisterReturn;
  label: 'top' | 'left';
  width?: number;
  error?: boolean;
}

const IconList = {
  email: EmailIcon,
  password: PasswordIcon,
} as const;

const Input = ({ register, width, label, error, type, ...rest }: InputProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type; // 비밀번호 표시 여부에 따라 input type 결정

  const Icon = type ? IconList[type as keyof typeof IconList] : undefined; // 이메일, 비밀번호 아이콘
  const EyeIcon = showPassword ? EyeOpen : EyeClosed; // 비밀번호 표시 토글 아이콘

  return (
    <div
      className={clsx('group relative w-full', !width && (label === 'top' ? 'max-w-[500px]' : 'max-w-[440px]'))}
      style={{ maxWidth: width }}>
      {/* 상단 라벨 (아이콘 + 텍스트) */}
      {label === 'top' && Icon && (
        <div className="flex gap-[3px] justify-center items-center px-[5px] py-[3px] absolute left-[22px] top-[-12px] bg-base-color-6">
          <Icon className="text-base-color-1 group-focus-within:text-primary-color" />
          <p className="b2 text-base-color-1 group-focus-within:text-primary-color">
            {isPassword ? '비밀번호' : '이메일'}
          </p>
        </div>
      )}

      {/* 좌측 라벨 (아이콘) */}
      {label === 'left' && Icon && (
        <Icon className="absolute top-1/2 -translate-y-1/2 left-[14px] text-base-color-1 size-[20px] object-cover" />
      )}

      {/* 실제 input 영역 */}
      <input
        type={inputType}
        {...register}
        {...rest}
        className={clsx(
          `b1 w-full py-[16px] rounded-[10px] border border-base-color-1 bg-base-color-6 placeholder:font-"Pretendard" placeholder:text-base-color-1 placeholder:tracking-[-0.15px] outline-none`,
          'disabled:bg-base-color-4 disabled:cursor-not-allowed disabled:border-[rgba(0,0,0,0.1)]',
          error && 'border-negative',
          label === 'top' ? 'px-[18px] h-[60px] focus:border-primary-color' : 'h-[55px]',
          label === 'left' && Icon ? 'px-[49px]' : 'px-[18px]',
          rest.disabled && 'bg-base-color-4! border-base-color-3! text-[#9CA3AF]!',
        )}
      />

      {/* 비밀번호 표시 토글 */}
      {isPassword && (
        <button
          type="button"
          disabled={rest.disabled}
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute top-1/2 -translate-y-1/2 right-[15px] cursor-pointer">
          <IconBase icon={EyeIcon} width={20} height={20} />
        </button>
      )}
    </div>
  );
};

export default Input;
