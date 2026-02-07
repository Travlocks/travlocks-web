import { axiosInstance } from '@/shared/apis/axios';
import type {
  RequestCreateBlockDto,
  RequestReorderBlocksDto,
  ResponseCreateBlockDto,
  ResponseDeleteBlockDto,
  ResponseReorderBlocksDto,
} from '../blockBuild.type';

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
