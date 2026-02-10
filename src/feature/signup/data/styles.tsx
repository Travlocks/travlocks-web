import Free from '@assets/preference/icon-preference-style-free.svg?react';
import Plan from '@assets/preference/icon-preference-style-plan.svg?react';
import Schedule from '@assets/preference/icon-preference-style-schedule.svg?react';
import Efficiency from '@assets/preference/icon-preference-style-efficiency.svg?react';
import Improvise from '@assets/preference/icon-preference-style-imporvise.svg?react';
import Stay from '@assets/preference/icon-preference-style-stay.svg?react';

export const STYLES = [
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
