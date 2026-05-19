import clsx from 'clsx';

import CheckIcon from '@assets/icon-check-password.svg?react';

interface SignupStepperProps {
  steps: readonly { id: number; title: string }[];
  currentStep: number;
}

const SignupStepper = ({ steps, currentStep }: SignupStepperProps) => {
  const progressRatio = steps.length > 1 ? currentStep / (steps.length - 1) : 0;

  return (
    <nav aria-label="회원가입 진행 단계" className="w-full">
      <div className="relative flex justify-between">
        <div
          aria-hidden
          className="pointer-events-none absolute top-[15px] right-[15px] left-[15px] h-[2px] rounded-[5px] bg-base-color"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[15px] left-[15px] h-[2px] rounded-[5px] bg-primary-color transition-[width] duration-300"
          style={{ width: `calc((100% - 30px) * ${progressRatio})` }}
        />

        {steps.map(({ id, title }, index) => {
          const isComplete = index < currentStep;
          const isActive = index === currentStep;

          return (
            <div key={id} className="relative z-10 flex w-[30px] flex-col items-center gap-2">
              <div
                className={clsx(
                  'flex size-[30px] items-center justify-center rounded-full border-2 text-white',
                  (isComplete || isActive) && 'border-primary-color bg-primary-color',
                  !isComplete && !isActive && 'border-base-color bg-base-color',
                )}>
                {isComplete ? (
                  <CheckIcon className="size-[18px] text-white" />
                ) : (
                  <span className={clsx('font-medium', isActive ? 'text-[20px]' : 'text-[18px]')}>{index + 1}</span>
                )}
              </div>
              <span
                className={clsx(
                  'absolute top-[38px] w-max max-w-[120px] text-center text-[16px] font-medium leading-normal',
                  isActive && 'text-primary-color',
                  !isActive && 'text-base-color-3',
                )}>
                {title}
              </span>
            </div>
          );
        })}
      </div>

      <div className="h-[38px]" aria-hidden />
    </nav>
  );
};

export default SignupStepper;
