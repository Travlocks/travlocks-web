import { axiosInstance } from '@/shared/apis/axios';
import type {
  CreateVlockModalRequestDto,
  UpdateVlockModalRequestDto,
  CreateVlockModalResponseDto,
  UpdateVlockModalResponseDto,
  DeleteVlockModalResponseDto,
} from '../types/vlockModal.types';

/**
 * Vlock 생성 API
 * @param request - Vlock 생성 데이터
 * @param coverImg - 커버 이미지 파일 (선택)
 */
export const createVlock = async (
  request: CreateVlockModalRequestDto,
  coverImg?: File | null,
): Promise<CreateVlockModalResponseDto> => {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 추가
  formData.append('request', JSON.stringify(request));

  // 커버 이미지가 있으면 추가, 없으면 빈 Blob 추가 (백엔드 필수 요구사항 대응)
  if (coverImg) {
    formData.append('coverImg', coverImg);
  } else {
    formData.append('coverImg', new Blob(), '');
  }

  const { data } = await axiosInstance.post<CreateVlockModalResponseDto>('/vlocks', formData);

  return data;
};

/**
 * Vlock 수정 API
 * @param vlockId - 수정할 Vlock ID
 * @param request - Vlock 수정 데이터
 * @param coverImg - 새로운 커버 이미지 파일 (선택)
 */
export const updateVlock = async (
  vlockId: number,
  request: UpdateVlockModalRequestDto,
  coverImg?: File | null,
): Promise<UpdateVlockModalResponseDto> => {
  const formData = new FormData();

  // JSON 데이터를 문자열로 변환하여 추가
  formData.append('request', JSON.stringify(request));

  // 새로운 커버 이미지가 있으면 추가, 없으면 빈 Blob 추가
  if (coverImg) {
    formData.append('coverImg', coverImg);
  } else {
    formData.append('coverImg', new Blob(), '');
  }

  const { data } = await axiosInstance.put<UpdateVlockModalResponseDto>(`/vlocks/${vlockId}`, formData);

  return data;
};

/**
 * Vlock 삭제 API
 * @param vlockId - 삭제할 Vlock ID
 */
export const deleteVlock = async (vlockId: number): Promise<DeleteVlockModalResponseDto> => {
  const { data } = await axiosInstance.delete<DeleteVlockModalResponseDto>(`/vlocks/${vlockId}`);

  return data;
};
