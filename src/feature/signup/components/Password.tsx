import { useFormContext } from 'react-hook-form';
import type { FormFields } from '../types/schema';
import Input from '@/shared/components/Form/Input';
import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x-password.svg?react';
import clsx from 'clsx';
import DualButton from '@/shared/components/Button/DualButton';
import type { StepProps } from './Modal';

const Password = ({ setLevel }: StepProps) => {
  const {
    register,
    watch,
    formState: { errors, dirtyFields },
  } = useFormContext<FormFields>();

  const password = watch('password');
  const passwordCheck = watch('passwordCheck');

  const isLengthValid = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isCombinationValid = hasLetter && hasNumber;

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-1 b1 mt-[3px]">안전한 비밀번호를 만들어주세요</p>

      <div className="flex flex-col gap-[10px]">
        <Input register={register('password')} type="password" label="left" placeholder="비밀번호를 입력해주세요." />
        <div
          className={clsx(
            'flex gap-[10px] items-center h3 font-[500] ml-[15px]',
            !dirtyFields.password && 'text-base-color-1',
            dirtyFields.password && (isLengthValid ? 'text-positive' : 'text-negative'),
          )}>
          {!dirtyFields.password && <CheckIcon />}
          {dirtyFields.password && (isLengthValid ? <CheckIcon /> : <XIcon />)}
          <p>최소 8자 이상</p>
        </div>

        <div
          className={clsx(
            'flex gap-[10px] items-center h3 font-[500] ml-[15px]',
            !dirtyFields.password && 'text-base-color-1',
            dirtyFields.password && (isCombinationValid ? 'text-positive' : 'text-negative'),
          )}>
          {!dirtyFields.password && <CheckIcon />}
          {dirtyFields.password && (isCombinationValid ? <CheckIcon /> : <XIcon />)}
          <p>영문 + 숫자 포함</p>
        </div>

        <div className="relative">
          <Input
            register={register('passwordCheck')}
            type="password"
            label="left"
            placeholder="비밀번호를 확인해주세요."
            error={!!errors.passwordCheck?.message}
          />
          {errors.passwordCheck?.message && (
            <p className="text-negative h3 font-[500] left-[15px] absolute top-[65px]">비밀번호가 일치하지 않습니다</p>
          )}
        </div>
      </div>

      <div className="mt-[28px]">
        <DualButton
          left={{
            text: '이전',
            variant: 'white',
            onClick: () => setLevel(1),
          }}
          right={{
            text: '다음',
            disabled: !!errors.passwordCheck || password.length === 0 || passwordCheck.length === 0,
            onClick: () => setLevel(3),
          }}
          width={215}
          height={64}
          gap={10}
          textSize={20}
        />
      </div>
    </section>
  );
};

export default Password;
