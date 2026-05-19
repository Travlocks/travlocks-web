import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { FormFields } from '../types/schema';
import type { StepProps } from './SignupView';
import Input from '@/shared/components/Form/Input';
import DualButton from '@/shared/components/Button/DualButton';

import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x.svg?react';

const ERRORS = [
  { id: 1, error: '최소 8자 이상' },
  {
    id: 2,
    error: '영문 + 숫자 포함',
  },
];

const Password = ({ onPrev, onNext }: StepProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors, dirtyFields },
  } = useFormContext<FormFields>();

  const password = watch('passwordGroup.password') || '';
  const passwordCheck = watch('passwordGroup.passwordCheck') || '';

  const isLengthValid = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isCombinationValid = hasLetter && hasNumber;

  return (
    <section className="flex flex-col gap-[16px]">
      <form>
        <div className="flex flex-col gap-[8px]">
          {/* 비밀번호 입력 */}
          <Input
            register={register('passwordGroup.password')}
            type="password"
            label="left"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="new-password"
          />

          {/* 비밀번호 유효성 검사 */}
          {ERRORS.map((error) => (
            <div
              key={error.id}
              className={clsx(
                'flex gap-[10px] items-center b4 font-[500] ml-[15px]',
                !dirtyFields.passwordGroup?.password && 'text-base-color-2',
                dirtyFields.passwordGroup?.password &&
                  ((error.id === 1 ? isLengthValid : isCombinationValid) ? 'text-positive' : 'text-negative'),
              )}>
              <div className="size-[19px] flex items-center justify-center">
                {!dirtyFields.passwordGroup?.password && <CheckIcon />}
                {dirtyFields.passwordGroup?.password &&
                  ((error.id === 1 ? isLengthValid : isCombinationValid) ? (
                    <CheckIcon />
                  ) : (
                    <XIcon className="object-cover" />
                  ))}
              </div>

              <p>{error.error}</p>
            </div>
          ))}

          <div className="relative">
            {/* 비밀번호 재입력 */}
            <Input
              register={register('passwordGroup.passwordCheck')}
              type="password"
              label="left"
              placeholder="비밀번호를 확인해주세요."
              autoComplete="new-password"
              error={!!errors.passwordGroup?.passwordCheck?.message}
            />

            {/* 비밀번호 재입력 유효성 검사 */}
            {errors.passwordGroup?.passwordCheck?.message && (
              <div className="flex items-center justify-center gap-[10px] left-[15px] absolute top-[61px]">
                <div className="rounded-full bg-negative size-[17px] text-center text-[14px] font-[500] tracking-[-0.15px] text-white">
                  !
                </div>
                <p className="text-negative b3 font-[500]">{errors.passwordGroup?.passwordCheck.message}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-[28px]">
          <DualButton
            left={{
              text: '이전',
              variant: 'white',
              onClick: () => {
                onPrev();
                setValue('code', '');
              },
            }}
            right={{
              text: '다음',
              disabled:
                !password ||
                !passwordCheck ||
                !!errors.passwordGroup?.password ||
                !!errors.passwordGroup?.passwordCheck,
              onClick: onNext,
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
            className="mt-[60px]"
          />
        </div>
      </form>
    </section>
  );
};

export default Password;
