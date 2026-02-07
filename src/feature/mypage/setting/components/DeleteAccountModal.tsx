import clsx from 'clsx';

interface DeleteAccountModalProps {
  onCancel: () => void;
  onConfirm: () => void;
}

// TODO: 모달 컴포넌트 추가 후 수정
const DeleteAccountModal = ({ onCancel, onConfirm }: DeleteAccountModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 오버레이 */}
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />

      {/* 모달 */}
      <div className="relative bg-base-color-6 rounded-[15px] p-8 max-w-[400px] w-full mx-4 flex flex-col items-center gap-6">
        {/* 경고 아이콘 */}
        <div className="w-14 h-14 rounded-full bg-negative/10 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full bg-negative flex items-center justify-center">
            <span className="text-white text-xl font-[600]">!</span>
          </div>
        </div>

        {/* 제목 + 설명 */}
        <div className="text-center">
          <h3 className="h4 font-medium text-base-color-0 mb-2">정말 탈퇴하시겠어요?</h3>
          <p className="b4 text-base-color-2">탈퇴 시 저장된 블록과 템플릿도 복구할 수 없어요.</p>
        </div>

        {/* 버튼 */}
        <div className="flex gap-3 w-full">
          <button
            type="button"
            onClick={onCancel}
            className={clsx(
              'flex-1 h-[50px] rounded-[10px] border border-base-color-3',
              'bg-base-color-6 text-base-color-0 cursor-pointer',
              'hover:bg-base-color-5 transition-all h9',
            )}>
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={clsx(
              'flex-1 h-[50px] rounded-[10px]',
              'bg-negative text-base-color-6 cursor-pointer',
              'hover:opacity-90 transition-all h9',
            )}>
            탈퇴하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
