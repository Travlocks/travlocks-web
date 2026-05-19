import { useFormContext } from 'react-hook-form';

import type { StepProps } from './SignupView';
import type { FormFields } from '../types/schema';
import Input from '@/shared/components/Form/Input';
import DualButton from '@/shared/components/Button/DualButton';
import Alert from '@/shared/components/Form/Alert';
import useGetIsNicknameExists from '../hooks/queries/useGetIsNicknameExists';
import { useDebouncedInputProps } from '@/shared/hooks/useDebouncedInput';
import { useEffect } from 'react';

const Nickname = ({ onPrev, onNext }: StepProps) => {
  const {
    register,
    setError,
    clearErrors,
    trigger,
    setValue,
    formState: { errors },
  } = useFormContext<FormFields>();

  const { inputProps, debouncedValue, onSubmit, reset } = useDebouncedInputProps({
    submit: () => {
      if (!data?.data.exists) {
        onNext();
      }
    },
  });

  const { data } = useGetIsNicknameExists({ nickname: debouncedValue }); // 닉네임 중복 검사

  // 닉네임 입력 후 다음 클릭 시 중복 검사 실행
  const handleOnClickNext = () => {
    onSubmit();
  };

  useEffect(() => {
    const checkNickname = async () => {
      // 값 없으면 에러 지우고 종료
      if (!debouncedValue) {
        clearErrors('nickname');
        return;
      }

      setValue('nickname', debouncedValue);

      // 스키마 검증 (2자 이상 10자 이하)
      const isValid = await trigger('nickname');

      // 스키마 통과 후 중복 검사
      if (isValid && data) {
        if (data?.data.exists) {
          setError('nickname', {
            message: '이미 사용 중인 닉네임 입니다.',
          });
        } else {
          clearErrors('nickname');
        }
      }
    };

    checkNickname();
  }, [data, data?.data.exists, debouncedValue, setError, trigger, clearErrors, setValue]);

  return (
    <section className="flex flex-col gap-[16px]">
      <div className="relative">
        <Input
          register={register('nickname')}
          label="left"
          placeholder="닉네임 (한글, 영문 2자 이상 ~ 10자 이하)"
          error={!!errors.nickname?.message}
          hasCancel={true}
          onCancel={() => {
            reset();
            clearErrors('nickname');
          }}
          {...inputProps}
        />

        <div className="absolute top-[65px] w-full">
          {errors.nickname?.message && <Alert text={errors.nickname?.message} type="alert"></Alert>}
        </div>
      </div>

      <div className="mt-[175px]">
        <DualButton
          left={{
            text: '이전',
            variant: 'white',
            onClick: onPrev,
          }}
          right={{
            text: '다음',
            onClick: handleOnClickNext,
            disabled: !debouncedValue || !data || data?.data.exists || !!errors.nickname,
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

export default Nickname;
