import { useFormContext } from 'react-hook-form';
import { useEffect, useState } from 'react';

import type { FormFields } from '../types/schema';
import type { StepProps } from './SignupView';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import DualButton from '@/shared/components/Button/DualButton';
import EmailModal from './EmailModal';
import usePostEmailVerification from '../hooks/mutations/usePostEmailVerification';
import usePostEmailVerificationConfirm from '../hooks/mutations/usePostEmailVerificationConfirm';
import usePostEmailVerificationResend from '../hooks/mutations/usePostEmailVerificationResend';

const Email = ({ setLevel }: StepProps) => {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<FormFields>();

  const [step, setStep] = useState<number>(1); // step 1: 이메일, step2: 인증번호
  const [timeLeft, setTimeLeft] = useState<number>(300); // 5분 타이머
  const [timerKey, setTimerKey] = useState(0);

  const [hasTriedVerify, setHasTriedVerify] = useState(false); // 인증 완료 눌렀는지
  const [hasRetry, setHasRetry] = useState(false);
  const [hasTriedResend, setHasTriedResend] = useState(false); // 재전송 눌렀는지
  const [showModal, setShowModal] = useState(false);

  const { mutate: mutatePostEmailVerification } = usePostEmailVerification(); // 이메일 인증 코드 발송
  const { mutate: mutatePostEmailVerificationConfirm } = usePostEmailVerificationConfirm(); // 이메일 인증 코드 확인
  const { mutate: mutatePostEmailVerificationResned } = usePostEmailVerificationResend(); // 이메일 인증 코드 재발송

  const email = watch('email');
  const code = watch('code');
  const verificationId = watch('verificationId');

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;

    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimer = () => {
    setTimeLeft(300); // 시간 초기화
    setTimerKey((prev) => prev + 1); // 타이머 초기화
    setValue('code', ''); // 입력란 비우기
  };

  // 인증 메일 재전송
  const handleResend = () => {
    setHasTriedResend(true);
    setHasRetry(false);
    setHasTriedVerify(false);

    mutatePostEmailVerificationResned({ verificationId });

    handleTimer();
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
  }, [step, timerKey]);

  return (
    <section className="flex flex-col gap-[16px]">
      <p className="text-base-color-2 b3 mt-[8px]">로그인에 사용할 이메일을 입력해 주세요</p>

      <div className="mb-[165px] relative w-full flex-1">
        {/* 이메일 입력 */}
        <Input
          register={register('email')}
          type="email"
          label="left"
          placeholder="your@email.com"
          width={500}
          disabled={step === 2}
        />

        <div className="absolute top-[61px] w-full">
          {/* 이메일 유효성 검사 */}
          {errors.email?.message && <Alert text={errors.email?.message} type="alert"></Alert>}

          {step === 2 && (
            <div className="flex flex-col gap-[8px] justify-between">
              {/* 가장 먼저 이메일 인증 요청 */}
              {!hasRetry && !hasTriedResend && (
                <Alert text={'인증 메일 발송 완료'} type="check" onClick={handleResend} />
              )}

              {/* 인증 메일 발송 완료 후 재전송 요청 */}
              {!hasRetry && hasTriedResend && (
                <Alert text="인증 메일 재발송 완료!" type="check" onClick={handleResend} />
              )}

              <div className="relative">
                {/* 인증코드 */}
                <Input
                  register={register('code', {
                    onChange: () => {
                      setHasTriedVerify(false);
                    },
                  })}
                  label="left"
                  placeholder="인증코드를 입력하세요"
                  maxLength={6}
                  error={hasTriedVerify}
                />

                {/* 타이머 */}
                {step === 2 && (
                  <p className="absolute top-1/2 -translate-y-1/2 right-[24px] text-negative text-[16px] font-[400] leading-[15px]">
                    {formatTime(timeLeft)}
                  </p>
                )}
              </div>

              {/* 인증코드 틀렸을 때 */}
              {hasTriedVerify && (
                <div>
                  <Alert
                    text={
                      <div className="flex justify-between flex-1">
                        <p>인증코드가 올바르지 않습니다</p>
                        <p onClick={handleResend} className="underline cursor-pointer">
                          재전송
                        </p>
                      </div>
                    }
                    type="alert"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {step === 2 && (
        <p
          onClick={() => setShowModal(true)}
          className="underline text-base-color-1 underline-offset-3 b4 self-end cursor-pointer absolute top-[352px]">
          이메일을 받지 못하셨나요?
        </p>
      )}

      {/* 처음 진입 시 이메일 입력할 때 버튼 (이전/다음) */}
      {step === 1 && (
        <>
          <DualButton
            left={{
              text: '이전',
              variant: 'white',
              onClick: () => setLevel(0),
              className: 'border-base-color!',
            }}
            right={{
              text: '다음',
              disabled: !email || !!errors.email,
              onClick: () => {
                mutatePostEmailVerification(
                  { email },
                  {
                    onSuccess: (res) => {
                      const verificationId = res.data.verificationId;
                      setValue('verificationId', verificationId);
                    },
                  },
                );
                setStep(2);
              },
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
          />
        </>
      )}

      {/* 이메일 인증 번호 발송 후 나오는 버튼 (이전,인증 완료) */}
      {step === 2 && (
        <>
          <DualButton
            left={{
              text: '이전',
              variant: 'white',
              onClick: () => {
                setStep(1);
                setHasTriedResend(false);
                handleTimer();
              },
            }}
            right={{
              text: '인증 완료',
              disabled: hasTriedVerify || code?.length < 6,
              type: 'button',
              onClick: () => {
                setHasTriedVerify(true);
                setHasRetry(true);

                mutatePostEmailVerificationConfirm(
                  { verificationId, code },
                  {
                    onSuccess: () => {
                      setLevel(2);
                    },
                    onError: (error) => {
                      // 인증 실패한 경우
                      console.log(error);
                    },
                  },
                );
              },
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
          />
        </>
      )}

      {showModal && <EmailModal onClick={() => setShowModal(false)} handleTimer={handleTimer} />}
    </section>
  );
};

export default Email;
