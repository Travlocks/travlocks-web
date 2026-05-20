import { useState } from 'react';
import clsx from 'clsx';
import { useFormContext } from 'react-hook-form';

import type { StepProps } from './SignupView';
import type { FormFields } from '../types/schema';

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

export type TermKey = (typeof TERMS)[number]['key'];

const Terms = (_props: StepProps) => {
  const { setValue, watch } = useFormContext<FormFields>();
  const consents = watch('consents');
  const [modalType, setModalType] = useState<TermKey | null>(null);

  const allChecked = consents.every((content) => content.agreed);

  const term = TERMS.find((t) => t.key === modalType);
  const checked = consents.find((c) => c.policyId === term?.policyId)?.agreed;

  const handleAllChange = (checked: boolean) => {
    setValue(
      'consents',
      consents.map((content) => ({ ...content, agreed: checked })),
    );
  };

  const handleItemChange = (policyId: number, checked: boolean) => {
    setValue(
      'consents',
      consents.map((content) => (content.policyId === policyId ? { ...content, agreed: checked } : content)),
    );
  };

  return (
    <section className="flex flex-col">
      <Checkbox
        text="전체 동의"
        outline
        checked={allChecked}
        onChange={handleAllChange}
        className={clsx(
          'w-full max-w-none gap-3 border-base-color',
          allChecked ? 'bg-[rgba(60,78,244,0.1)]' : 'bg-base-color-6',
        )}
      />

      <div className="mt-4 flex flex-col gap-4 pl-5">
        {TERMS.map((termItem, index) => (
          <div key={termItem.key}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Checkbox
                  text={
                    <span className="flex items-center gap-1">
                      <span className={clsx(termItem.required ? 'text-negative' : 'text-base-color-2')}>
                        {termItem.required ? '(필수)' : '(선택)'}
                      </span>
                      <span className="text-base-color-0">{termItem.label}</span>
                    </span>
                  }
                  outline={false}
                  checked={!!consents.find((c) => c.policyId === termItem.policyId)?.agreed}
                  onChange={(checked) => handleItemChange(termItem.policyId, checked)}
                  className="w-full max-w-none gap-3 px-0"
                />
              </div>
              <button
                type="button"
                aria-label={`${termItem.label} 상세 보기`}
                className="shrink-0 cursor-pointer"
                onClick={() => setModalType(termItem.key)}>
                <ArrowIcon className="size-[23px]" fill="#4A5569" />
              </button>
            </div>
            {index < TERMS.length - 1 && <hr className="mt-4 border-base-color" />}
          </div>
        ))}
      </div>

      {modalType && term && (
        <TermsModal
          type={modalType}
          onClose={() => setModalType(null)}
          onChange={(checked) => handleItemChange(term.policyId, checked)}
          agreements={!!checked}
        />
      )}
    </section>
  );
};

export default Terms;
