import { axiosInstance } from '@/shared/apis/axios';
import { extractErrorMessage, isErrorResponse, isSuccessResponse } from '@/shared/utils/apiErrorHandler';
import type { ErrorPayload } from '@/shared/types/error';
import type {
  ResponseCanvasDto,
  RequestCreateBlockDto,
  RequestReorderBlocksDto,
  ResponseCreateBlockDto,
  ResponseDeleteBlockDto,
  ResponseReorderBlocksDto,
  ResponseOptimizeDto,
} from '../blockBuild.type';

// 캔버스 조회
export const getBlockCanvas = async (templateId: number, dayNo: number): Promise<ResponseCanvasDto> => {
  let responseData: ResponseCanvasDto | ErrorPayload<null>;

  try {
    ({ data: responseData } = await axiosInstance.get<ResponseCanvasDto | ErrorPayload<null>>(
      `/templates/${templateId}/days/${dayNo}/canvas`,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '캔버스 조회 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '캔버스 조회에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// AI 스마트 정렬
export const getAISmartSort = async (templateId: number, dayNo: number): Promise<ResponseOptimizeDto> => {
  let responseData: ResponseOptimizeDto | ErrorPayload<null>;

  try {
    ({ data: responseData } = await axiosInstance.get<ResponseOptimizeDto | ErrorPayload<null>>(
      `/templates/${templateId}/days/${dayNo}/optimize`,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, 'AI 스마트 정렬 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || 'AI 스마트 정렬에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 블록 추가
export const postBlock = async (
  templateId: number,
  dayNo: number,
  body: RequestCreateBlockDto,
): Promise<ResponseCreateBlockDto> => {
  let responseData: ResponseCreateBlockDto | ErrorPayload<null>;

  try {
    ({ data: responseData } = await axiosInstance.post<ResponseCreateBlockDto | ErrorPayload<null>>(
      `/templates/${templateId}/days/${dayNo}/vlocks`,
      body,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '블록 추가 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '블록 추가에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 블록 삭제
export const deleteBlock = async (
  templateId: number,
  dayNo: number,
  templateVlocksId: number,
): Promise<ResponseDeleteBlockDto> => {
  let responseData: ResponseDeleteBlockDto | ErrorPayload<null>;

  try {
    ({ data: responseData } = await axiosInstance.delete<ResponseDeleteBlockDto | ErrorPayload<null>>(
      `/templates/${templateId}/days/${dayNo}/vlocks/${templateVlocksId}`,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '블록 삭제 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '블록 삭제에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};

// 블록 순서 변경
export const patchBlocksReorder = async (
  templateId: number,
  dayNo: number,
  body: RequestReorderBlocksDto,
): Promise<ResponseReorderBlocksDto> => {
  let responseData: ResponseReorderBlocksDto | ErrorPayload<null>;

  try {
    ({ data: responseData } = await axiosInstance.patch<ResponseReorderBlocksDto | ErrorPayload<null>>(
      `/templates/${templateId}/days/${dayNo}/vlocks/reorder`,
      body,
    ));
  } catch (error) {
    throw new Error(extractErrorMessage(error, '블록 순서 변경 중 오류가 발생했습니다.'));
  }

  if (isErrorResponse<null>(responseData)) {
    throw new Error(responseData.errorMessage || '블록 순서 변경에 실패했습니다.');
  }

  if (isSuccessResponse(responseData)) {
    return responseData;
  }

  throw new Error('알 수 없는 응답 형식입니다.');
};
