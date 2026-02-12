import TermsModal from '@/feature/signup/components/TermsModal';
import ArrowRightIcon from '@assets/icon-arrow-right.svg?react';
import { useState } from 'react';

const PRIVACY_LINKS = [
  { id: 'privacy-policy', label: '개인정보 처리방침', key: 'privacy' },
  { id: 'terms', label: '이용약관', key: 'service' },
];

const DataPrivacySection = () => {
  const [modalType, setModalType] = useState<(typeof PRIVACY_LINKS)[number]['key'] | null>(null);

  return (
    <div className="flex flex-col gap-5">
      <h3 className="h4 font-medium text-base-color-0">개인정보 처리방침 및 이용약관</h3>

      <div className="flex gap-9">
        {PRIVACY_LINKS.map((link) => (
          <button
            key={link.id}
            onClick={() => setModalType(link.key)}
            className="flex items-center justify-between flex-1 px-3 py-5 bg-base-color-5 rounded-[10px] transition-colors cursor-pointer">
            <span className="b4 text-base-color-0">{link.label}</span>
            <ArrowRightIcon fill="#4A5569" />
          </button>
        ))}
      </div>

      {modalType && (
        <TermsModal
          type={modalType as 'service' | 'privacy' | 'marketing'}
          onClose={() => setModalType(null)}
          hasCheckbox={false}
        />
      )}
    </div>
  );
};

export default DataPrivacySection;
