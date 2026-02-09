import { useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import type { StepProps } from './SignupView';
import type { FormFields } from '../types/schema';

import Button from '@/shared/components/Button/Button';
import Checkbox from '@/shared/components/Form/Checkbox';
import TermsModal from './TermsModal';

import ArrowIcon from '@assets/icon-arrow-right.svg?react';

const TERMS = [
  {
    key: 'service',
    label: '서비스 이용약관',
    required: true,
    policyId: 1,
  },
  {
    key: 'privacy',
    label: '개인정보 처리방침',
    required: true,
    policyId: 2,
  },
  {
    key: 'marketing',
    label: '마케팅 정보 수신 동의',
    required: false,
    policyId: 3,
  },
] as const;

export type TermKey = (typeof TERMS)[number]['key']; // service, privacy, marketing

const Terms = ({ setLevel }: StepProps) => {
  const { setValue, watch } = useFormContext<FormFields>();
  const consents = watch('consents');
  const [modalType, setModalType] = useState<TermKey | null>(null);

  const allChecked = consents.every((consents) => consents.agreed); // 전체동의했는지
  const isRequired =
    consents.find((content) => content.policyId === 1)?.agreed &&
    consents.find((content) => content.policyId === 2)?.agreed; // 필수 조건

  const term = TERMS.find((t) => t.key === modalType);
  const checked = consents.find((c) => c.policyId === term?.policyId)?.agreed; // 각 항목의 체크 여부

  // 전체 동의 선택한 경우
  const handleAllChange = (checked: boolean) => {
    setValue(
      'consents',
      consents.map((content) => ({ ...content, agreed: checked })),
    );
  };

  // 개별 약관 변경 로직
  const handleItemChange = (policyId: number, checked: boolean) => {
    setValue(
      'consents',
      consents.map((content) => (content.policyId === policyId ? { ...content, agreed: checked } : content)),
    );
  };

  return (
    <section className="flex flex-col gap-[16px]">
      <p className="text-base-color-2 b3 mt-[8px]">트래블록스 서비스 이용을 위해 약관 동의가 필요합니다</p>

      {/* 전체 동의 */}
      <Checkbox text="전체 동의" outline={true} checked={allChecked} onChange={handleAllChange} />

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
              checked={!!consents.find((c) => c.policyId === term.policyId)?.agreed}
              onChange={(checked) => handleItemChange(term.policyId, checked)}
              className="w-max pr-0"
            />
            <ArrowIcon className="cursor-pointer" onClick={() => setModalType(term.key)} />
          </div>
        ))}
      </div>

      {modalType && term && (
        <TermsModal
          type={modalType}
          onClose={() => setModalType(null)}
          onChange={(checked) => handleItemChange(term?.policyId, checked)}
          agreements={!!checked}
        />
      )}

      <Button text="다음" disabled={!isRequired} onClick={() => setLevel((prev) => prev + 1)} />
    </section>
  );
};

export default Terms;
