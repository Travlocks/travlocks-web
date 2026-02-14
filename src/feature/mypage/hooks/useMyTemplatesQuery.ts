import { useQuery } from '@tanstack/react-query';
import { getMyTemplates } from '../apis/mypage';
import type { TemplateCardDto } from '../types/mypage.type';
import type { PageResponse } from '@/shared/types/pagination';

export const useMyTemplatesQuery = (page = 0) => {
  return useQuery<PageResponse<TemplateCardDto>>({
    queryKey: ['my-templates', page],
    queryFn: async () => {
      const response = await getMyTemplates(page);
      return response.data;
    },
  });
};
