import OnboardingWidget from '@/feature/block/onboarding/widgets/OnboardingWidget';

const OnboardingPage = () => {
  return (
    <section className="mx-auto flex w-[1200px] h-[1131px] flex-col gap-12 rounded-[10px] border border-[#D9D9D9] bg-white p-[28px]">
      {/* 제목 */}
      <h2 className="h4 text-base-color-0">사전 정보 입력</h2>

      {/* form 영역*/}
      <div className="flex-1">
        <OnboardingWidget />
      </div>
    </section>
  );
};

export default OnboardingPage;
