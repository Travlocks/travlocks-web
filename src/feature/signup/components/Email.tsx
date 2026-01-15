import { useFormContext } from 'react-hook-form';
import type { FormFields } from '../types/schema';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import DualButton from '@/shared/components/Button/DualButton';
import { useEffect, useState } from 'react';
import type { StepProps } from './Modal';

const Email = ({ setLevel }: StepProps) => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<FormFields>();

  const [step, setStep] = useState<number>(1);
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5분
  const [isSubmitted, setIsSubmitted] = useState(false);

  const email = watch('email');
  const code = watch('code');

  const isCodeError = code !== '123123';

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;

    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    if (step !== 2) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-1 b1 mt-[3px]">로그인에 사용할 이메일을 입력해 주세요</p>

      <div className="mb-[150px] relative w-full">
        <Input
          register={register('email')}
          type="email"
          label="left"
          placeholder="your@eamil.com"
          width={500}
          disabled={step === 2}
        />

        <div className="absolute top-[65px] w-full">
          {errors.email?.message && <Alert text={errors.email?.message} type="alert"></Alert>}

          {step === 2 && (
            <div className="flex flex-col gap-[10px]">
              {!isSubmitted && !isCodeError && <Alert text={'인증 메일 발송 완료'} type="check" />}

              <div className="relative">
                <Input
                  register={register('code')}
                  label="left"
                  placeholder="인증코드를 입력하세요"
                  maxLength={6}
                  error={isSubmitted && isCodeError}
                  onChange={() => {
                    if (isSubmitted) setIsSubmitted(false);
                  }}
                />
                {step === 2 && (
                  <p className="absolute top-1/2 -translate-y-1/2 right-[15px] text-negative text-[16px] font-[400] leading-[15px]">
                    {formatTime(timeLeft)}
                  </p>
                )}
              </div>

              {isSubmitted && isCodeError && (
                <div>
                  <Alert
                    text={
                      <div className="flex justify-between flex-1">
                        <p>인증코드가 올바르지 않습니다</p>
                        <p className="underline cursor-pointer">재전송</p>
                      </div>
                    }
                    type="alert"
                  />
                </div>
              )}

              <p className="underline text-base-color-2 b1 self-end mt-[10px] cursor-pointer">
                이메일을 받지 못하셨나요?
              </p>
            </div>
          )}
        </div>
      </div>

      {step === 1 && (
        <>
          <DualButton
            left={{
              text: '이전',
              variant: 'white',
              onClick: () => setLevel(0),
            }}
            right={{
              text: '다음',
              disabled: !email || !!errors.email,
              onClick: () => setStep(2),
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
          />
        </>
      )}

      {step === 2 && (
        <>
          <DualButton
            left={{
              text: '이전',
              variant: 'white',
              onClick: () => setStep(1),
            }}
            right={{
              text: '인증 완료',
              disabled: !code || (isSubmitted && isCodeError),
              onClick: () => {
                setIsSubmitted(true);

                if (!isCodeError) {
                  setLevel(2);
                }
              },
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
          />
        </>
      )}
    </section>
  );
};

export default Email;
