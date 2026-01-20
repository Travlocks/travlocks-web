import { useState } from 'react';
import clsx from 'clsx';

import type { StepProps } from './SignupView';
import Button from '@/shared/components/Button/Button';
import Checkbox from '@/shared/components/Form/Checkbox';
import TermsModal from './TermsModal';

import ArrowIcon from '@assets/icon-arrow-right.svg?react';

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

export type TermKey = (typeof TERMS)[number]['key']; // service, privacy, marketing

export type Agreements = Record<TermKey, boolean> & {
  all: boolean;
};

const Terms = ({ setLevel, agreements, setAgreements }: StepProps) => {
  const [modalType, setModalType] = useState<TermKey | null>(null);

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
  const handleItemChange = (key: TermKey, checked: boolean) => {
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
    <section className="flex flex-col gap-[16px]">
      <p className="text-base-color-2 b3 mt-[8px]">트래블록스 서비스 이용을 위해 약관 동의가 필요합니다</p>

      {/* 전체 동의 */}
      <Checkbox text="전체 동의" outline={true} checked={agreements.all} onChange={handleAllChange} />

      {/* 개별 약관 */}
      <div className="flex flex-col my-[8px] gap-[24px]">
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
            <ArrowIcon className="cursor-pointer" onClick={() => setModalType(term.key)} />
          </div>
        ))}
      </div>

      {modalType && (
        <TermsModal
          type={modalType}
          onClose={() => setModalType(null)}
          onChange={(checked) => handleItemChange(modalType, checked)}
          agreements={agreements[modalType]}
        />
      )}

      <Button text="다음" disabled={!isRequired} onClick={() => setLevel((prev) => prev + 1)} />
    </section>
  );
};

export default Terms;
