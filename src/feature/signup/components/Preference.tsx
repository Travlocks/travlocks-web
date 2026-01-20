import { useState } from 'react';
import clsx from 'clsx';

import type { StepProps } from './Modal';
import DualButton from '@/shared/components/Button/DualButton';

import Nature from '@assets/preference/icon-preference-nature.svg?react';
import Culture from '@assets/preference/icon-preference-culture.svg?react';
import Food from '@assets/preference/icon-preference-food.svg?react';
import Healing from '@assets/preference/icon-preference-healing.svg?react';
import Activity from '@assets/preference/icon-preference-activity.svg?react';
import Local from '@assets/preference/icon-preference-local.svg?react';

import Free from '@assets/preference/icon-preference-style-free.svg?react';
import Plan from '@assets/preference/icon-preference-style-plan.svg?react';
import Schedule from '@assets/preference/icon-preference-style-schedule.svg?react';
import Efficiency from '@assets/preference/icon-preference-style-efficiency.svg?react';
import Improvise from '@assets/preference/icon-preference-style-plan.svg?react';
import Stay from '@assets/preference/icon-preference-style-stay.svg?react';

const THEMES = [
  {
    id: 1,
    label: '자연',
    icon: <Nature className="group-hover:text-white" />,
    text: '자연 속 풍경과 여유',
  },
  { id: 2, label: '문화', icon: <Culture className="group-hover:text-white" />, text: '역사와 문화 경험' },
  { id: 3, label: '맛집', icon: <Food className="group-hover:text-white" />, text: '현지 음식 즐기기' },
  { id: 4, label: '힐링', icon: <Healing className="group-hover:text-white" />, text: '쉼과 재충전' },
  { id: 5, label: '액티비티', icon: <Activity className="group-hover:text-white" />, text: '체험과 활동 중심' },
  { id: 6, label: '로컬', icon: <Local className="group-hover:text-white" />, text: '동네와 시장 탐방' },
];

const STYLES = [
  {
    id: 1,
    label: '자유 계획형',
    icon: <Free className="group-hover:text-white" />,
    text: '일정은 유연하게, 내 방식대로',
  },
  {
    id: 2,
    label: '계획 충실형',
    icon: <Plan className="group-hover:text-white" />,
    text: '출발 전 일정과 동선을 꼼꼼히',
  },
  {
    id: 3,
    label: '느긋한 일정형',
    icon: <Schedule className="group-hover:text-white" />,
    text: '여유 있게 머무는 여행',
  },
  {
    id: 4,
    label: '효율 중시형',
    icon: <Efficiency className="group-hover:text-white" />,
    text: '시간과 동선을 고려한 이동',
  },
  {
    id: 5,
    label: '즉흥 탐색형',
    icon: <Improvise className="group-hover:text-white" />,
    text: '현장에서 발견하는 여행',
  },
  { id: 6, label: '숙소 중심형', icon: <Stay className="group-hover:text-white" />, text: '머무는 시간이 중요한 여행' },
];

const Preference = ({ setLevel }: StepProps) => {
  const [selected, setSelected] = useState<{
    theme: number[];
    style: number[];
  }>({
    theme: [],
    style: [],
  }); // 선택된 취향 저장
  const [preferenceLevel, setPreferenceLevel] = useState<'theme' | 'style'>('theme'); // 여행 테마 및 여행 스타일 단계

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

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-2 b3 mt-[3px]">관심 있는 여행 테마를 선택해주세요 (최대2개)</p>

      <div className="grid grid-cols-3 gap-[15px]">
        {(preferenceLevel === 'theme' ? THEMES : STYLES).map((preference) => {
          const isSelected = selected[preferenceLevel].includes(preference.id);

          return (
            <div
              key={preference.id}
              onClick={() => handleSelect(preferenceLevel, preference.id)}
              className={clsx(
                'group rounded-[10px] border pt-[20px] pb-[12px] px-[46px] flex flex-col justify-center items-center hover:bg-[rgba(60,78,244,0.10)] hover:border-primary-color cursor-pointer hover:text-primary-color trnasition-all duration-500',
                isSelected ? 'boder-primary-color text-primary-color bg-[rgba(60,78,244,0.10)]' : 'border-base-color',
              )}>
              {/* 아이콘 */}
              <div
                className={clsx(
                  'size-[45px] rounded-[10px] flex items-center justify-center group-hover:bg-primary-color trnasition-all duration-500',
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
                  'b7 tracking-[-0.312px] text-primary-color whitespace-nowrap group-hover:opacity-100  trnasition-all duration-500',
                  isSelected ? 'opacity-100' : 'opacity-0',
                )}>
                {preference.text}
              </p>
            </div>
          );
        })}
      </div>

      <p onClick={() => setLevel(5)} className="self-end underline text-base-color-2 b4 cursor-pointer -mt-4">
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
              setLevel(5);
            }
          },
        }}
        width={215}
        height={64}
        gap={10}
        textSize={20}
        className="-mt-4"
      />
    </section>
  );
};

export default Preference;
