import SaveIcon from '@assets/block/icon-save.svg?react';
import ShareIcon from '@assets/block/icon-share.svg?react';
import clsx from 'clsx';
import { useState } from 'react';

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
  {
    id: 2,
    icon: <ShareIcon />,
    text: '공유하기',
  },
];

const BlockHeader = () => {
  const [selectedId, setSelectedId] = useState(1);

  return (
    <div className="border-b border-base-color py-[21px] pl-[23px] pr-[32px] flex justify-between items-center">
      <section className="flex gap-[20px] items-center">
        <p className="py-[4px] px-[10px] h6">1205 제주여행</p>

        <div className="px-[6px] py-[6px] flex gap-[6px] items-center rounded-[5px] bg-base-color-4">
          {VISIBILITY.map((button) => (
            <button
              key={button.id}
              onClick={() => setSelectedId(button.id)}
              className={clsx(
                'py-[4px] px-[15px] h8 text-[14px] cursor-pointer rounded-[5px]',
                selectedId === button.id ? 'bg-white text-primary-color' : 'bg-base-color-4 text-base-color-3',
              )}>
              {button.text}
            </button>
          ))}
        </div>
      </section>

      <section className="flex gap-[25px]">
        {ACTIONS.map((action) => (
          <button
            key={action.id}
            className={clsx(
              'rounded-[10px] py-[10px] px-[15px] flex gap-[10px] border items-center cursor-pointer',
              action.id === 1 && 'border-base-color bg-white',
              action.id === 2 && 'border-primary-color bg-primary-color text-white',
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
