import RoundButton from '@/shared/components/Button/RoundButton';
import MainBg from '@/shared/components/MainBg';
import Logo from '@assets/logo/logo-auth.svg?react';

interface EmailModalProps {
  onClick: () => void;
}

const EmailModal = ({ onClick }: EmailModalProps) => {
  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center">
      <MainBg />

      <div className="relative flex flex-col gap-[20px] items-center bg-white rounded-[30px] py-[48px] px-[43px] border-[rgba(60,78,244,0.1)] shadow-[0_8px_10px_-5px rgba(0,0,0,0.10), 0_20px_25px_-5px rgba(0,0,0,0.10)]">
        <Logo />
        <h1 className="h6 text-[23px]">이메일을 받지 못하셨나요?</h1>
        <h2 className="h7 font-[400] leading-[26px] text-base-color-1">
          인증 메일이 도착하지 않았다면 아래 사항을 먼저 확인해주세요
        </h2>

        <ul className="mt-[10px] py-[25px] px-[26px] flex flex-col gap-[15px] rounded-[10px] bg-base-color-5 h9 w-full">
          <li className="flex items-center gap-[15px]">
            <div className="b3 text-[14px] tracking-[-0.15px] rounded-full bg-primary-color size-[18px] text-center text-white">
              !
            </div>
            스팸함 또는 프로모션함을 확인해 주세요
          </li>

          <li className="flex items-center gap-[15px]">
            <div className="b3 text-[14px] tracking-[-0.15px] rounded-full bg-primary-color size-[18px] text-center text-white">
              !
            </div>
            입력한 이메일 주소가 정확한지 확인해 주세요
          </li>
        </ul>

        <RoundButton
          text="이메일 인증 화면으로 돌아가기"
          className="mt-[56px] rounded-[15px]!"
          arrowLeft={true}
          onClick={onClick}
        />
      </div>
    </div>
  );
};

export default EmailModal;
