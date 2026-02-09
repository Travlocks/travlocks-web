import { useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';

import type { StepProps } from './SignupView';
import DualButton from '@/shared/components/Button/DualButton';
import usePostSignup from '../hooks/mutations/usePostSignup';
import type { FormFields } from '../types/schema';
import { SIGNUP_KEY } from '../constants/key';

import { THEMES } from '../data/preferencs';
import { STYLES } from '../data/styles';

const Preference = ({ setLevel }: StepProps) => {
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

  // 서버로 전송할 값
  const signupToken = watch('signupToken');
  const email = watch('email');
  const password = watch('password');
  const nickname = watch('nickname');
  const consents = watch('consents');

  const { mutate } = usePostSignup({
    onSuccess: (data) => {
      queryClienet.setQueryData(SIGNUP_KEY.signup, data);
      setLevel(5);
    },
  }); // 최종 회원가입

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
    mutate({
      signupToken,
      email,
      password,
      nickname,
      consents,
      preferredTravelStyleIds: selected.style,
      preferredTravelThemeIds: selected.theme,
    });
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

      <p
        onClick={() => setLevel(5)}
        className="self-end underline text-base-color-1 b4 cursor-pointer underline-offset-3">
        건너뛰기
      </p>

      <DualButton
        left={{
          text: '이전',
          variant: 'white',
          onClick: () => setLevel(3),
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
