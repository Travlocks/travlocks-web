import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { TravlocksWordmark } from '@/shared/components/TravlocksWordmark/TravlocksWordmark';
import { AppIcon } from '@/shared/ui/icon/AppIcon';

import SignupStepper from './SignupStepper';

interface SignupModalProps {
  steps: readonly { id: number; title: string }[];
  currentStep: number;
  stepTitle: string;
  stepDescription: string;
  children: ReactNode;
  footer?: ReactNode;
  showBackToLogin?: boolean;
}

const SignupModal = ({
  steps,
  currentStep,
  stepTitle,
  stepDescription,
  children,
  footer,
  showBackToLogin = false,
}: SignupModalProps) => {
  return (
    <div
      className={clsx(
        'flex w-full max-w-[790px] min-h-[866px] flex-col rounded-[30px] border border-base-color bg-base-color-6',
        'shadow-[0px_8px_10px_-5px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]',
      )}>
      <div className="flex flex-col items-center px-[80px] pt-[70px]">
        <TravlocksWordmark className="h-[67px] w-full max-w-[382px]" />
        <p className="t2 mt-[24px] text-center text-base-color-1">조립하는 즐거움, 나만의 여행 블록 쌓기</p>
        <div className="mt-[32px] w-full">
          <SignupStepper steps={steps} currentStep={currentStep} />
        </div>
      </div>

      <div className="mt-[52px] flex flex-1 flex-col px-[80px]">
        <div className="flex flex-col gap-2">
          <h2 className="h6 text-base-color-0">{stepTitle}</h2>
          <p className="b3 text-base-color-2">{stepDescription}</p>
        </div>

        <div className="mt-6 flex-1">{children}</div>

        {footer && <div className="mt-auto flex flex-col gap-4 pb-4 pt-8">{footer}</div>}
      </div>

      {showBackToLogin && (
        <Link
          to="/login"
          className="mb-10 flex items-center justify-center gap-2 px-[80px] py-5 text-base-color-1 transition-colors hover:text-base-color-0">
          <AppIcon name="arrow" size={20} className="rotate-180" fill="base-color-1" />
          <span className="h8 font-semibold">로그인으로 돌아가기</span>
        </Link>
      )}
    </div>
  );
};

export default SignupModal;
