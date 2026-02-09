import Nature from '@assets/preference/icon-preference-nature.svg?react';
import Culture from '@assets/preference/icon-preference-culture.svg?react';
import Food from '@assets/preference/icon-preference-food.svg?react';
import Healing from '@assets/preference/icon-preference-healing.svg?react';
import Activity from '@assets/preference/icon-preference-activity.svg?react';
import Local from '@assets/preference/icon-preference-local.svg?react';

export const THEMES = [
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
