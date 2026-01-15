import Button from '@/shared/components/Button/Button';
import Checkbox from '@/shared/components/Form/Checkbox';
import { useState } from 'react';
import type { StepProps } from './Modal';
import ArrowIcon from '@assets/icon-arrow-right.svg?react';
import clsx from 'clsx';

const TERMS = [
  {
    key: 'service',
    label: '서비스 이용약관',
    required: true,
  },
  {
    key: 'privacy',
    label: '개인정보 처리방침',
    required: true,
  },
  {
    key: 'marketing',
    label: '마케팅 정보 수신 동의',
    required: false,
  },
] as const;

const Terms = ({ setLevel }: StepProps) => {
  const [agreements, setAgreements] = useState({
    service: false, // 서비스 이용약관
    privacy: false, // 개인정보 처리방침
    marketing: false, // 마케팅 정보 수신 동의
    all: false, // 전체 동의
  });

  const isRequired = agreements.service && agreements.privacy; // 필수 조건

  // 전체 동의 선택한 경우
  const handleAllChange = (checked: boolean) => {
    setAgreements({
      service: checked,
      privacy: checked,
      marketing: checked,
      all: checked,
    });
  };

  // 개별 약관 변경 로직
  const handleItemChange = (key: string, checked: boolean) => {
    setAgreements((prev) => {
      const next = {
        ...prev,
        [key]: checked,
      };

      return {
        ...next,
        all: next.service && next.privacy && next.marketing,
      };
    });
  };

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-2 b3 mt-[3px]">트래블록스 서비스 이용을 위해 약관 동의가 필요합니다</p>

      {/* 전체 동의 */}
      <Checkbox text="전체 동의" outline={true} checked={agreements.all} onChange={handleAllChange} />

      {/* 개별 약관 */}
      {TERMS.map((term) => (
        <div key={term.key} className="flex">
          <Checkbox
            text={
              <div className="flex gap-[3px]">
                <span className={clsx(term.required ? 'text-negative' : 'text-base-color-2')}>
                  {term.required ? '(필수)' : '(선택)'}
                </span>
                {term.label}
              </div>
            }
            outline={false}
            checked={agreements[term.key]}
            onChange={(checked) => handleItemChange(term.key, checked)}
            className="w-max pr-0"
          />
          <ArrowIcon className="cursor-pointer" />
        </div>
      ))}

      <Button text="다음" disabled={!isRequired} onClick={() => setLevel((prev) => prev + 1)} />
    </section>
  );
};

export default Terms;
