import { useState, useEffect } from 'react';
import InputField from './component/InputField';
import VisibilityToggle from './component/VisibilityToggle';
import ImageUploadForm from './component/ImageUploadForm';
import SingleButton from '@/shared/components/Button/SingleButton';
import XIcon from '@/shared/assets/icon-x-2.svg?react';
import { useUpdateTemplate } from '../blockBuild/hooks/useTemplate';

interface TemplateModalProps {
  templateId: number;
  title?: string;
  description?: string;
  coverImage?: File | null;
  coverImgUrl?: string | null;
  onClose?: () => void;
  onSuccess?: (data: { title: string; description: string; coverImageUrl: string }) => void;
}

const TemplateModal = ({
  templateId,
  title,
  description,
  coverImage,
  coverImgUrl,
  onClose,
  onSuccess,
}: TemplateModalProps) => {
  const updateMutation = useUpdateTemplate();
  // 초기값 설정
  const [formData, setFormData] = useState({
    title: title || '',
    description: description || '',
    isPublic: true,
    coverImage: coverImage || null,
  });

  // 필드 업데이트 함수: data 객체 내부의 값을 업데이트
  // 필드 업데이트 함수
  const updateField = <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // 폼 제출 함수
  const handleFormSubmit = async () => {
    console.log('handleFormSubmit', formData);
    try {
      const result = await updateMutation.mutateAsync({
        templateId,
        request: {
          title: formData.title,
          description: formData.description,
          isPublic: formData.isPublic,
        },
        coverImage: formData.coverImage,
      });

      if (result.isSuccess) {
        console.log('✅ 템플릿 저장 성공:', result);
        onSuccess?.(result.data);
        onClose?.();
      }
    } catch (error) {
      console.error('❌ 템플릿 저장 실패:', error);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[80px_180px] bg-[rgba(74,85,105,0.60)] z-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}>
      <div className="w-[534px] h-[800px] flex flex-col gap-[30px] rounded-[30px] bg-base-color-6 p-[45px_40px] z-modal">
        <div className="flex flex-row justify-between items-center">
          <p className="h6 text-base-color-0">템플릿 저장하기</p>
          <div className="flex items-center gap-[14px]">
            <VisibilityToggle enabled={formData.isPublic} onChange={(val) => updateField('isPublic', val)} />
            <XIcon onClick={onClose} className="cursor-pointer text-base-color-0" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-[20px] overflow-y-auto">
          <ImageUploadForm
            type="edit"
            initialPreviewUrl={coverImgUrl}
            onImageChange={(file) => updateField('coverImage', file)}
            onImageDelete={() => updateField('coverImage', null)}
          />

          <InputField
            label="여행 타이틀"
            value={formData.title}
            placeholder="여행 타이틀을 입력해주세요"
            type="text"
            onChange={(val) => updateField('title', val)}
          />

          <InputField
            label="상세 설명"
            value={formData.description}
            placeholder="이 템플릿에 대한 상세 설명을 남겨주세요"
            type="textarea"
            onChange={(val) => updateField('description', val)}
          />
        </div>
        <div className="flex flex-row gap-[10px]">
          <div className="flex flex-[3]">
            <SingleButton
              text="취소"
              onClick={onClose}
              width="full"
              height={64}
              bg="base-color-6"
              className="border-base-color"
            />
          </div>
          <div className="flex flex-[7]">
            <SingleButton
              text={updateMutation.isPending ? '저장 중...' : '저장'}
              onClick={handleFormSubmit}
              width="full"
              height={64}
              variant="primary"
              disabled={updateMutation.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
