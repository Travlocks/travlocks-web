import { axiosInstance } from '@/shared/apis/axios';
import { toTripDayCount, type TripDaysKey } from '@/shared/constants/tripDays';
import type {
  CanvasData,
  ResponseCanvasDto,
  RequestCreateBlockDto,
  RequestReorderBlocksDto,
  ResponseCreateBlockDto,
  ResponseDeleteBlockDto,
  ResponseReorderBlocksDto,
  ResponseTemplateSummaryDto,
} from '../blockBuild.type';

// 서버의 tripDays 타입을 number로 변환
type ResponseCanvasRawDto = Omit<ResponseCanvasDto, 'data'> & {
  data: Omit<CanvasData, 'tripDays'> & {
    tripDays: TripDaysKey;
  };
};

const normalizeCanvasResponse = (response: ResponseCanvasRawDto): ResponseCanvasDto => {
  return {
    ...response,
    data: {
      ...response.data,
      tripDays: toTripDayCount(response.data.tripDays),
    },
  };
};

// 캔버스 조회
export const getBlockCanvas = async (templateId: number, dayNo: number): Promise<ResponseCanvasDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseCanvasRawDto>(`/templates/${templateId}/days/${dayNo}/canvas`);
    return normalizeCanvasResponse(data);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 일정 요약 조회
export const getTemplateSummary = async (templateId: number): Promise<ResponseTemplateSummaryDto> => {
  try {
    const { data } = await axiosInstance.get<ResponseTemplateSummaryDto>(`/templates/${templateId}/summary`);
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 블록 추가
export const postBlock = async (
  templateId: number,
  dayNo: number,
  body: RequestCreateBlockDto,
): Promise<ResponseCreateBlockDto> => {
  try {
    const { data } = await axiosInstance.post<ResponseCreateBlockDto>(
      `/templates/${templateId}/days/${dayNo}/vlocks`,
      body,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 블록 삭제
export const deleteBlock = async (
  templateId: number,
  dayNo: number,
  templateVlocksId: number,
): Promise<ResponseDeleteBlockDto> => {
  try {
    const { data } = await axiosInstance.delete<ResponseDeleteBlockDto>(
      `/templates/${templateId}/days/${dayNo}/vlocks/${templateVlocksId}`,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// 블록 순서 변경
export const patchBlocksReorder = async (
  templateId: number,
  dayNo: number,
  body: RequestReorderBlocksDto,
): Promise<ResponseReorderBlocksDto> => {
  try {
    const { data } = await axiosInstance.patch<ResponseReorderBlocksDto>(
      `/templates/${templateId}/days/${dayNo}/vlocks/reorder`,
      body,
    );
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
