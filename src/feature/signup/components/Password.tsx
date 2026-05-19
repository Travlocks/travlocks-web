import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { FormFields } from '../types/schema';
import type { StepProps } from './SignupView';
import Input from '@/shared/components/Form/Input';
import SignupStepActions from './SignupStepActions';

import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x.svg?react';

const PASSWORD_FIELD_CLASS =
  'rounded-[5px]! h-[53px]! border-base-color! pl-[49px]! text-[18px]! placeholder:text-base-color-3';

const VALIDATION_RULES = [
  { id: 1, label: '최소 8자 이상' },
  { id: 2, label: '영문 + 숫자 포함' },
] as const;

const Password = ({ onPrev, onNext, setStepFooter }: StepProps) => {
  const {
    register,
    watch,
    trigger,
    formState: { errors, dirtyFields },
  } = useFormContext<FormFields>();

  const password = watch('passwordGroup.password') || '';
  const passwordCheck = watch('passwordGroup.passwordCheck') || '';

  const isLengthValid = password.length >= 8;
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isCombinationValid = hasLetter && hasNumber;
  const isPasswordValid = isLengthValid && isCombinationValid;
  const isMatch = password.length > 0 && password === passwordCheck;

  const isPasswordDirty = Boolean(dirtyFields.passwordGroup?.password);
  const isConfirmDirty = Boolean(dirtyFields.passwordGroup?.passwordCheck);
  const hasPasswordError = isPasswordDirty && !isPasswordValid;
  const hasMismatchError = Boolean(errors.passwordGroup?.passwordCheck?.message);

  const canProceed =
    Boolean(password) &&
    Boolean(passwordCheck) &&
    isPasswordValid &&
    isMatch &&
    !errors.passwordGroup?.password &&
    !errors.passwordGroup?.passwordCheck;

  const handleNext = useCallback(async () => {
    const isValid = await trigger(['passwordGroup.password', 'passwordGroup.passwordCheck']);
    if (!isValid) return;
    onNext();
  }, [trigger, onNext]);

  useEffect(() => {
    if (!setStepFooter) return;

    setStepFooter(
      <SignupStepActions
        left={{ text: '이전', onClick: onPrev }}
        right={{
          text: '다음',
          disabled: !canProceed,
          onClick: handleNext,
        }}
      />,
    );

    return () => setStepFooter(null);
  }, [canProceed, setStepFooter, onPrev, handleNext]);

  return (
    <section className="flex flex-col gap-[10px]">
      <Input
        register={register('passwordGroup.password')}
        type="password"
        label="left"
        placeholder="비밀번호를 입력해주세요."
        autoComplete="new-password"
        width={630}
        error={hasPasswordError}
        className={PASSWORD_FIELD_CLASS}
      />

      <div className="flex flex-col gap-[9px] pl-5">
        {VALIDATION_RULES.map((rule) => {
          const isValid = rule.id === 1 ? isLengthValid : isCombinationValid;

          return (
            <div
              key={rule.id}
              className={clsx(
                'flex items-center gap-3 text-[18px] font-medium',
                !isPasswordDirty && 'text-base-color-2',
                isPasswordDirty && (isValid ? 'text-positive' : 'text-negative'),
              )}>
              <span className="flex size-[19px] shrink-0 items-center justify-center">
                {!isPasswordDirty && <CheckIcon />}
                {isPasswordDirty && (isValid ? <CheckIcon /> : <XIcon className="object-cover" />)}
              </span>
              <p>{rule.label}</p>
            </div>
          );
        })}
      </div>

      <div className="relative mt-[10px]">
        <Input
          register={register('passwordGroup.passwordCheck')}
          type="password"
          label="left"
          placeholder="비밀번호를 입력해주세요."
          autoComplete="new-password"
          width={630}
          error={hasMismatchError}
          className={PASSWORD_FIELD_CLASS}
        />

        {hasMismatchError && isConfirmDirty && (
          <div className="mt-3 flex items-center gap-3 pl-5">
            <span className="flex size-[17px] shrink-0 items-center justify-center rounded-[10px] bg-negative text-[14px] font-medium tracking-[-0.15px] text-white">
              !
            </span>
            <p className="text-[16px] font-medium text-negative">{errors.passwordGroup?.passwordCheck?.message}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Password;
