import { useQuery } from '@tanstack/react-query';
import { getMyFavoriteTemplates, getMyTemplates } from '../apis/mypage';
import type { TemplateCardDto } from '../types/mypage.type';
import type { PageResponse } from '@/shared/types/pagination';

export type MyTemplateFilter = 'created' | 'favorite';

export const useMyTemplatesQuery = (page = 0, filter: MyTemplateFilter = 'created') => {
  return useQuery<PageResponse<TemplateCardDto>>({
    queryKey: ['my-templates', filter, page],
    queryFn: async () => {
      const response = filter === 'favorite' ? await getMyFavoriteTemplates(page) : await getMyTemplates(page);
      return response.data;
    },
  });
};
