import ModalLayout from './layouts/ModalLayout';
import SingleButton from '@/shared/components/Button/SingleButton';
import VisibilityToggle from './components/VisibilityToggle';
import ImageUploadForm from './components/ImageUploadForm';
import InputField from './components/InputField';

interface TemplateModalProps {
  data: string;
  onClose?: () => void;
  onSubmit?: () => void;
}

const TemplateModal = ({ data, onClose, onSubmit }: TemplateModalProps) => {
  const initialData = data;
  console.log(initialData);

  return (
    <ModalLayout
      title="템플릿 저장하기"
      onClose={onClose}
      footer={
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex-[1]">
            <SingleButton
              text="취소"
              width="full"
              height={64}
              bg="--color-base-color-6"
              className="h8 text-base-color-0"
              onClick={onClose}
            />
          </div>
          <div className="flex-[3]">
            <SingleButton text="저장" width="full" height={64} className="h8 text-base-color-6" onClick={onSubmit} />
          </div>
        </div>
      }
      headerExtra={<VisibilityToggle enabled={false} onChange={() => {}} />}>
      <div className="flex flex-col gap-[20px]">
        <ImageUploadForm type="edit" initialPreviewUrl={null} onImageChange={() => {}} onImageDelete={() => {}} />

        <InputField
          label="여행 타이틀"
          placeholder="여행 타이틀을 입력해주세요"
          type="text"
          value=""
          onChange={() => {}}
        />

        <InputField
          label="상세 설명"
          placeholder="이 템플릿에 대한 상세 설명을 남겨주세요"
          type="textarea"
          value=""
          onChange={() => {}}
          isRequired={false}
        />
      </div>
    </ModalLayout>
  );
};

export default TemplateModal;
