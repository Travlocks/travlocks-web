const TemplatePage = () => {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="py-[157px]">
        <div className="w-full flex flex-col gap-[60px]">
          {/* (1) 헤더 영역 */}
          <header className="flex flex-col items-center gap-[40px]">
            <p className="h5 text-base-color-1">다른 여행자들의 블록을 탐색하고 내 블록으로 리믹스해요!</p>
            <h1 className="h1 text-[60px]">템플릿 탐색</h1>
          </header>
        </div>
      </div>
    </div>
  );
};

export default TemplatePage;
