import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { FormProvider, useForm, useFormContext } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';

import { signupSchema, onboardingSchema, type FormFields, type OnboardingFormFields } from '../types/schema';
import { SIGNUP_STEP_DESCRIPTIONS } from '../constants/stepMeta';
import Terms from './Terms';
import Email from './Email';
import Password from './Password';
import Nickname from './Nickname';
import Preference from './Preference';
import SignupModal from './SignupModal';
import CompleteModal from './CompleteModal';
import Button from '@/shared/components/Button/Button';
import { isDevCompletePreview, readDevSignupStep, seedDevSignupCompleteMock } from '../utils/devSignupPreview';

// ─── 공용 타입 ───

export type SignupMode = 'signup' | 'onboarding';

export interface StepProps {
  onPrev: () => void;
  onNext: () => void;
  mode: SignupMode;
  setStepFooter?: (footer: ReactNode | null) => void;
  setStepDescription?: (description: string) => void;
}

// ─── 단계 정의 ───

type StepDef = {
  readonly id: number;
  readonly title: string;
  readonly Component: React.ComponentType<StepProps>;
};

const SIGNUP_STEPS: readonly StepDef[] = [
  { id: 0, title: '약관동의', Component: Terms },
  { id: 1, title: '이메일 인증', Component: Email },
  { id: 2, title: '비밀번호 설정', Component: Password },
  { id: 3, title: '닉네임 설정', Component: Nickname },
  { id: 4, title: '개인 취향 탐색', Component: Preference },
] as const;

const ONBOARDING_STEPS: readonly StepDef[] = [
  { id: 0, title: '약관동의', Component: Terms },
  { id: 1, title: '닉네임 설정', Component: Nickname },
  { id: 2, title: '개인 취향 탐색', Component: Preference },
] as const;

// ─── 폼 기본값 ───

const SIGNUP_DEFAULTS: Partial<FormFields> = {
  email: '',
  code: undefined,
  passwordGroup: {
    password: '',
    passwordCheck: '',
  },
  nickname: '',
  consents: [
    { policyId: 1, agreed: false },
    { policyId: 2, agreed: false },
    { policyId: 3, agreed: false },
  ],
};

const ONBOARDING_DEFAULTS: OnboardingFormFields = {
  nickname: '',
  consents: [
    { policyId: 1, agreed: false },
    { policyId: 2, agreed: false },
    { policyId: 3, agreed: false },
  ],
  preferredTravelStyleIds: [],
  preferredTravelThemeIds: [],
};

const TermsStepFooter = ({ onNext }: { onNext: () => void }) => {
  const { watch } = useFormContext<FormFields>();
  const consents = watch('consents');

  const isRequired =
    consents.find((content) => content.policyId === 1)?.agreed &&
    consents.find((content) => content.policyId === 2)?.agreed;

  return <Button text="다음" disabled={!isRequired} onClick={onNext} className="h-[60px] max-w-none rounded-[10px]" />;
};

// ─── 컴포넌트 ───

interface SignupViewProps {
  mode?: SignupMode;
}

const SignupView = ({ mode = 'signup' }: SignupViewProps) => {
  const queryClient = useQueryClient();
  const isOnboarding = mode === 'onboarding';
  const steps = isOnboarding ? ONBOARDING_STEPS : SIGNUP_STEPS;
  const totalSteps = steps.length;

  const [level, setLevel] = useState<number>(() => readDevSignupStep(totalSteps));

  useEffect(() => {
    if (isDevCompletePreview()) {
      seedDevSignupCompleteMock(queryClient);
    }
  }, [queryClient]);
  const [stepFooter, setStepFooter] = useState<ReactNode | null>(null);
  const [stepDescriptionOverride, setStepDescriptionOverride] = useState<string | null>(null);

  const resetStepChrome = useCallback(() => {
    setStepFooter(null);
    setStepDescriptionOverride(null);
  }, []);

  const goToStep = useCallback(
    (nextLevel: number) => {
      resetStepChrome();
      setLevel(nextLevel);
    },
    [resetStepChrome],
  );

  const handleStepPrev = useCallback(() => {
    resetStepChrome();
    setLevel((prev) => Math.max(0, prev - 1));
  }, [resetStepChrome]);

  const handleStepNext = useCallback(() => {
    resetStepChrome();
    setLevel((prev) => prev + 1);
  }, [resetStepChrome]);

  const methods = useForm<FormFields | OnboardingFormFields>({
    defaultValues: mode === 'onboarding' ? ONBOARDING_DEFAULTS : SIGNUP_DEFAULTS,
    resolver: zodResolver(mode === 'onboarding' ? onboardingSchema : signupSchema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  const currentStep = steps[level];
  const StepComponent = currentStep?.Component;
  const baseStepDescription = SIGNUP_STEP_DESCRIPTIONS[currentStep?.title ?? ''] ?? '';
  const isTermsStep = level === 0;
  const isEmailStep = !isOnboarding && level === 1;
  const isPasswordStep = !isOnboarding && level === 2;
  const isNicknameStep = isOnboarding ? level === 1 : level === 3;
  const isPreferenceStep = isOnboarding ? level === 2 : level === 4;
  const stepDescription = stepDescriptionOverride ?? baseStepDescription;

  const modalFooter = isTermsStep ? <TermsStepFooter onNext={() => goToStep(1)} /> : stepFooter;

  return (
    <FormProvider {...methods}>
      {level < totalSteps && currentStep && StepComponent && (
        <SignupModal
          steps={steps}
          currentStep={level}
          stepTitle={currentStep.title}
          stepDescription={stepDescription}
          showBackToLogin={isTermsStep || isEmailStep || isPasswordStep || isNicknameStep || isPreferenceStep}
          footer={modalFooter ?? undefined}>
          <StepComponent
            key={level}
            onPrev={handleStepPrev}
            onNext={handleStepNext}
            mode={mode}
            setStepFooter={setStepFooter}
            setStepDescription={setStepDescriptionOverride}
          />
        </SignupModal>
      )}

      {level === totalSteps && <CompleteModal />}
    </FormProvider>
  );
};

export default SignupView;
