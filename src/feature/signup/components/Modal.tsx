import clsx from 'clsx';
import { useState } from 'react';
import Terms from './Terms';
import Email from './Email';
import Password from './Password';
import Nickname from './Nickname';
import Preference from './Preference';
import { FormProvider, useForm } from 'react-hook-form';
import { schema, type FormFields } from '../types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

export interface StepProps {
  setLevel: React.Dispatch<React.SetStateAction<number>>;
}

const STEPS = [
  { id: 0, title: '약관동의', Component: Terms },
  { id: 1, title: '이메일 인증', Component: Email },
  { id: 2, title: '비밀번호 설정', Component: Password },
  { id: 3, title: '닉네임 설정', Component: Nickname },
  { id: 4, title: '개인 취향 탐색', Component: Preference },
] as const;

const Modal = () => {
  const [level, setLevel] = useState<number>(0); // 현재 단계

  const methods = useForm<FormFields>({
    defaultValues: {
      email: '',
      code: undefined,
      password: '',
      passwordCheck: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  return (
    <FormProvider {...methods}>
      {/* 단계 영역 */}
      <div className="relative w-full self-start">
        {/* 세로 진행선 */}
        <div className="relative w-[40px] h-[631px] flex flex-col">
          <div className="absolute left-1/2 -translate-x-1/2 w-[3px] h-[631px] rounded-[5px] bg-primary-color"></div>
        </div>

        {/* 단계 리스트 */}
        <div className="absolute top-0 flex flex-col w-full h-full gap-[28px]">
          {STEPS.map(({ id, title, Component }) => (
            <div key={id} className={clsx('flex', level === id ? 'h6 gap-[23px]' : 'b3 gap-[13px] items-center')}>
              {/* 원 */}
              <div
                className={clsx(
                  'b3 rounded-full size-[40px] flex items-center justify-center border-[2px] border-primary-color cursor-pointer relative z-10 shrink-0',
                  level === id ? 'bg-primary-color text-base-color-6' : 'bg-base-color-6 text-primary-color',
                )}>
                {id + 1}
              </div>

              {/* 각 단계 이름 + 컴포넌트 */}
              <div className={clsx('flex-1', level === id && 'mt-[5px]')}>
                <span>{title}</span>
                {/* 각 단계별 컴포넌트 */}
                {level === id && <Component setLevel={setLevel} />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </FormProvider>
  );
};

export default Modal;
