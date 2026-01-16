import Nature from '@assets/icon-preference-nature.svg?react';
import Culture from '@assets/icon-preference-culture.svg?react';
import Food from '@assets/icon-preference-food.svg?react';
import Healing from '@assets/icon-preference-healing.svg?react';
import Activity from '@assets/icon-preference-activity.svg?react';
import Local from '@assets/icon-preference-local.svg?react';
import DualButton from '@/shared/components/Button/DualButton';
import type { StepProps } from './Modal';
import { useState } from 'react';
import clsx from 'clsx';

const PREFERENCES = [
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
const Preference = ({ setLevel }: StepProps) => {
  const [selected, setSelected] = useState<number[]>([]);

  const handleSelect = (id: number) => {
    setSelected((prev) => {
      if (prev.includes(id)) {
        // 선택 해제
        return prev.filter((v) => v !== id);
      }

      if (prev.length >= 2) {
        // 이미 2개 이상인 경우에는 무시
        return prev;
      }

      return [...prev, id];
    });
  };

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-2 b3 mt-[3px]">관심 있는 여행 테마를 선택해주세요 (최대2개)</p>

      <div className="grid grid-cols-3 gap-[15px]">
        {PREFERENCES.map((preference) => {
          const isSelected = selected.includes(preference.id);

          return (
            <div
              key={preference.id}
              onClick={() => handleSelect(preference.id)}
              className={clsx(
                'group rounded-[10px] border pt-[20px] pb-[12px] px-[46px] flex flex-col justify-center items-center hover:bg-[rgba(60,78,244,0.10)] hover:border-primary-color cursor-pointer hover:text-primary-color',
                isSelected ? 'boder-primary-color text-primary-color bg-[rgba(60,78,244,0.10)]' : 'border-base-color',
              )}>
              <div
                className={clsx(
                  'size-[45px] rounded-[10px] flex items-center justify-center group-hover:bg-primary-color',
                  isSelected ? 'bg-primary-color  text-white' : 'bg-base-color-4',
                )}>
                {preference.icon}
              </div>

              <p className="text-[16px] font-[500] leading-[24px] tracking-[-0.312px] whitespace-nowrap">
                {preference.label}
              </p>

              <p
                className={clsx(
                  'b7 tracking-[-0.312px] text-primary-color whitespace-nowrap group-hover:opacity-100',
                  isSelected ? 'opacity-100' : 'opacity-0',
                )}>
                {preference.text}
              </p>
            </div>
          );
        })}
      </div>

      <p className="self-end underline text-base-color-2 b4 cursor-pointer -mt-4">건너뛰기</p>

      <DualButton
        left={{
          text: '이전',
          variant: 'white',
          onClick: () => setLevel(3),
          className: 'border-base-color!',
        }}
        right={{
          text: '다음',
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
