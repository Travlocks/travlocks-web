import { axiosInstance } from '@/shared/apis/axios';
import type { ApiError } from '@/shared/types/error';
import type { SearchTemplateParams, SearchTemplateResponseDTO } from '../types/searchTemplate.types';

/**
 * 템플릿 탐색 API 호출
 */
export async function getTemplates(params: SearchTemplateParams): Promise<SearchTemplateResponseDTO> {
  try {
    const { data } = await axiosInstance.get<SearchTemplateResponseDTO>('/templates/explore', {
      params,
      paramsSerializer: (params) => {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (Array.isArray(value)) {
            // 배열인 경우 콤마로 연결하여 전송 (예: cities=서울,경기)
            if (value.length > 0) {
              searchParams.append(key, value.join(','));
            }
          } else if (value !== undefined && value !== null) {
            searchParams.append(key, String(value));
          }
        });
        return searchParams.toString();
      },
    });
    return data;
  } catch (error) {
    const apiError = error as ApiError;
    // 404 Not Found 또는 사전에 정의된 특정 에러 코드시 빈 결과 반환
    if (apiError.response?.status === 404 || apiError.response?.data?.errorCode === 'TEMPLATE_NO_MATCH') {
      return {
        isSuccess: true,
        successCode: 'TEMPLATE_EXPLORE_EMPTY',
        successMessage: '조건에 맞는 템플릿이 없습니다.',
        data: {
          content: [],
          page: 0,
          size: 0,
          totalElements: 0,
          totalPages: 0,
          first: true,
          last: true,
          empty: true,
        },
      };
    }
    throw error;
  }
}
