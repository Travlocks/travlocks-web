import React, { useId } from 'react';
import clsx from 'clsx';
import type { UseFormRegisterReturn } from 'react-hook-form';
import { AppIcon } from '@shared/ui/icon/AppIcon';
import CancelIcon from '@assets/icon-cancel.svg?react';

/**
 * 트래블록스 공통 TextField 컴포넌트입니다.
 *
 * @param {string} label - 필드 상단에 표시될 라벨
 * @param {string} error - 에러 메시지. 존재할 경우 에러 스타일이 적용됩니다.
 * @param {string} helperText - 하단에 표시될 도움말 텍스트
 * @param {() => void} onClear - 우측 X 버튼 클릭 시 호출될 콜백
 * @param {UseFormRegisterReturn} register - react-hook-form의 register 반환값
 *
 * @example
 * <TextField
 *   label="닉네임"
 *   register={register('nickname')}
 *   error={errors.nickname?.message}
 *   onClear={() => setValue('nickname', '')}
 *   placeholder="닉네임을 입력해주세요"
 * />
 */
interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  onClear?: () => void;
  register?: UseFormRegisterReturn;
}

const TextField = ({ label, error, helperText, onClear, register, className, id, ...props }: TextFieldProps) => {
  const internalId = useId();
  const fieldId = id || internalId;

  return (
    <div className={clsx('flex flex-col gap-3 w-full', className)}>
      {label && (
        <label htmlFor={fieldId} className="t2 text-base-color-0">
          {label}
        </label>
      )}

      <div className="relative group w-full">
        <input
          id={fieldId}
          {...register}
          {...props}
          placeholder={props.placeholder || ' '}
          className={clsx(
            'peer w-full text-[18px] px-4 py-4.25 rounded-[5px] border outline-none transition-all',
            'placeholder-[#9CA3AF]', // 디자인 시스템에서 base-color 다시 확인
            error
              ? 'border-negative'
              : props.disabled
                ? 'border-base-color bg-base-color-4 cursor-not-allowed text-base-color-3'
                : 'border-base-color bg-base-color-6 focus:border-primary-color',
            'h-15',
            onClear && 'pr-12',
          )}
        />

        {onClear && !props.disabled && (
          <button
            type="button"
            onClick={onClear}
            className="peer-placeholder-shown:hidden absolute right-4.5 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer transition-opacity hover:opacity-70"
            aria-label="입력 내용 지우기">
            <CancelIcon className="w-4.25 h-4.25" />
          </button>
        )}
      </div>

      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-[5px] bg-negative-alertbox-fill">
          <AppIcon name="alert" className="w-4.25 h-4.25 shrink-0" color="#fd7565" />
          <span className="b2 text-negative">{error}</span>
        </div>
      )}

      {!error && helperText && <p className="b2 text-base-color-1 px-1">{helperText}</p>}
    </div>
  );
};

export default TextField;
