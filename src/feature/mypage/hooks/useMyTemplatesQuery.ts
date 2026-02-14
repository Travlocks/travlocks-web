import { useQuery } from '@tanstack/react-query';
import { getMyTemplates } from '../apis/mypage';
import type { TemplateCard } from '../types/mypage.type';
import type { PageResponse } from '@/shared/types/pagination';

export const useMyTemplatesQuery = (page = 0) => {
  return useQuery<PageResponse<TemplateCard>>({
    queryKey: ['my-templates', page],
    queryFn: async () => {
      const response = await getMyTemplates(page);
      return response.data;
    },
  });
};
