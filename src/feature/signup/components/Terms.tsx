import Button from '@/shared/components/Button/Button';
import Checkbox from '@/shared/components/Form/Checkbox';
import { useState } from 'react';
import type { StepProps } from './Modal';
import ArrowIcon from '@assets/icon-arrow-right.svg?react';

const Terms = ({ setLevel }: StepProps) => {
  const [agreements, setAgreements] = useState({
    service: false,
    privacy: false,
    marketing: false,
    all: false,
  });

  const isRequired = agreements.service && agreements.privacy;

  return (
    <section className="flex flex-col gap-[25px]">
      <p className="text-base-color-1 b1 mt-[3px]">트래블록스 서비스 이용을 위해 약관 동의가 필요합니다</p>

      <Checkbox
        text="전체 동의"
        outline={true}
        checked={agreements.all}
        onChange={(checked) =>
          setAgreements({
            all: checked,
            service: checked,
            privacy: checked,
            marketing: checked,
          })
        }
      />

      <Checkbox
        text={
          <div className="flex gap-[3px]">
            <span className="text-negative">(필수)</span> 서비스 이용약관
            <ArrowIcon />
          </div>
        }
        outline={false}
        checked={agreements.service}
        onChange={(checked) =>
          setAgreements((prev) => ({
            ...prev,
            service: checked,
            all: checked && prev.privacy && prev.marketing,
          }))
        }
      />

      <Checkbox
        text={
          <div className="flex gap-[3px]">
            <span className="text-negative">(필수)</span> 개인정보 처리방침
            <ArrowIcon />
          </div>
        }
        outline={false}
        checked={agreements.privacy}
        onChange={(checked) =>
          setAgreements((prev) => ({
            ...prev,
            privacy: checked,
            all: prev.service && checked && prev.marketing,
          }))
        }
      />
      <Checkbox
        text={
          <div className="flex gap-[3px]">
            <span className="text-base-color-1">(선택)</span> 마케팅 정보 수신 동의
            <ArrowIcon />
          </div>
        }
        outline={false}
        checked={agreements.marketing}
        onChange={(checked) =>
          setAgreements((prev) => ({
            ...prev,
            marketing: checked,
            all: prev.service && prev.privacy && checked,
          }))
        }
      />

      <Button text="다음" disabled={!isRequired} onClick={() => setLevel((prev) => prev + 1)} />
    </section>
  );
};

export default Terms;
