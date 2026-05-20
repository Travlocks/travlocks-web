import { useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import type { StepProps } from './SignupView';
import type { FormFields } from '../types/schema';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import SignupStepActions from './SignupStepActions';
import useGetIsNicknameExists from '../hooks/queries/useGetIsNicknameExists';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';

const NICKNAME_FIELD_CLASS = 'rounded-[5px]! h-[53px]! border-base-color! text-[18px]! placeholder:text-base-color-3';
const DUPLICATE_MESSAGE = '이미 사용 중인 닉네임 입니다.';

const Nickname = ({ onPrev, onNext, setStepFooter }: StepProps) => {
  const {
    register,
    setError,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<FormFields>();

  const { inputProps, debouncedValue, reset } = useDebouncedInputProps({
    submit: () => {},
  });

  const { data, isFetching } = useGetIsNicknameExists({
    nickname: debouncedValue,
  });

  const hasNicknameError = Boolean(errors.nickname?.message);
  const nicknameValue = inputProps.value ?? '';
  const nicknameExists = data?.data?.exists;

  const canProceed =
    Boolean(debouncedValue) &&
    debouncedValue.length >= 2 &&
    debouncedValue.length <= 10 &&
    !hasNicknameError &&
    !isFetching &&
    nicknameExists === false;

  const handleNext = useCallback(async () => {
    if (!debouncedValue) return;

    setValue('nickname', debouncedValue);
    const isValid = await trigger('nickname');
    if (!isValid) return;

    if (nicknameExists === true) {
      setError('nickname', { message: DUPLICATE_MESSAGE });
      return;
    }

    onNext();
  }, [debouncedValue, setValue, trigger, nicknameExists, setError, onNext]);

  useEffect(() => {
    if (!debouncedValue) {
      clearErrors('nickname');
      return;
    }

    setValue('nickname', debouncedValue, { shouldValidate: false });
    void trigger('nickname');
  }, [debouncedValue, setValue, trigger, clearErrors]);

  useEffect(() => {
    if (!debouncedValue || nicknameExists === undefined) return;

    if (nicknameExists) {
      setError('nickname', { message: DUPLICATE_MESSAGE });
      return;
    }

    void trigger('nickname');
  }, [nicknameExists, debouncedValue, setError, trigger]);

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
    <section className="flex flex-col gap-5">
      <Input
        register={register('nickname')}
        label="left"
        placeholder="닉네임을 입력해주세요"
        width={630}
        error={hasNicknameError}
        hasCancel
        className={NICKNAME_FIELD_CLASS}
        onCancel={() => {
          reset();
          clearErrors('nickname');
        }}
        {...inputProps}
      />

      {hasNicknameError && nicknameValue && (
        <Alert text={errors.nickname?.message} type="alert" compact className="max-w-none" />
      )}
    </section>
  );
};

export default Nickname;
