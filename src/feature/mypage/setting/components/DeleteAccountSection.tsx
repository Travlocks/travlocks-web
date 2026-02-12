import { useState } from 'react';
import TextField from '@/shared/components/TextField/TextField';
import { useWithdrawalAccount } from '../hooks/useWithdrawalAccount';
import { AppIcon } from '@/shared/ui/icon/AppIcon';
import AccountModal from '../../components/AccountModal';
import { useAuth } from '@/shared/hooks/useAuth';
import { toast } from '@/shared/stores/toastStore';

const DeleteAccountSection = () => {
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const { logout } = useAuth();

  const { withdrawalAccount, isPending } = useWithdrawalAccount({
    onSuccess: () => {
      setShowModal(false);
      setReason('');
      toast.success('계정 탈퇴가 완료되었습니다.', 'bottom-center');
      logout('/login');
    },
    onError: (error) => {
      toast.error(error.message, 'bottom-center');
    },
  });

  const handleDelete = () => {
    if (isPending) return;
    withdrawalAccount({ reason });
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px]">
          <AppIcon name="alert" width="17px" height="17px" color="#fd7565" />
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
              disabled={isPending}
              className="h9 px-14 py-4 bg-negative text-base-color-6 rounded-[10px] cursor-pointer hover:opacity-90 transition-all disabled:cursor-not-allowed disabled:opacity-70">
              계정 삭제
            </button>
          </div>
        </div>
      </div>
      {showModal && (
        <AccountModal modalType="withdrawal" onCancel={() => setShowModal(false)} onConfirm={handleDelete} />
      )}
    </>
  );
};

export default DeleteAccountSection;
