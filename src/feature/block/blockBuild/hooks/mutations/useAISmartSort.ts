import { useMutation } from '@tanstack/react-query';
import { postAISmartSort } from '../../apis/templateBlockApi';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { reorderBlocksByOptimize } from '../../utils/reorderBlocksByOptimize';
import type { ResponseOptimizeDto } from '../../blockBuild.type';
import type { AxiosError } from 'axios';

interface UseAISmartSortParams {
  templateId: number;
  dayNo: number;
}

// AI 스마트 정렬
export const useAISmartSort = ({ templateId, dayNo }: UseAISmartSortParams) => {
  const updateBlocksByDay = useBlockTemplateStore((s) => s.updateBlocksByDay);

  const mutation = useMutation<ResponseOptimizeDto, AxiosError<Error>, UseAISmartSortParams>({
    mutationFn: () => postAISmartSort(templateId, dayNo),
    onSuccess: (data) => {
      if (!data.isSuccess || !data.data?.vlocks) return;

      // 최적 동선 정렬 후 블록 업데이트
      updateBlocksByDay((prev) => {
        const currentBlocks = prev[dayNo] ?? [];
        return { ...prev, [dayNo]: reorderBlocksByOptimize(currentBlocks, data.data.vlocks) };
      });
    },
    onError: (error) => {
      console.error('[useAISmartSort] 최적 동선 생성 실패:', error);
      alert('최적 동선 생성에 실패했습니다. 다시 시도해주세요.');
    },
  });
  return { mutate: mutation.mutate, isPending: mutation.isPending };
};
