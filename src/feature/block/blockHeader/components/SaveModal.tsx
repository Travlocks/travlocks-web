import { useState, type SetStateAction } from 'react';
import clsx from 'clsx';
import { Controller, useFormContext } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';

import { VISIBILITY, type FormFields } from '../BlockHeader';
import ImageUploadForm from '../../vlockModal/component/ImageUploadForm';
import Input from '@/shared/components/Form/Input';
import SingleButton from '@/shared/components/Button/SingleButton';
import type { RequestSaveTemplateDto } from '../types/template';
import usePatchSaveTemplate from '../hooks/mutations/usePatchSaveTemplate';

interface SaveModalProps {
  selectedId: number;
  setSelectedId: React.Dispatch<SetStateAction<number>>;
  setShowSaveModal: React.Dispatch<SetStateAction<boolean>>;
}

const SaveModal = ({ selectedId, setSelectedId, setShowSaveModal }: SaveModalProps) => {
  const { register, control, handleSubmit } = useFormContext<FormFields>();
  const { mutate } = usePatchSaveTemplate();

  const { templateId } = useParams();
  const navigate = useNavigate();
  const [cover, setCover] = useState<File | null>(null);

  const onSubmit = (data: FormFields) => {
    const body: RequestSaveTemplateDto = {
      title: data.title,
      description: data.description,
      coverImage: cover,
      isPublic: selectedId === 1,
    };

    mutate(
      { templateId: Number(templateId), body },
      {
        onSuccess: (data) => {
          setShowSaveModal(false);
          navigate(`/block/${data.data.templateId}`);
        },
      },
    );
  };

  return (
    <div
      onClick={() => setShowSaveModal(false)}
      className="fixed inset-0 h-dvh flex justify-center items-center z-30 bg-[rgba(74,85,105,0.6)] backdrop-blur-[1.5px] py-[20px]">
      <div
        onClick={(e) => e.stopPropagation()}
        className="mt-[110px] w-[534px] max-h-[calc(100dvh-120px)] h-max rounded-[30px] bg-base-color-6 py-[45px] px-[40px] flex flex-col gap-[20px]">
        <div className="flex justify-between items-center">
          <p className="h9">템플릿 저장하기</p>

          <div className="px-[6px] py-[6px] flex gap-[6px] items-center rounded-[5px] bg-base-color-4">
            {VISIBILITY.map((button) => (
              <button
                key={button.id}
                onClick={() => setSelectedId(button.id)}
                className={clsx(
                  'py-[4px] px-[15px] h8 text-[14px] cursor-pointer rounded-[5px] transition-all',
                  selectedId === button.id ? 'bg-white text-primary-color' : 'bg-base-color-4 text-base-color-3',
                )}>
                {button.text}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[20px] max-h-[588px] h-full overflow-y-auto">
          <div className="relative">
            <ImageUploadForm
              type="create"
              onImageChange={(file) => setCover(file)}
              onImageDelete={() => setCover(null)}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="h9 font-[400]">
              <span className="text-negative">*</span> 여행 타이틀
            </p>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                // @ts-expect-error - field 타입과 register 타입 일치하지 않아 임시 타입 오류 무시
                <Input
                  {...field}
                  label="left"
                  placeholder="여행 타이틀을 입력해주세요"
                  hasCancel={true}
                  className="border-base-color! w-full!"
                />
              )}
            />
          </div>

          <div className="flex flex-col gap-[10px]">
            <p className="h9 font-[400]">상세 설명</p>
            <textarea
              {...register('description')}
              placeholder="이 템플릿에 대한 상세 설명을 남겨주세요"
              className={clsx(
                `h-[120px] b4 w-full py-[16px] rounded-[10px] border border-base-color bg-base-color-6 placeholder:font-"Pretendard" placeholder:text-base-color-3 placeholder:tracking-[-0.15px] outline-none resize-none pt-[17px] pl-[18px]`,
              )}
            />
          </div>
        </div>

        <div className="flex gap-[20px]">
          <SingleButton text="취소" width={107} height={64} variant="white" onClick={() => setShowSaveModal(false)} />
          <SingleButton text="저장" width={327} height={64} variant="primary" onClick={handleSubmit(onSubmit)} />
        </div>
      </div>
    </div>
  );
};

export default SaveModal;
