import clsx from 'clsx';

import CheckIcon from '@assets/icon-check.svg?react';
import AlertIcon from '@assets/icon-alert.svg?react';

/**
 * 에러 메시지 및 안내 메시지를 표시하는 컴포넌트입니다.
 *
 * @param {string} text -- 화면에 렌더링할 메시지 텍스트
 * @param {'check' | 'alert'} type -- 안내 메시지인 경우 check, 에러 메시지인 경우 alert
 * @param {number} width -- 컴포넌트의 max-width. 전달하지 않으면 500px로 적용됩니다.
 * @param {function} onClick -- type이 check일 때 나타나는 '재전송' 버튼 클릭 시 실행될 콜백 함수
 *
 * @example
 * {errors.nickname?.message && <Alert text={errors.nickname?.message} type="alert" width={440}></Alert>}
 * <Alert text="인증 메일 전송됨" type="check" width={440} onClick={() => alert('재전송')}></Alert>
 *
 * @author 김진효
 * **/

interface AlertProps {
  text: string;
  type: 'check' | 'alert';
  width?: number;
  onClick?: () => void;
}

const Alert = ({ text, type, width, onClick }: AlertProps) => {
  const Icon = type === 'check' ? CheckIcon : AlertIcon;

  return (
    <div
      className={clsx(
        'flex items-center gap-[8px] px-[24px] py-[13px] rounded-[5px] text-[16px] font-medium tracking-[-0.15px] w-full',
        !width && 'max-w-[500px]',
        type === 'alert' && 'bg-[rgba(253,117,101,0.1)] text-negative',
        type === 'check' && 'bg-[rgba(60,78,244,0.1)] text-primary-color',
      )}
      style={{ maxWidth: width }}>
      <Icon />

      {/* 에러 메시지인 경우 */}
      {type === 'alert' && text}

      {/* 안내 메시지인 경우 */}
      {type === 'check' && (
        <div className="flex justify-between w-full">
          {text}
          <button onClick={onClick} className="text-[17px] font-medium tracking-[-0.15px] underline cursor-pointer">
            재전송
          </button>
        </div>
      )}
    </div>
  );
};

export default Alert;
