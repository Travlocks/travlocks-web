import clsx from 'clsx';

import { TravlocksWordmark } from '@/shared/components/TravlocksWordmark/TravlocksWordmark';
import { AppIcon } from '@/shared/ui/icon/AppIcon';

interface EmailModalProps {
  onClose: () => void;
  onReturn: () => void;
}

const TIPS = ['스팸함 또는 프로모션함을 확인해 주세요', '입력한 이메일 주소가 정확한지 확인해 주세요'];

const EmailModal = ({ onClose, onReturn }: EmailModalProps) => {
  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="email-help-title">
      <button type="button" className="absolute inset-0 bg-[rgba(74,85,105,0.6)]" aria-label="닫기" onClick={onClose} />

      <div className="relative z-10 flex w-full max-w-[790px] flex-col items-center rounded-[30px] bg-base-color-6 px-10 py-[72px] shadow-[0px_8px_10px_-5px_rgba(0,0,0,0.1),0px_20px_25px_-5px_rgba(0,0,0,0.1)]">
        <TravlocksWordmark className="h-[78px] w-full max-w-[437px]" />

        <h2 id="email-help-title" className="mt-[28px] h6 text-center text-base-color-0">
          이메일을 받지 못하셨나요?
        </h2>
        <p className="t2 mt-3 text-center text-base-color-1">
          인증 메일이 도착하지 않았다면 아래 사항을 먼저 확인해주세요
        </p>

        <ul className="mt-6 flex w-full max-w-[630px] flex-col gap-4 rounded-[10px] bg-[#f9fafb] p-6">
          {TIPS.map((tip) => (
            <li key={tip} className="flex items-center gap-4">
              <span className="flex size-[18px] shrink-0 items-center justify-center rounded-[10px] bg-primary-color text-[14px] font-medium text-white">
                !
              </span>
              <span className="h9 text-base-color-0">{tip}</span>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={onReturn}
          className={clsx(
            'h8 mt-10 flex h-[60px] w-full max-w-[630px] items-center justify-center gap-2 rounded-[10px]',
            'bg-primary-color text-base-color-6 transition-opacity hover:opacity-90',
          )}>
          <AppIcon name="arrow" size={20} className="rotate-180" fill="base-color-6" />
          이메일 인증 화면으로 돌아가기
        </button>
      </div>
    </div>
  );
};

export default EmailModal;
