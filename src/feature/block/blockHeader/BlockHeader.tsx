import clsx from 'clsx';
import { useEffect, useRef, useState, type KeyboardEvent, type SetStateAction } from 'react';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { patchTemplateMetadata } from '../blockBuild/apis/templateBlockApi';

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
  const templateId = useBlockTemplateStore((s) => s.templateId);
  const templateTitle = useBlockTemplateStore((s) => s.templateTitle);
  const setTemplateTitle = useBlockTemplateStore((s) => s.setTemplateTitle);
  const [input, setInput] = useState('');
  const [isTitleEditing, setIsTitleEditing] = useState(false);
  const [isSavingTitle, setIsSavingTitle] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isTitleEditing) return;
    titleInputRef.current?.focus();
    titleInputRef.current?.select();
  }, [isTitleEditing]);

  const commitTitle = async () => {
    const nextTitle = input.trim();
    const prevTitle = templateTitle;
    if (nextTitle === prevTitle) {
      setInput(prevTitle);
      return;
    }

    setTemplateTitle(nextTitle);
    setInput(nextTitle);

    if (!templateId) return;

    const templateIdNum = Number(templateId);
    if (Number.isNaN(templateIdNum)) {
      console.error('[BlockHeader] Invalid templateId:', templateId);
      return;
    }

    setIsSavingTitle(true);
    try {
      await patchTemplateMetadata(templateIdNum, { title: nextTitle });
    } catch (error) {
      console.error('[BlockHeader] Failed to save template title:', error);
      setTemplateTitle(prevTitle);
      setInput(prevTitle);
    } finally {
      setIsSavingTitle(false);
    }
  };

  const handleTitleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.currentTarget.blur();
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setInput(templateTitle);
      setIsTitleEditing(false);
    }
  };

  return (
    <div className="border-b border-base-color py-[17px] pl-[23px] pr-[32px] flex justify-between items-center bg-white">
      <section className="relative flex gap-[20px] items-center">
        {/* 이전 버튼 및 여행 제목 */}
        <div className="flex gap-[8px]">
          <div
            onClick={() => {
              if (level === 'editor') {
                setLevel('timeline');
              }
            }}
            className={clsx(
              'rounded-[10px] size-[36px] flex justify-center items-center transition',
              level === 'timeline' ? 'bg-base-color-3 cursor-not-allowed' : 'bg-primary-color cursor-pointer',
            )}>
            <LeftIcon className="text-white rotate-180" />
          </div>
          {isTitleEditing ? (
            <input
              ref={titleInputRef}
              value={input}
              placeholder="여행 제목"
              maxLength={30}
              onChange={(e) => setInput(e.target.value)}
              onBlur={() => {
                void commitTitle();
                setIsTitleEditing(false);
              }}
              onKeyDown={handleTitleKeyDown}
              className="py-[4px] px-[10px] h6 peer outline-none max-w-[170px] w-full"
            />
          ) : (
            <button
              type="button"
              onClick={() => {
                setInput(templateTitle);
                setIsTitleEditing(true);
              }}
              disabled={isSavingTitle}
              className={clsx(
                'py-[4px] px-[10px] h6 max-w-[170px] w-full text-left rounded-[6px] transition-colors truncate',
                'hover:bg-base-color-5',
                isSavingTitle && 'cursor-wait',
                templateTitle ? 'text-base-color-0' : 'text-base-color-3',
              )}>
              {templateTitle || '여행 제목'}
            </button>
          )}
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
