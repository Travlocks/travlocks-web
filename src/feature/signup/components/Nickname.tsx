import { useFormContext } from 'react-hook-form';

import type { StepProps } from './SignupView';
import type { FormFields } from '../types/schema';
import Input from '@/shared/components/Form/Input';
import DualButton from '@/shared/components/Button/DualButton';
import Alert from '@/shared/components/Form/Alert';

const Nickname = ({ setLevel }: StepProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const nickname = watch('nickname', '');

  return (
    <section className="flex flex-col gap-[16px]">
      <p className="text-base-color-2 b3 mt-[8px]">트래블록스에서 사용할 닉네임을 입력해주세요</p>

      <div className="relative">
        <Input
          register={register('nickname')}
          label="left"
          placeholder="닉네임 (한글, 영문 2자 이상 ~ 10자 이하)"
          error={!!errors.nickname?.message}
          hasCancel={true}
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
            onClick: () => setLevel(2),
          }}
          right={{
            text: '다음',
            onClick: () => setLevel(4),
            disabled: !nickname || !!errors.nickname,
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
