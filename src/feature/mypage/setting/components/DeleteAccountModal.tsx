import { AppIcon } from '@/shared/ui/icon/AppIcon';
import DualButton from '@/shared/components/Button/DualButton';

interface DeleteAccountModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteAccountModal = ({ onCancel, onConfirm }: DeleteAccountModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* 모달 */}
      <div className="relative bg-base-color-6 rounded-[30px] p-8 max-w-[585px] w-full h-[447px] mx-4 flex flex-col items-center gap-6">
        {/* 경고 아이콘 */}
        <AppIcon name="alert" width="74px" height="74px" fill="#FD7565" />

        {/* 제목 + 설명 */}
        <div className="text-center">
          <h3 className="h4 font-medium text-base-color-0 mb-2">정말 탈퇴하시겠어요?</h3>
          <p className="b4 text-base-color-1">탈퇴 시 저장된 블록과 템플릿도 복구할 수 없어요.</p>
        </div>

        {/* 버튼 */}
        <DualButton
          left={{
            text: '취소',
            variant: 'white',
          }}
          right={{
            text: '탈퇴하기',
            variant: 'negative',
            onClick: onConfirm,
          }}
          width={215}
          height={64}
          gap={10}
          textSize={20}
        />
      </div>
    </div>
  );
};

export default DeleteAccountModal;
