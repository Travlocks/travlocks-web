import clsx from 'clsx';
import { useRef } from 'react';

import DualButton from '@/shared/components/Button/DualButton';
import Checkbox from '@/shared/components/Form/Checkbox';
import { TERMS } from '@/shared/data/signup/terms';

import CloseIcon from '@assets/icon-x.svg?react';
import MainBg from '@/shared/components/MainBg';

interface TemrsModalProps {
  type: 'service' | 'privacy' | 'marketing';
  onClose: () => void;
  onChange: (checked: boolean) => void;
  agreements: boolean;
}

const TermsModal = ({ type, onClose, onChange, agreements }: TemrsModalProps) => {
  const term = TERMS[type]; // 어떤 모달인지
  const checkRef = useRef<HTMLDivElement>(null);

  // 스크롤 최하단 도달 시 활성화되도록
  const handleScroll = () => {
    const el = checkRef.current;
    if (!el) return;

    const isBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 5;

    if (isBottom && !agreements) {
      onChange(true);
    }
  };

  return (
    <div className="fixed inset-0 z-20 flex justify-center py-8">
      <div className="z-0">
        <div className="fixed inset-0 z-1 bg-[rgba(74,85,105,0.6)]"></div>
        <MainBg />
      </div>

      <div className="z-20 max-w-[790px] w-full max-h-[1113px] bg-white w-full rounded-[15px] border border-[rgba(0,0,0,0.1)] flex flex-col">
        <div className="h-[113px] pt-[52px] pb-[28px] px-[39px] border-b border-[rgba(0,0,0,0.1)] flex justify-between">
          <h1 className="h3">{term.title}</h1>
          <CloseIcon className="size-[15px] cursor-pointer" onClick={onClose} />
        </div>

        <section
          ref={checkRef}
          onScroll={handleScroll}
          className="p-[40px] flex-1 overflow-y-scroll flex flex-col gap-[40px]">
          {term.subTitle && <h2 className="b4 leading-[26px]">{term.subTitle}</h2>}

          {term.section.map((section, idx) => (
            <div key={idx} className="flex flex-col gap-[20px]">
              <h2 className="h7 text-primary-color">{section.heading}</h2>

              {Array.isArray(section.content) ? (
                <ul className="flex flex-col gap-[15px]">
                  {section.content.map((line, idx) => (
                    <li key={idx} className="b4 leading-[26px]">
                      {line}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="b4 leading-[26px]">{section.content}</p>
              )}

              {section.subText && (
                <ul className="b6 leading-[26px] pr-[13px] marker:text-primary-color list-disc px-[18px]">
                  <li>{section.subText}</li>
                </ul>
              )}

              {section.container && (
                <div className="rounded-[20px] bg-base-color-5 px-[18px] py-[22px] mt-[-5px]">
                  <ul className="list-disc pl-[18px] pr-[13px] marker:text-primary-color flex flex-col gap-[10px]">
                    {section.container?.map((list, idx) => (
                      <li className="b6 leading-[26px]" key={idx}>
                        <span className="font-bold">{list.bold}</span>
                        <span className={clsx(list.highlight === '(필수) ' ? 'text-negative' : 'text-primary-color')}>
                          {list.highlight}
                        </span>
                        {list.text}
                      </li>
                    ))}
                  </ul>
                  {section.appendix && (
                    <div>
                      <div className="h-[1px] w-full bg-base-color-3 my-[10px]"></div>
                      <p className="text-base-color-1 b6 leading-[26px]">{section.appendix}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </section>

        <div className="h-[195px] bg-base-color-5 py-[35px] px-[26px] flex flex-col gap-[20px] rounded-[15px]">
          <Checkbox
            text="내용을 모두 확인하였으며 동의합니다."
            outline={true}
            checked={agreements}
            onChange={onChange}
            className="w-full max-w-none"
          />
          <DualButton
            left={{
              text: '취소',
              variant: 'white',
              className: 'border-[rgba(0,0,0,0.1)]',
              onClick: onClose,
            }}
            right={{
              text: '확인',
              disabled: !agreements,
              onClick: onClose,
            }}
            width={105}
            height={45}
            gap={17}
            textSize={18}
            className="flex justify-end"
          />
        </div>
      </div>
    </div>
  );
};

export default TermsModal;
