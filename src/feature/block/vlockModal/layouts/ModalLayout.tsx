import { useEffect } from 'react';
import type { ReactNode } from 'react';
// import XIcon from '@/shared/assets/icon-x-2.svg?react';

interface ModalLayoutProps {
  title: string;
  onClose?: () => void;
  children: ReactNode;
  headerExtra?: ReactNode; // 헤더 오른쪽에 추가적으로 들어갈 요소 (예: 토글 스위치)
  footer?: ReactNode; // 하단 버튼부
  width?: string;
  height?: string;
  className?: string; // 컨테이너 커스텀 스타일
}

const ModalLayout = ({
  title,
  onClose,
  children,
  headerExtra,
  footer,
  width = '534px',
  height = '800px',
  className = '',
}: ModalLayoutProps) => {
  // ESC 키로 모달 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[80px_180px] bg-[rgba(74,85,105,0.60)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}>
      <div
        style={{ width, height }}
        className={`flex flex-col gap-[30px] rounded-[30px] bg-base-color-6 p-[45px_40px] shadow-xl max-w-full max-h-full ${className}`}>
        {/* 헤더 */}
        <div className="flex flex-row justify-between items-center">
          <p className="h6 text-base-color-0">{title}</p>
          <div className="flex items-center justify-center gap-[14px]">
            {headerExtra}
            {/* <XIcon onClick={onClose} className="cursor-pointer text-base-color-2 w-[20px] h-[20px]" /> */}
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[20px] overflow-y-auto">{children}</div>

        {/* 푸터 */}
        {footer && <div className="flex flex-col gap-[10px]">{footer}</div>}
      </div>
    </div>
  );
};

export default ModalLayout;
