import { useQuery } from '@tanstack/react-query';
import { getTemplateDetail } from '../../api/templateDetail.api';

export const TEMPLATE_DETAIL_QUERY_KEY = 'templateDetail';

/**
 * 템플릿 상세 정보를 조회하는 커스텀 훅
 * @param templateId 템플릿 ID
 */
export const useTemplateDetail = (templateId: number | null) => {
  return useQuery({
    queryKey: [TEMPLATE_DETAIL_QUERY_KEY, templateId],
    queryFn: () => getTemplateDetail(templateId!),
    enabled: !!templateId, // templateId가 있을 때만 호출
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
