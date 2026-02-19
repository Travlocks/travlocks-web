import { useState, useRef } from 'react';
import { FormItem } from './common/FormItem';
import ImageIcon from '@/shared/assets/icon-image.svg?react';
import Thumbnail from '@assets/template/thumbnail.png';

interface ImageUploadFormProps {
  type: 'create' | 'edit';
  initialPreviewUrl?: string | null;
  onImageChange?: (file: File | null) => void;
  onImageDelete?: () => void;
}

const ImageUploadForm = ({ type, initialPreviewUrl, onImageChange, onImageDelete }: ImageUploadFormProps) => {
  const [preview, setPreview] = useState<string | null>(initialPreviewUrl || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      // 부모 컴포넌트에 파일 전달
      onImageChange?.(file);
    }
  };

  const handleDelete = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    onImageDelete?.();
  };

  return (
    <FormItem label="사진">
      <div className="w-full relative h-[246px] border border-base-color rounded-[5px] bg-gradient-color-background overflow-hidden">
        {preview ? (
          <>
            <img src={preview} alt="Preview" className="w-full h-full object-cover relaative" />
            <div className="absolute bottom-[16px] right-[16px] flex gap-[8px]">
              <button
                type="button"
                onClick={handleDelete}
                className="h-[35px] px-[12px] flex items-center justify-center rounded-[5px] border border-negative bg-base-color-6 text-negative b6 cursor-pointer">
                삭제
              </button>
              <button
                type="button"
                onClick={handleButtonClick}
                className="w-[111px] h-[35px] z-content flex flex-row items-center justify-center gap-[4px] rounded-[5px] border border-base-color bg-base-color-6 cursor-pointer">
                <ImageIcon />
                <span className="b6 text-base-color-0">{type === 'create' ? '이미지 첨부' : '이미지 변경'}</span>
              </button>
            </div>
          </>
        ) : (
          <button
            type="button"
            onClick={handleButtonClick}
            className="w-[111px] h-[35px] absolute bottom-[16px] right-[16px] z-content flex flex-row items-center justify-center gap-[4px] rounded-[5px] border border-base-color bg-base-color-6 cursor-pointer">
            <ImageIcon />
            <span className="b6 text-base-color-0">{type === 'create' ? '이미지 첨부' : '이미지 변경'}</span>
          </button>
        )}

        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
        />

        <img src={Thumbnail} className="w-full h-full object-cover" />
      </div>
    </FormItem>
  );
};

export default ImageUploadForm;
