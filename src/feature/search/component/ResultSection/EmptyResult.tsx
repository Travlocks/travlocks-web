import SingleButton from '@/shared/components/Button/SingleButton';
import ArrowRightIcon from '@/shared/assets/icon-arrow-right-with-bar.svg?react';
import MascotSadIcon from '@/shared/assets/mascot-sad.svg?react';

/**
 * 검색 결과가 없을 때 표시되는 컴포넌트
 *
 * @remarks
 * - 선택한 필터 조건에 맞는 템플릿이 없을 때 표시됩니다.
 * - 마스코트 아이콘과 함께 안내 메시지를 보여줍니다.
 */
const EmptyResult = () => {
  return (
    <>
      <div className="w-full py-[40px] flex flex-col gap-[28px] items-center bg-base-color-6 rounded-[30px] border border-base-color">
        <div className="w-[200px] h-[200px] m-[0px_40px_0px_0px]">
          <MascotSadIcon />
        </div>

        <div className="flex flex-col items-center gap-[18px]">
          <p className="h6">해당 조건에 맞는 템플릿이 없어요.</p>
          <p className="b3 text-base-color-2">다른 조건으로 검색해보세요.</p>
        </div>

        {/* CTA 버튼 클릭 시 이동 경로 확인 후 연결 예정 */}
        <SingleButton
          text="여행 조립하러 떠나기"
          textSize={20}
          onClick={() => {}}
          type="button"
          width={290}
          height={64}
          className="h8 rounded-[30px] text-base-color-6"
          icon={<ArrowRightIcon />}
          iconPosition="right"
        />
      </div>
    </>
  );
};

export default EmptyResult;
