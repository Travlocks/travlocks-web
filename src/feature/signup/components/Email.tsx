import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import clsx from 'clsx';

import type { FormFields } from '../types/schema';
import type { StepProps } from './SignupView';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import SignupStepActions from './SignupStepActions';
import EmailModal from './EmailModal';

import usePostEmailVerification from '../hooks/mutations/usePostEmailVerification';
import usePostEmailVerificationConfirm from '../hooks/mutations/usePostEmailVerificationConfirm';
import usePostEmailVerificationResend from '../hooks/mutations/usePostEmailVerificationResend';
import handleMutationSuccess from '../utils/handleMutationSuccess';
import handleMutationError from '../utils/handleMutationError';
import { isMockEmailApi } from '../utils/devSignupPreview';

type SendStatus = 'idle' | 'sent' | 'resent';

const EMAIL_FIELD_CLASS =
  'rounded-[5px]! h-[53px]! border-base-color! pl-[49px]! text-[18px]! placeholder:text-base-color-3';

const Email = ({ onPrev, onNext, setStepFooter }: StepProps) => {
  const {
    register,
    watch,
    setValue,
    setError,
    clearErrors,
    trigger,
    formState: { errors },
  } = useFormContext<FormFields>();

  const [phase, setPhase] = useState<1 | 2>(1);
  const [timeLeft, setTimeLeft] = useState(300);
  const [showTimer, setShowTimer] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [sendStatus, setSendStatus] = useState<SendStatus>('idle');
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: mutatePostEmailVerification } = usePostEmailVerification();
  const { mutate: mutatePostEmailVerificationConfirm } = usePostEmailVerificationConfirm();
  const { mutate: mutatePostEmailVerificationResend } = usePostEmailVerificationResend();

  const email = watch('email');
  const code = watch('code');
  const verificationId = watch('verificationId');

  const hasEmailError = Boolean(errors.email?.message);
  const hasCodeError = Boolean(errors.code?.message);
  const isEmailValid = Boolean(email) && !hasEmailError;

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = useCallback(() => {
    setTimeLeft(300);
    setTimerKey((prev) => prev + 1);
    setValue('code', '');
    clearErrors('code');
  }, [setValue, clearErrors]);

  const handleSubmitEmail = useCallback(async () => {
    const isValid = await trigger('email');
    if (!isValid) return;

    if (isMockEmailApi()) {
      setValue('verificationId', 'dev-verification-id');
      setPhase(2);
      setSendStatus('sent');
      setShowTimer(true);
      resetTimer();
      return;
    }

    setIsSubmitting(true);
    mutatePostEmailVerification(
      { email },
      {
        onSuccess: (res) => {
          const result = handleMutationSuccess(res, 'send');
          if (result?.verificationId) {
            setValue('verificationId', result.verificationId);
            setPhase(2);
            setSendStatus('sent');
            setShowTimer(true);
            resetTimer();
          }
        },
        onError: (error) => {
          const message = handleMutationError(error);
          if (message) {
            setError('email', { message });
          }
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  }, [email, trigger, mutatePostEmailVerification, setValue, setError, resetTimer]);

  const handleResend = () => {
    if (isSubmitting || !verificationId) return;

    clearErrors('code');
    setIsSubmitting(true);

    mutatePostEmailVerificationResend(
      { verificationId },
      {
        onSuccess: (res) => {
          if (res.isSuccess) {
            setSendStatus('resent');
            resetTimer();
            setShowTimer(true);
          }
        },
        onError: (error) => {
          const message = handleMutationError(error);
          if (message) {
            setError('code', { message });
          }
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  };

  const handleConfirmCode = useCallback(() => {
    if (!code || code.length < 6) return;

    if (isMockEmailApi()) {
      setValue('signupToken', 'dev-signup-token');
      onNext();
      return;
    }

    setIsSubmitting(true);
    mutatePostEmailVerificationConfirm(
      { verificationId, code },
      {
        onSuccess: (res) => {
          const result = handleMutationSuccess(res, 'confirm');
          if (result?.signupToken) {
            setValue('signupToken', result.signupToken);
            onNext();
          }
        },
        onError: (error) => {
          const message = handleMutationError(error);
          if (message) {
            setError('code', { message });
          }
        },
        onSettled: () => setIsSubmitting(false),
      },
    );
  }, [code, verificationId, mutatePostEmailVerificationConfirm, setValue, setError, onNext]);

  const handlePrev = useCallback(() => {
    if (phase === 2) {
      setPhase(1);
      setSendStatus('idle');
      setShowTimer(false);
      clearErrors('code');
      setValue('code', '');
      return;
    }

    onPrev();
    setValue('email', '');
    clearErrors('email');
  }, [phase, onPrev, setValue, clearErrors]);

  useEffect(() => {
    if (phase !== 2 || !showTimer) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setError('code', { message: '인증 시간이 만료되었습니다. 다시 시도해주세요.' });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [phase, showTimer, timerKey, setError]);

  useEffect(() => {
    if (!setStepFooter) return;

    const footer = (
      <SignupStepActions
        left={{ text: '이전', onClick: handlePrev }}
        right={{
          text: '다음',
          disabled:
            phase === 1
              ? !isEmailValid || isSubmitting
              : !code || code.length < 6 || hasCodeError || isSubmitting || timeLeft === 0,
          onClick: phase === 1 ? handleSubmitEmail : handleConfirmCode,
        }}
      />
    );

    setStepFooter(footer);
    return () => setStepFooter(null);
  }, [
    phase,
    email,
    code,
    isEmailValid,
    hasCodeError,
    isSubmitting,
    timeLeft,
    setStepFooter,
    errors.email,
    errors.code,
    handleConfirmCode,
    handlePrev,
    handleSubmitEmail,
  ]);

  const sendAlertMessage = sendStatus === 'resent' ? '인증 메일 재발송 완료!' : '인증 메일 발송 완료';

  return (
    <section className="flex flex-col gap-5">
      <Input
        register={register('email', {
          onChange: () => clearErrors('email'),
        })}
        type="email"
        label="left"
        placeholder="your@email.com"
        width={630}
        disabled={phase === 2}
        error={hasEmailError}
        className={EMAIL_FIELD_CLASS}
      />

      {phase === 1 && hasEmailError && (
        <Alert text={errors.email?.message} type="alert" compact className="max-w-none" />
      )}

      {phase === 2 && (
        <>
          {sendStatus !== 'idle' && (
            <Alert text={sendAlertMessage} type="check" compact className="max-w-none" onClick={handleResend} />
          )}

          <div className="relative w-full">
            <input
              {...register('code', {
                onChange: () => clearErrors('code'),
              })}
              type="text"
              inputMode="numeric"
              maxLength={6}
              placeholder="인증코드를 입력하세요"
              className={clsx(
                'b4 w-full rounded-[5px] border bg-base-color-6 px-4 py-4 pr-16 text-[18px] text-base-color-0 outline-none placeholder:text-base-color-3',
                hasCodeError ? 'border-negative' : 'border-base-color',
              )}
            />
            {showTimer && timeLeft > 0 && (
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[16px] text-negative">
                {formatTime(timeLeft)}
              </span>
            )}
          </div>

          {hasCodeError && (
            <Alert text={errors.code?.message} type="alert" compact className="max-w-none" onClick={handleResend} />
          )}

          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="b6 ml-auto text-base-color-1 underline underline-offset-2">
            이메일을 받지 못하셨나요?
          </button>
        </>
      )}

      {showModal && (
        <EmailModal
          onClose={() => setShowModal(false)}
          onReturn={() => {
            setShowModal(false);
            resetTimer();
            setShowTimer(true);
          }}
        />
      )}
    </section>
  );
};

export default Email;
