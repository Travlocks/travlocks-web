import { AppIcon } from '@/shared/ui/icon/AppIcon';
import DualButton from '@/shared/components/Button/DualButton';
import SingleButton from '@/shared/components/Button/SingleButton';

interface AccountModalProps {
  modalType: 'complete' | 'withdrawal'; // 수정, 탈퇴
  onCancel: () => void;
  onConfirm: () => void;
}

// 모달 타입에 따라 제목과 설명 텍스트 변경
const TEXT: Record<'complete' | 'withdrawal', { title: string; description: string }> = {
  complete: {
    title: '수정이 완료되었습니다',
    description: '이제 다음 여정을 이어가볼까요?',
  },
  withdrawal: {
    title: '정말 탈퇴하시겠어요?',
    description: '탈퇴 시 저장된 블록과 템플릿도 복구할 수 없어요',
  },
};

const AccountModal = ({ modalType, onCancel, onConfirm }: AccountModalProps) => {
  const isComplete = modalType === 'complete';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* 모달 */}
      <div className="relative gap-12 bg-base-color-6 rounded-[30px] p-8 w-[585px] h-[447px] mx-4 flex flex-col items-center pt-15">
        {/* 경고 아이콘 */}
        {isComplete ? (
          <AppIcon name="check" width="74px" height="74px" />
        ) : (
          <AppIcon name="alert" width="74px" height="74px" />
        )}

        {/* 제목 + 설명 */}
        <div className="text-center gap-4 flex flex-col">
          <h3 className="h4 text-[30px] font-medium text-base-color-0">{TEXT[modalType].title}</h3>
          <p className="b2 text-base-color-1">{TEXT[modalType].description}</p>
        </div>

        {/* 버튼 */}
        {isComplete ? (
          <SingleButton
            text="확인"
            variant="primary"
            onClick={onConfirm}
            className="py-8"
            width={215}
            height={64}
            textSize={20}
          />
        ) : (
          <DualButton
            className="w-full justify-center"
            left={{
              text: '취소',
              variant: 'white',
              onClick: onCancel,
              className: 'py-8',
            }}
            right={{
              text: '탈퇴하기',
              variant: 'negative',
              onClick: onConfirm,
              className: 'py-8',
            }}
            width={215}
            height={64}
            gap={10}
            textSize={20}
          />
        )}
      </div>
    </div>
  );
};

export default AccountModal;
