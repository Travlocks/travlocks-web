import SummaryCard from './components/SummaryCard';

const data = {
  templateId: 555,
  totalVlocks: 9,
  totalStayMinutes: 540,
  totalMoveMinutes: 85,
};

const BlockSummary = () => {
  return (
    <div className="rounded-[30px] mt-[79px] border border-base-color bg-white max-w-[302px] w-full h-max">
      <div className="py-[28px] pl-[24px] border-b border-base-color h8">일정 요약</div>

      <div className="py-[32px] mx-[24px] border-b border-base-color">
        <SummaryCard data={data} />
      </div>

      <p className="px-[24px] pt-[12px] pb-[28px] text-base-color-2 b6 text-[14px]">
        일정 요약은 사전조사에서 선택한 이동 수단과 여행 성향을 바탕으로 계산되었습니다
      </p>
    </div>
  );
};

export default BlockSummary;
