import SummaryCard from './components/SummaryCard';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getTemplateSummary } from '@/feature/block/blockBuild/apis/templateBlockApi';
import { QUERY_KEY } from '@/shared/constants/key';

interface BlockSummaryData {
  totalVlocks: number;
  totalDurationMinutes: number;
  totalMoveMinutes: number;
}

const EMPTY_SUMMARY: BlockSummaryData = {
  totalVlocks: 0,
  totalDurationMinutes: 0,
  totalMoveMinutes: 0,
};

const toMinutes = (hours: number) => Math.max(0, Math.round(hours * 60));

const BlockSummary = () => {
  const { templateId } = useParams<{ templateId?: string }>();
  const templateIdNum = Number(templateId);
  const hasValidTemplateId = typeof templateId === 'string' && Number.isInteger(templateIdNum) && templateIdNum > 0;

  const { data, isPending, isError } = useQuery({
    queryKey: [QUERY_KEY.blockSummary, templateIdNum],
    enabled: hasValidTemplateId,
    queryFn: async () => {
      const response = await getTemplateSummary(templateIdNum);
      const summary = response.data;
      const totalMoveMinutes = Math.max(0, Math.round(summary.totalMoveMinutes));
      const totalDurationMinutes = toMinutes(summary.totalStayHours) + totalMoveMinutes;

      return {
        totalVlocks: summary.totalVlocks,
        totalDurationMinutes,
        totalMoveMinutes,
      };
    },
  });

  const summaryData = data ?? EMPTY_SUMMARY;

  return (
    <div className="rounded-[30px] mt-[79px] border border-base-color bg-white w-[15vw] max-w-[302px] h-max">
      <div className="py-[28px] pl-[24px] border-b border-base-color h8">일정 요약</div>

      <div className="py-[32px] mx-[24px] border-b border-base-color">
        {(!hasValidTemplateId || isPending) && (
          <p className="b6 text-base-color-2 text-[14px]">일정 요약을 불러오는 중입니다.</p>
        )}
        {hasValidTemplateId && !isPending && isError && (
          <p className="b6 text-base-color-2 text-[14px]">일정 요약을 불러오지 못했습니다.</p>
        )}
        {hasValidTemplateId && !isPending && !isError && <SummaryCard data={summaryData} />}
      </div>

      <p className="px-[24px] pt-[12px] pb-[28px] text-base-color-2 b6 text-[14px]">
        일정 요약은 사전조사에서 선택한 이동 수단과 여행 성향을 바탕으로 계산되었습니다
      </p>
    </div>
  );
};

export default BlockSummary;
