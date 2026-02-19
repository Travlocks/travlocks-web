import OnboardingWidget from '@/feature/block/onboarding/OnboardingWidget';
import OnboardingBackground from '@/feature/block/onboarding/components/OnboardingBackground';
import ScrollToTop from '@/shared/components/scrollToTop';

const OnboardingPage = () => {
  return (
    <div className="relative w-full min-h-screen bg-[#F8FAFC] overflow-hidden">
      <ScrollToTop />

      {/* 배경 애니메이션*/}
      <div className="absolute inset-0 z-0">
        <OnboardingBackground />
      </div>

      {/* 컨텐츠 레이어 */}
      <div className="relative z-above pb-[100px]">
        <div className="w-full flex flex-col gap-[60px]">
          {/* 헤더 섹션 */}
          <header className="flex flex-col items-center gap-[40px] pt-[157px]">
            <p className="h5 text-base-color-1 text-center font-medium">
              나만의 여행 일정을 블록을 쌓듯이 쉽고 재미있게 만들어요!
            </p>
            <h1 className="h1 text-[60px] font-semibold leading-tight text-base-color-0">블록 쌓기</h1>
          </header>

          {/* 위젯 섹션: 온보딩 입력 폼 */}
          <section className="mx-auto flex w-[1200px] min-h-[900px] flex-col gap-12 rounded-[10px] border border-[#D9D9D9] bg-white p-[28px] shadow-lg">
            <div className="flex-1">
              <OnboardingWidget />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
