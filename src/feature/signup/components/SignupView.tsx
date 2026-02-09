import clsx from 'clsx';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { schema, type FormFields } from '../types/schema';
import Terms from './Terms';
import Email from './Email';
import Password from './Password';
import Nickname from './Nickname';
import Preference from './Preference';

import CheckIcon from '@assets/icon-check-password.svg?react';
import CompleteModal from './CompleteModal';

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

const SignupView = () => {
  const [level, setLevel] = useState<number>(0); // 현재 단계

  const methods = useForm<FormFields>({
    defaultValues: {
      email: '',
      code: undefined,
      password: '',
      passwordCheck: '',
      nickname: '',
      consents: [
        { policyId: 1, agreed: false },
        { policyId: 2, agreed: false },
        { policyId: 3, agreed: false },
      ],
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
    criteriaMode: 'all',
  });

  return (
    <FormProvider {...methods}>
      {level < 5 && (
        // 단계 영역
        <div className="relative w-full self-start mt-[-32px]">
          {/* 세로 진행선 */}
          <div className="absolute w-[40px] min-h-[631px] flex flex-col">
            <div
              className={clsx(
                'absolute left-1/2 -translate-x-1/2 w-[3px] min-h-[631px] rounded-[5px] bg-primary-color',
                level === 4 && 'min-h-[300px]!',
              )}></div>
          </div>

          {/* 단계 리스트 */}
          <div className="flex flex-col w-full gap-[28px]">
            {STEPS.map(({ id, title, Component }) => (
              <div key={id} className={clsx('flex', level === id ? 'h6 gap-[23px]' : 'b3 gap-[13px] items-center')}>
                {/* 원 */}
                <div
                  className={clsx(
                    'b3 rounded-full size-[40px] flex items-center justify-center border-[2px] border-primary-color relative z-10 shrink-0',
                    level === id ? 'bg-primary-color text-base-color-6' : 'bg-base-color-6 text-primary-color',
                  )}>
                  {id < level && <CheckIcon className="size-[30px]" />}
                  {id >= level && id + 1}
                </div>

                {/* 각 단계 이름 + 컴포넌트 */}
                <div className={clsx('flex-1', level === id && 'mt-[5px]')}>
                  {/* 각 단계 이름 */}
                  <span>{title}</span>

                  {/* 각 단계별 컴포넌트 */}
                  {level === id && <Component setLevel={setLevel} />}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 가입완료 */}
      {level === 5 && <CompleteModal />}
    </FormProvider>
  );
};

export default SignupView;
