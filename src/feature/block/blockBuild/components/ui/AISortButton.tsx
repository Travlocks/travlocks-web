import React from 'react';
import { AISortButtonStyles } from '@/feature/block/blockBuild/AISortButton.style';
import IconShine from '@/feature/block/blockBuild/assets/icon-shine.svg?react';
import { useAISmartSort } from '../../hooks/mutations/useAISmartSort';
import { useParams } from 'react-router-dom';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';

type AISortButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const AISortButton = ({ className, type = 'button', ...props }: AISortButtonProps) => {
  const { templateId } = useParams();
  const { currentDay } = useBlockTemplateStore();

  const { mutate: aiSmartSort } = useAISmartSort({ templateId: Number(templateId), dayNo: currentDay });
  const handleAISort = () => {
    aiSmartSort({ templateId: Number(templateId), dayNo: currentDay });
  };

  return (
    <button type={type} className={AISortButtonStyles.Root(className)} {...props} onClick={handleAISort}>
      <div
        className={AISortButtonStyles.Background()}
        style={{
          backgroundImage: 'var(--background-image-gradient-color-hover)',
        }}
      />

      <div className={AISortButtonStyles.Inner()}>
        <div className={AISortButtonStyles.IconWrapper()}>
          <IconShine className={AISortButtonStyles.Icon()} />
        </div>

        <div className="flex flex-col items-start justify-center text-left">
          <div className={AISortButtonStyles.TitleWrapper()}>
            <p className={AISortButtonStyles.TitleDefault()}>AI 스마트 정렬</p>
            <p
              className={AISortButtonStyles.TitleHover()}
              style={{ backgroundImage: 'var(--background-image-gradient-color-hover)' }}>
              AI 스마트 정렬
            </p>
          </div>
          <p className={AISortButtonStyles.Description()}>현재 쌓인 블록들의 이동거리와 시간을 최적화할까요?</p>
        </div>
      </div>
    </button>
  );
};

export default AISortButton;
