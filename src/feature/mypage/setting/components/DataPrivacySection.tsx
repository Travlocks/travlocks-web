import ArrowRightIcon from '@assets/icon-arrow-right.svg?react';
import { Link } from 'react-router-dom';

const PRIVACY_LINKS = [
  { id: 'privacy-policy', label: '개인정보 처리방침', to: '#' },
  { id: 'terms', label: '이용약관', to: '#' },
];

const DataPrivacySection = () => {
  return (
    <div className="flex flex-col gap-5">
      <h3 className="h4 font-medium text-base-color-0">개인정보 처리방침 및 이용약관</h3>

      <div className="flex gap-9">
        {PRIVACY_LINKS.map((link) => (
          <Link
            key={link.id}
            to={link.to}
            className="flex items-center justify-between flex-1 px-3 py-5 bg-base-color-5 rounded-[10px] transition-colors cursor-pointer">
            <span className="b4 text-base-color-0">{link.label}</span>
            <ArrowRightIcon fill="#4A5569" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DataPrivacySection;
