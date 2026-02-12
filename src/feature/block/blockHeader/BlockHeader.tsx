import clsx from 'clsx';
import { useState, type SetStateAction } from 'react';

import type { Level } from '../blockBuild/types/level';
import SaveIcon from '@assets/block/icon-save.svg?react';
import LeftIcon from '@assets/splash/icon-arrow.svg?react';

const VISIBILITY = [
  {
    id: 1,
    text: '전체 공개',
  },
  {
    id: 2,
    text: '나만 보기',
  },
];

const ACTIONS = [
  {
    id: 1,
    icon: <SaveIcon />,
    text: '저장',
  },
  // {
  //   id: 2,
  //   icon: <ShareIcon />,
  //   text: '공유하기',
  // },
];

interface BlockHeaderProps {
  level: Level;
  setLevel: React.Dispatch<SetStateAction<Level>>;
}

const BlockHeader = ({ level, setLevel }: BlockHeaderProps) => {
  const [selectedId, setSelectedId] = useState(1);
  const [input, setInput] = useState('1205 제주여행'); // TODO: 사전 정보 입력값과 연동 필요

  return (
    <div className="border-b border-base-color py-[17px] pl-[23px] pr-[32px] flex justify-between items-center bg-white">
      <section className="relative flex gap-[20px] items-center">
        {/* 이전 버튼 및 여행 제목 */}
        <div className="flex gap-[8px]">
          <div
            onClick={() => {
              if (level === 'editor') {
                setLevel('timeline');
              } else {
                setLevel('editor');
              }
            }}
            className={clsx(
              'rounded-[10px] size-[36px] flex justify-center items-center cursor-pointer transition',
              level === 'timeline' ? 'bg-base-color-3' : 'bg-primary-color',
            )}>
            <LeftIcon className="text-white rotate-180" />
          </div>
          <input
            value={input}
            placeholder={input}
            onChange={(e) => setInput(e.target.value)}
            className="py-[4px] px-[10px] h6 peer outline-none"
          />
        </div>

        {/* 전체 공개 및 나만 보기 버튼 */}
        <div className="px-[6px] py-[6px] flex gap-[6px] items-center rounded-[5px] bg-base-color-4">
          {VISIBILITY.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedId(button.id)}
              className={clsx(
                'py-[4px] px-[15px] h8 text-[14px] cursor-pointer rounded-[5px] transition-all',
                selectedId === button.id ? 'bg-white text-primary-color' : 'bg-base-color-4 text-base-color-3',
              )}>
              {button.text}
            </button>
          ))}
        </div>

        {/* <BlockTooltip textKey="타이틀" className="peer-hover:opacity-100 opacity-0" /> */}
      </section>

      {/* 저장 및 공유하기 버튼 */}
      <section className="flex gap-[25px]">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            className={clsx(
              'rounded-[10px] py-[10px] px-[15px] flex gap-[10px] border items-center cursor-pointer',
              // action.id === 1 && 'border-base-color bg-white',
              action.id === 1 && 'border-primary-color bg-primary-color text-white',
            )}>
            {action.icon}
            <p>{action.text}</p>
          </button>
        ))}
      </section>
    </div>
  );
};

export default BlockHeader;
