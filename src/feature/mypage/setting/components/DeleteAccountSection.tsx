import { useState } from 'react';
import TextField from '@/shared/components/TextField/TextField';
import DeleteAccountModal from './DeleteAccountModal';
import { useWithdrawalAccount } from '../hooks/useWithdrawalAccount';
import { AppIcon } from '@/shared/ui/icon/AppIcon';

const DeleteAccountSection = () => {
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const { withdrawalAccount } = useWithdrawalAccount();

  const handleDelete = () => {
    withdrawalAccount({ reason: reason.trim() });
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px]">
          <AppIcon name="alert" width="17px" height="17px" fill="#FD7565" />
          <p className="text-negative b4 font-normal">계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다</p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex gap-7.5 items-end">
            <div className="flex-1">
              <TextField
                label="탈퇴 사유"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="계정을 삭제하시려는 이유를 알려주세요"
                onClear={() => setReason('')}
              />
            </div>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="h9 px-14 py-4 bg-negative text-base-color-6 rounded-[10px] cursor-pointer hover:opacity-90 transition-all">
              계정 삭제
            </button>
          </div>
        </div>
      </div>

      {/* 회원 삭제 모달  TODO: 모달 컴포넌트 추가 후 수정 */}
      {showModal && <DeleteAccountModal onCancel={() => setShowModal(false)} onConfirm={handleDelete} />}
    </>
  );
};

export default DeleteAccountSection;
