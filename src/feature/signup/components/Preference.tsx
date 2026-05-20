import { useCallback, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { StepProps } from './SignupView';
import SignupStepActions from './SignupStepActions';
import PreferenceCard from './PreferenceCard';
import usePostSignup from '../hooks/mutations/usePostSignup';
import type { FormFields } from '../types/schema';
import { SIGNUP_KEY } from '../constants/key';
import { THEMES } from '../data/preferencs';
import { STYLES } from '../data/styles';
import { postOnboarding } from '@/feature/auth/login/apis/onboarding';
import { useAuth } from '@/shared/hooks/useAuth';

type PreferenceLevel = 'theme' | 'style';

const PREFERENCE_DESCRIPTIONS: Record<PreferenceLevel, string> = {
  theme: '관심 있는 여행 테마를 선택해주세요 (최대2개)',
  style: '평소 여행 스타일을 선택해주세요 (최대2개)',
};

const Preference = ({ onPrev, onNext, mode, setStepFooter, setStepDescription }: StepProps) => {
  const [selected, setSelected] = useState<{ theme: number[]; style: number[] }>({
    theme: [],
    style: [],
  });
  const [preferenceLevel, setPreferenceLevel] = useState<PreferenceLevel>('theme');

  const { watch } = useFormContext<FormFields>();
  const queryClient = useQueryClient();
  const { login } = useAuth();

  const nickname = watch('nickname');
  const consents = watch('consents');

  const { mutate: signupMutate } = usePostSignup({
    onSuccess: (data) => {
      queryClient.setQueryData(SIGNUP_KEY.signup, data);
      onNext();
    },
  });

  const { mutate: onboardingMutate } = useMutation({
    mutationFn: postOnboarding,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        login(data.data.accessToken);
        queryClient.setQueryData(SIGNUP_KEY.signup, data);
        onNext();
      }
    },
  });

  const handleSelect = useCallback((level: PreferenceLevel, id: number) => {
    setSelected((prev) => {
      const current = prev[level];

      if (current.includes(id)) {
        return { ...prev, [level]: current.filter((v) => v !== id) };
      }

      if (current.length >= 2) return prev;

      return { ...prev, [level]: [...current, id] };
    });
  }, []);

  const handleSubmit = useCallback(() => {
    const preferences = {
      nickname,
      consents,
      preferredTravelStyleIds: selected.style,
      preferredTravelThemeIds: selected.theme,
    };

    if (mode === 'onboarding') {
      onboardingMutate(preferences);
      return;
    }

    signupMutate({
      signupToken: watch('signupToken'),
      email: watch('email'),
      password: watch('passwordGroup.password'),
      ...preferences,
    });
  }, [mode, nickname, consents, selected, onboardingMutate, signupMutate, watch]);

  const handleSkip = useCallback(() => {
    const emptyPreferences = {
      nickname,
      consents,
      preferredTravelStyleIds: [] as number[],
      preferredTravelThemeIds: [] as number[],
    };

    if (mode === 'onboarding') {
      onboardingMutate(emptyPreferences);
      return;
    }

    signupMutate({
      signupToken: watch('signupToken'),
      email: watch('email'),
      password: watch('passwordGroup.password'),
      ...emptyPreferences,
    });
  }, [mode, nickname, consents, onboardingMutate, signupMutate, watch]);

  const handlePrev = useCallback(() => {
    if (preferenceLevel === 'style') {
      setPreferenceLevel('theme');
      return;
    }
    onPrev();
  }, [preferenceLevel, onPrev]);

  const handleNext = useCallback(() => {
    if (preferenceLevel === 'theme') {
      setPreferenceLevel('style');
      return;
    }
    handleSubmit();
  }, [preferenceLevel, handleSubmit]);

  const currentSelections = selected[preferenceLevel];
  const canProceed = currentSelections.length > 0;
  const items = preferenceLevel === 'theme' ? THEMES : STYLES;

  useEffect(() => {
    setStepDescription?.(PREFERENCE_DESCRIPTIONS[preferenceLevel]);
  }, [preferenceLevel, setStepDescription]);

  useEffect(() => {
    if (!setStepFooter) return;

    setStepFooter(
      <div className="flex w-full flex-col gap-4">
        <button
          type="button"
          onClick={handleSkip}
          className="ml-auto text-[18px] font-normal text-base-color-1 underline underline-offset-2">
          건너뛰기
        </button>
        <SignupStepActions
          left={{ text: '이전', onClick: handlePrev }}
          right={{
            text: '다음',
            disabled: !canProceed,
            onClick: handleNext,
          }}
        />
      </div>,
    );

    return () => setStepFooter(null);
  }, [canProceed, preferenceLevel, setStepFooter, handlePrev, handleNext, handleSkip]);

  return (
    <section className="grid w-full grid-cols-3 gap-x-[15px] gap-y-3">
      {items.map((preference) => (
        <PreferenceCard
          key={preference.id}
          label={preference.label}
          description={preferenceLevel === 'style' ? preference.text : undefined}
          icon={preference.icon}
          isSelected={currentSelections.includes(preference.id)}
          onClick={() => handleSelect(preferenceLevel, preference.id)}
        />
      ))}
    </section>
  );
};

export default Preference;
