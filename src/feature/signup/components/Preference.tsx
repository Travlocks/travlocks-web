import { useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import type { StepProps } from './SignupView';
import DualButton from '@/shared/components/Button/DualButton';
import usePostSignup from '../hooks/mutations/usePostSignup';
import type { FormFields } from '../types/schema';
import { SIGNUP_KEY } from '../constants/key';

import { THEMES } from '../data/preferencs';
import { STYLES } from '../data/styles';

import { postOnboarding } from '@/feature/auth/login/apis/onboarding';
import { useAuth } from '@/shared/hooks/useAuth';

const Preference = ({ onPrev, onNext, mode }: StepProps) => {
  const [selected, setSelected] = useState<{
    theme: number[];
    style: number[];
  }>({
    theme: [],
    style: [],
  }); // 선택된 취향 저장
  const [preferenceLevel, setPreferenceLevel] = useState<'theme' | 'style'>('theme'); // 여행 테마 및 여행 스타일 단계

  const { watch } = useFormContext<FormFields>();
  const queryClienet = useQueryClient();
  const { login } = useAuth();

  // 서버로 전송할 공통 값
  const nickname = watch('nickname');
  const consents = watch('consents');

  // ─── 일반 회원가입 submit ───
  const { mutate: signupMutate } = usePostSignup({
    onSuccess: (data) => {
      queryClienet.setQueryData(SIGNUP_KEY.signup, data);
      onNext();
    },
  });

  // ─── OAuth 온보딩 submit ───
  const { mutate: onboardingMutate } = useMutation({
    mutationFn: postOnboarding,
    onSuccess: (data) => {
      if (data.isSuccess && data.data) {
        login(data.data.accessToken);
        queryClienet.setQueryData(SIGNUP_KEY.signup, data);
        onNext();
      }
    },
  });

  const handleSelect = (level: 'theme' | 'style', id: number) => {
    setSelected((prev) => {
      const current = prev[level];

      if (current.includes(id)) {
        // 선택 해제
        return {
          ...prev,
          [level]: current.filter((v) => v !== id),
        };
      }

      if (current.length >= 2) {
        // 이미 2개 이상인 경우에는 무시
        return prev;
      }

      return {
        ...prev,
        [level]: [...current, id],
      };
    });
  };

  const handleSubmit = () => {
    const preferences = {
      nickname,
      consents,
      preferredTravelStyleIds: selected.style,
      preferredTravelThemeIds: selected.theme,
    };

    if (mode === 'onboarding') {
      onboardingMutate(preferences);
    } else {
      // 일반 회원가입: 추가 필드 포함
      const signupToken = watch('signupToken');
      const email = watch('email');
      const password = watch('passwordGroup.password');

      signupMutate({
        signupToken,
        email,
        password,
        ...preferences,
      });
    }
  };

  // 건너뛰기: 온보딩은 API 호출 필수 (ACTIVE 전환), 회원가입은 기존 동작 유지
  const handleSkip = () => {
    if (mode === 'onboarding') {
      onboardingMutate({
        nickname,
        consents,
        preferredTravelStyleIds: [],
        preferredTravelThemeIds: [],
      });
    } else {
      onNext();
    }
  };

  return (
    <section className="flex flex-col gap-[16px]">
      <p className="text-base-color-2 b3 mt-[8px]">
        {preferenceLevel === 'theme' && '관심 있는 여행 테마를 선택해주세요 (최대2개)'}
        {preferenceLevel === 'style' && '평소 여행 스타일을 선택해주세요 (최대2개)'}
      </p>

      <div className="grid grid-cols-3 gap-x-[15px] gap-y-[12px] flex-1">
        {(preferenceLevel === 'theme' ? THEMES : STYLES).map((preference) => {
          const isSelected = selected[preferenceLevel].includes(preference.id);

          return (
            <div
              key={preference.id}
              onClick={() => handleSelect(preferenceLevel, preference.id)}
              className={clsx(
                'group rounded-[10px] border pt-[20px] pb-[12px] px-[46px] flex flex-col justify-center items-center hover:bg-[rgba(60,78,244,0.10)] hover:border-primary-color cursor-pointer hover:text-primary-color transition-all duration-500',
                isSelected ? 'border-primary-color text-primary-color bg-[rgba(60,78,244,0.10)]' : 'border-base-color',
              )}>
              {/* 아이콘 */}
              <div
                className={clsx(
                  'size-[45px] rounded-[10px] flex items-center justify-center group-hover:bg-primary-color transition-all duration-500',
                  isSelected ? 'bg-primary-color  text-white' : 'bg-base-color-4',
                )}>
                {preference.icon}
              </div>

              {/* 화면에 표시될 이름 */}
              <p className="text-[16px] font-[500] leading-[24px] tracking-[-0.312px] whitespace-nowrap">
                {preference.label}
              </p>

              {/* hover시 보이는 상세 설명 */}
              <p
                className={clsx(
                  'b7 tracking-[-0.312px] text-primary-color whitespace-nowrap group-hover:opacity-100  transition-all duration-500',
                  isSelected ? 'opacity-100' : 'opacity-0',
                )}>
                {preference.text}
              </p>
            </div>
          );
        })}
      </div>

      <p onClick={handleSkip} className="self-end underline text-base-color-1 b4 cursor-pointer underline-offset-3">
        건너뛰기
      </p>

      <DualButton
        left={{
          text: '이전',
          variant: 'white',
          onClick: onPrev,
          className: 'border-base-color!',
        }}
        right={{
          text: '다음',
          onClick: () => {
            if (preferenceLevel === 'theme') {
              setPreferenceLevel('style');
            } else {
              handleSubmit();
            }
          },
        }}
        width={215}
        height={64}
        gap={10}
        textSize={20}
      />
    </section>
  );
};

export default Preference;
