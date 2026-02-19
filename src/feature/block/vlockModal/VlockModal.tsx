import { useEffect, useState } from 'react';
import type { VlockModalRequestDto, UpdateVlockModalFormData, VlockData } from './types/vlockModal.types';

import { useCreateVlock, useUpdateVlock, useDeleteVlock } from './hooks/useVlock';
import { useCategories } from '../blockBuild/hooks/queries/useCategories';
import InputField from './component/InputField';
import Dropdown from './component/VlockCategoryDropdown';
import PlaceSearchField from './component/PlaceSearch';
import VisibilityToggle from './component/VisibilityToggle';
import ImageUploadForm from './component/ImageUploadForm';
import SingleButton from '@/shared/components/Button/SingleButton';
import XIcon from '@/shared/assets/icon-x-2.svg?react';
import { toast } from '@/shared/stores/toastStore';

interface VlockModalProps {
  type: 'create' | 'edit';
  cityId?: number; // 생성 모드 시 필수, 편집 모드 시 기본값으로 사용 가능
  vlockId?: number; // 편집/삭제 모드 시 필요한 Vlock ID
  data?: VlockModalRequestDto; // 편집 모드 시 가져올 데이터
  onSuccess?: (data?: VlockData) => void; // 성공 시 호출될 콜백
  onClose?: () => void; // 모달 창을 닫을 때 호출될 콜백
}

