import { QUERY_KEY } from '@/shared/constants/key';
import { useQuery } from '@tanstack/react-query';
import { getTemplateDetail } from '../../apis/block';

function useGetTemplateDetail(templateId: number) {
  return useQuery({
    queryKey: [QUERY_KEY.template, templateId],
    queryFn: () => getTemplateDetail(templateId),
  });
}

export default useGetTemplateDetail;
