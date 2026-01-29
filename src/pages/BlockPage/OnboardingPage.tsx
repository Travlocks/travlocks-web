import TravelThemeSelector from '@/feature/block/onboarding/components/TravelThemeSelector';
import TransportTypeSelector from '@/feature/block/onboarding/components/TransportTypeSelector';
import TripDurationDropdown from '@/feature/block/onboarding/components/TripDurationDropdown';

const OnboardingPage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* 컨텐츠 영역 */}
      <div className="px-[360px] pt-[157px]">
        <div className="flex flex-col gap-[60px]">
          {/* (1) 헤더 영역 */}
          <header className="flex flex-col items-center gap-[40px]">
            <p className="h5 text-base-color-1">나만의 여행 일정을 블록을 쌓듯이 쉽고 재미있게 만들어요!</p>
            <h1 className="h1 text-[60px]">블록 쌓기</h1>
          </header>

          {/* (2) 흰 박스 영역 */}
          <section className="mx-auto flex w-[1200px] h-[1131px] flex-col gap-12 rounded-[10px] border border-[#D9D9D9] bg-white p-[28px]">
            {/* 제목 */}
            <h2 className="h4 text-base-color-0">사전 정보 입력</h2>

            {/* form 영역*/}
            <div className="flex-1">
              <TripDurationDropdown />
              <TransportTypeSelector />
              <TravelThemeSelector />
            </div>

            {/* 제출 버튼 */}
            <button
              type="button"
              className="h9 text-base-color-6 w-[217px] h-[65px] p-[13px_25px] rounded-[15px] self-end bg-base-color-3 cursor-pointer">
              설정 완료
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