const VlockModal = ({ type, cityId, vlockId, data, onSuccess, onClose }: VlockModalProps) => {
  // React Query Hooks
  const createMutation = useCreateVlock();
  const updateMutation = useUpdateVlock();
  const deleteMutation = useDeleteVlock();
  const { data: categoriesData, isLoading: isCategoriesLoading } = useCategories();
  const categories = categoriesData?.data?.categories ?? [];

  // Edit mode
  const editData = data && data.type === 'edit' ? data.data : null;

  // 초기값 설정
  const [formData, setFormData] = useState<VlockModalRequestDto>(() => {
    if (type === 'create') {
      return {
        type: 'create',
        data: {
          name: '',
          address: '',
          categoryId: 0,
          cityId: cityId || 0,
          memo: '',
          latitude: 0,
          longitude: 0,
          coverImage: null,
        },
      };
    } else {
      return {
        type: 'edit',
        data: {
          name: editData?.name || '',
          address: editData?.address || '',
          categoryId: editData?.categoryId || 0,
          cityId: cityId || editData?.city?.id || editData?.cityId || 0,
          memo: editData?.memo || '',
          latitude: editData?.latitude || 0,
          longitude: editData?.longitude || 0,
          coverImage: editData?.coverImage || null,
          coverImgUrl: editData?.coverImgUrl || null,
          isPublic: editData?.isPublic ?? true,
          deleteCoverImage: editData?.deleteCoverImage ?? false,
        },
      };
    }
  });

  // 필드 업데이트 함수: data 객체 내부의 값을 업데이트
  const updateField = <K extends keyof UpdateVlockModalFormData>(field: K, value: UpdateVlockModalFormData[K]) => {
    setFormData(
      (prev: VlockModalRequestDto) =>
        ({
          ...prev,
          data: {
            ...prev.data,
            [field]: value,
          },
        }) as VlockModalRequestDto,
    );
  };

  // 생성 처리
  const handleCreate = async () => {
    if (formData.type !== 'create') return;

    console.log('[handleCreate] Payload:', {
      request: {
        name: formData.data.name,
        address: formData.data.address,
        categoryId: formData.data.categoryId,
        cityId: formData.data.cityId,
        latitude: formData.data.latitude,
        longitude: formData.data.longitude,
        memo: formData.data.memo,
      },
      coverImg: formData.data.coverImage,
    });

    try {
      const result = await createMutation.mutateAsync({
        request: {
          name: formData.data.name,
          address: formData.data.address,
          categoryId: formData.data.categoryId,
          cityId: formData.data.cityId,
          latitude: formData.data.latitude,
          longitude: formData.data.longitude,
          memo: formData.data.memo || undefined,
        },
        coverImg: formData.data.coverImage,
      });

      if (result.isSuccess) {
        onSuccess?.(result.data as VlockData);
        toast.success('블록 생성이 완료되었습니다.', 'bottom-center');
      } else {
        toast.error('블록 생성에 실패했습니다.', 'bottom-center');
      }
    } catch {
      toast.error('블록 생성 중 오류가 발생했습니다.', 'bottom-center');
    }
  };

  // 수정 처리
  const handleUpdate = async () => {
    if (formData.type !== 'edit' || !vlockId) return;

    console.log('[handleUpdate] Payload:', {
      vlockId,
      request: {
        name: formData.data.name,
        address: formData.data.address,
        categoryId: formData.data.categoryId,
        cityId: formData.data.cityId,
        latitude: formData.data.latitude,
        longitude: formData.data.longitude,
        memo: formData.data.memo,
        isPublic: formData.data.isPublic,
        deleteCoverImg: formData.data.deleteCoverImage,
      },
      coverImg: formData.data.coverImage,
    });

    try {
      const result = await updateMutation.mutateAsync({
        vlockId,
        request: {
          name: formData.data.name,
          address: formData.data.address,
          categoryId: formData.data.categoryId,
          cityId: formData.data.cityId,
          latitude: formData.data.latitude,
          longitude: formData.data.longitude,
          memo: formData.data.memo || undefined,
          isPublic: formData.data.isPublic,
          deleteCoverImg: formData.data.deleteCoverImage,
        },
        coverImg: formData.data.coverImage,
      });

      console.log('✅ Vlock 수정 성공:', result);
      if (result.isSuccess) {
        onSuccess?.(result.data as VlockData);
        toast.success('블록 수정이 완료되었습니다.', 'bottom-center');
      } else {
        toast.error('블록 수정에 실패했습니다.', 'bottom-center');
      }
    } catch {
      toast.error('블록 수정 중 오류가 발생했습니다.', 'bottom-center');
    }
  };

  // 삭제 처리
  const handleDelete = async () => {
    if (!vlockId) return;

    console.log('[handleDelete] vlockId:', vlockId);

    try {
      const result = await deleteMutation.mutateAsync(vlockId);
      console.log('✅ Vlock 삭제 성공:', result);
      onSuccess?.();
      toast.success('블록이 삭제되었습니다.', 'bottom-center');
    } catch (error) {
      console.error('❌ Vlock 삭제 실패:', error);
      toast.error('블록 삭제에 실패했습니다.', 'bottom-center');
    }
  };

  // 폼 제출 함수
  const handleFormSubmit = async () => {
    console.log('[handleFormSubmit] Type:', type, 'Valid:', isFormValid);

    if (!isFormValid) {
      console.warn('[handleFormSubmit] Form is invalid. Missing required fields.');
      return;
    }

    if (type === 'create') {
      await handleCreate();
    } else {
      await handleUpdate();
    }
  };

  const isFormValid =
    formData.data.name.trim() !== '' &&
    formData.data.address.trim() !== '' &&
    formData.data.categoryId !== 0 &&
    formData.data.latitude !== 0 &&
    formData.data.longitude !== 0;

  const isLoading = createMutation.isPending || updateMutation.isPending || deleteMutation.isPending;

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-[80px_180px] bg-[rgba(74,85,105,0.60)]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose?.();
        }
      }}>
      <div className="w-[534px] h-[800px] flex flex-col gap-[30px] rounded-[30px] bg-base-color-6 p-[45px_40px]">
        <div className="flex flex-row justify-between items-center">
          <p className="h6 text-base-color-0">{type === 'create' ? 'Vlock 생성' : 'Vlock 편집'}</p>
          <div className="flex items-center gap-[14px]">
            {formData.type === 'edit' && (
              <VisibilityToggle enabled={formData.data.isPublic} onChange={(val) => updateField('isPublic', val)} />
            )}
            <XIcon onClick={onClose} className="cursor-pointer text-base-color-0" />
          </div>
        </div>

        {/* 스크롤바 우측 패딩 추가(pr-10px) */}
        <div className="flex-1 flex flex-col gap-[20px] overflow-y-auto">
          <Dropdown
            value={formData.data.categoryId}
            categories={categories}
            disabled={isCategoriesLoading}
            onChange={(id) => updateField('categoryId', id)}
          />

          <InputField
            label="이름"
            value={formData.data.name}
            placeholder="Vlock의 이름을 입력해주세요"
            type="text"
            onChange={(val) => updateField('name', val)}
          />
          <InputField
            isRequired={false}
            label="메모"
            value={formData.data.memo ?? ''}
            placeholder="Vlock에 대한 메모를 200자 이내로 남겨주세요"
            type="textarea"
            onChange={(val) => updateField('memo', val)}
          />

          {/* 장소 입력 (임시) */}
          <PlaceSearchField
            label="장소"
            value={formData.data.address}
            onChange={(val) => {
              updateField('address', val);
              // 주소가 비워지면 좌표도 초기화
              if (!val.trim()) {
                setFormData(
                  (prev: VlockModalRequestDto) =>
                    ({
                      ...prev,
                      data: {
                        ...prev.data,
                        address: '',
                        latitude: 0,
                        longitude: 0,
                      },
                    }) as VlockModalRequestDto,
                );
              }
            }}
            onSelect={(place) => {
              updateField('address', place.road_address_name || place.place_name);
              updateField('latitude', Number(place.y));
              updateField('longitude', Number(place.x));
            }}
            required
          />

          <ImageUploadForm
            type={type}
            initialPreviewUrl={formData.type === 'edit' ? formData.data.coverImgUrl : null}
            onImageChange={(file) => {
              updateField('coverImage', file);
              // 이미지가 새로 선택되면 삭제 플래그는 false
              if (file && type === 'edit') {
                updateField('deleteCoverImage', false);
              }
            }}
            onImageDelete={() => {
              updateField('coverImage', null);
              if (type === 'edit') {
                updateField('deleteCoverImage', true);
              }
            }}
          />
        </div>

        {type === 'create' ? (
          <SingleButton
            text={isLoading ? '생성 중...' : '생성하기'}
            onClick={handleFormSubmit}
            width="full"
            height={64}
            disabled={!isFormValid || isLoading}
          />
        ) : (
          <div className="flex flex-col gap-[10px]">
            <span className="h9 flex items-center justify-center text-negative cursor-pointer" onClick={handleDelete}>
              {deleteMutation.isPending ? '삭제 중...' : '삭제하기'}
            </span>
            <SingleButton
              text={isLoading ? '저장 중...' : '저장하기'}
              onClick={handleFormSubmit}
              width="full"
              height={64}
              disabled={!isFormValid || isLoading}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default VlockModal;
