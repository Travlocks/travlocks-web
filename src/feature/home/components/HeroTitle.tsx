import RoundButton from '@/shared/components/Button/RoundButton';

export const HeroTitle = () => {
  return (
    <div className="text-center">
      <h1 className="h1 mb-[13px] tracking-[0.352px]">
        조립하는 즐거움, <br />
        나만의 여행 블록 쌓기
      </h1>
      <p className="h9 text-base-color-1">복잡한 여행 계획을 간단하게 만드는 가장 쉬운 방법</p>
      <RoundButton text="여행 조립하러 떠나기" />
    </div>
  );
};
