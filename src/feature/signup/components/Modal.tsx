import AuthNavButton from '@/shared/components/Button/AuthNavButton';
import LogoIcon from '@assets/GNB/logo.svg?react';
import clsx from 'clsx';
import { useState } from 'react';
import Terms from './Terms';
import Email from './Email';
import Password from './Password';
import Nickname from './Nickname';
import Preference from './Preference';

const STEPS = [
  { id: 0, title: '약관동의', Component: Terms },
  { id: 1, title: '이메일 인증', Component: Email },
  { id: 2, title: '비밀번호 설정', Component: Password },
  { id: 3, title: '닉네임 설정', Component: Nickname },
  { id: 4, title: '개인 취향 탐색', Component: Preference },
] as const;

const Modal = () => {
  const [level, setLevel] = useState<number>(0); // 현재 단계

  return (
    <div className="max-w-[585px] w-full h-[988px] px-[43px] pt-[48px] rounded-[30px] flex flex-col items-center border border-[rgba(34,34,34,0.10)] bg-base-color-6 shadow-[0_8px_10px_-5px_rgba(0,0,0,0.10),_0_20px_25px_-5px_rgba(0,0,0,0.10)]">
      <LogoIcon />
      <h1>조립하는 즐거움, 나만의 여행 블록 쌓기</h1>

      <AuthNavButton />

      {/* 단계 영역 */}
      <div className="relative w-full self-start">
        {/* 세로 진행선 */}
        <div className="relative w-[40px] h-[631px] flex flex-col">
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[631px] rounded-[5px] bg-primary-color"></div>
        </div>

        {/* 단계 리스트 */}
        <div className="absolute top-0 flex flex-col h-full">
          {STEPS.map(({ id, title, Component }) => (
            <div key={id} className={clsx('flex', level === id ? 'h2 gap-[23px]' : 'h3 gap-[13px] items-center')}>
              {/* 원 */}
              <div
                onClick={() => setLevel(id)}
                className={clsx(
                  't2 rounded-full size-[40px] flex items-center justify-center border-[2px] border-primary-color cursor-pointer relative z-10 shrink-0',
                  level === id ? 'bg-primary-color text-base-color-6' : 'bg-base-color-6 text-primary-color',
                )}>
                {id + 1}
              </div>

              {/* 각 단계 이름 + 컴포넌트 */}
              <div className={clsx(level === id && 'mt-[5px]')}>
                <span>{title}</span>
                {/* 각 단계별 컴포넌트 */}
                {level === id && <Component />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
