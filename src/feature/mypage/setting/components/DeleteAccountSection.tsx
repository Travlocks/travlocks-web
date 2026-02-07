import { useState } from 'react';
import DeleteAccountModal from './DeleteAccountModal';

const DeleteAccountSection = () => {
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleDelete = () => {
    // TODO: 계정 삭제 API 연동
    setShowModal(false);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-[10px]">
          <div className="rounded-full bg-negative size-[17px] text-center text-[14px] font-normal tracking-[-0.15px] text-white">
            <p className="translate-y-[-2px]">!</p>
          </div>
          <p className="text-negative b4 font-normal">계정 삭제 시 모든 데이터가 영구적으로 삭제됩니다</p>
        </div>

        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">탈퇴 사유</label>
          <div className="flex gap-7.5 items-center">
            <input
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="계정을 삭제하시려는 이유를 알려주세요"
              className="flex-1 b4 font-light px-[18px] py-[16px] rounded-[5px] border border-base-color bg-base-color-6 placeholder:text-base-color-3 outline-none h-[55px]"
            />
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="h9 px-14 py-3.5 bg-negative text-base-color-6  rounded-[10px] cursor-pointer hover:opacity-90 transition-all">
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
