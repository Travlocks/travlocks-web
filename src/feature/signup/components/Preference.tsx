import Nature from '@assets/icon-preference-nature.svg?react';
import Culture from '@assets/icon-preference-culture.svg?react';
import Food from '@assets/icon-preference-food.svg?react';
import Healing from '@assets/icon-preference-healing.svg?react';
import Activity from '@assets/icon-preference-activity.svg?react';
import Local from '@assets/icon-preference-local.svg?react';

const PREFERENCES = [
  {
    id: 1,
    label: '자연',
    icon: <Nature />,
  },
  { id: 2, label: '문화', icon: <Culture /> },
  { id: 3, label: '맛집', icon: <Food /> },
  { id: 4, label: '힐링', icon: <Healing /> },
  { id: 5, label: '액티비티', icon: <Activity className="hover:text-red-500" /> },
  { id: 6, label: '로컬', icon: <Local /> },
];
const Preference = () => {
  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-1 b1 mt-[3px]">관심 있는 여행 테마를 선택해주세요 (최대2개)</p>

      <div className="grid grid-cols-3 gap-[15px]">
        {PREFERENCES.map((preference) => (
          <div
            key={preference.id}
            className="rounded-[10px] border border-base-color-3 py-[20px] px-[46px] flex flex-col justify-center items-center hover:bg-[rgba(60,78,244,0.10)] hover:border-primary-color hover:fill-primary-color cursor-pointer hover:text-primary-color">
            {preference.icon}
            <p className="text-[16px] font-[500] leading-[24px] tracking-[-0.312px] whitespace-nowrap">
              {preference.label}
            </p>
          </div>
        ))}
      </div>

      <p className="self-end underline text-base-color-2 b1">건너뛰기</p>
    </section>
  );
};

export default Preference;
