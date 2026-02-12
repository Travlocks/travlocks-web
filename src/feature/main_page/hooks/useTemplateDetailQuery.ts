import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { getTemplateDetail } from '../apis/sidebar';
import type { TemplateDetailData } from '../types/sidebar';

export const useTemplateDetailQuery = (templateId: number | null) => {
  return useQuery<TemplateDetailData>({
    queryKey: [QUERY_KEY.template, 'detail', templateId],
    queryFn: async () => {
      if (templateId == null) {
        throw new Error('templateId is required');
      }

      const response = await getTemplateDetail(templateId);
      return response.data;
    },
    enabled: templateId != null,
  });
};
