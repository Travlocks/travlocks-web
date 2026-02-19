import StarEmptyIcon from '@/shared/assets/icon-star-empty.svg?react';
import StarFilledIcon from '@/shared/assets/icon-star-filled.svg?react';

interface TemplateRatingModalProps {
  templateTitle?: string;
  rating: number;
  hoveredRating: number;
  reviewComment: string;
  isSubmitting: boolean;
  onRatingChange: (rating: number) => void;
  onRatingHoverChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
}

const TemplateRatingModal = ({
  templateTitle,
  rating,
  hoveredRating,
  reviewComment,
  isSubmitting,
  onRatingChange,
  onRatingHoverChange,
  onCommentChange,
  onSubmit,
  onSkip,
}: TemplateRatingModalProps) => {
  return (
    <div className="fixed inset-0 h-dvh z-modal-backdrop flex items-center justify-center bg-[rgba(74,85,105,0.6)] backdrop-blur-[1.5px] py-[20px] px-3">
      <section className="mt-[110px] w-[534px] max-h-[calc(100dvh-120px)] h-max rounded-[30px] bg-base-color-6 py-[45px] px-[40px] flex flex-col gap-[20px]">
        <div className="h-[64px] w-full rounded-[10px] bg-primary-color text-base-color-6 h9 flex items-center justify-center">
          템플릿 평가하기
        </div>

        <div className="text-center">
          <p className="h9 text-base-color-0">{templateTitle ?? '템플릿을 평가해 주세요'}</p>
          <p className="mt-[10px] b6 text-base-color-2 leading-[22px]">
            디모님의 템플릿은 어떠셨나요?
            <br />
            해당 템플릿을 1~5점으로 평가해주세요
          </p>
        </div>

        <div className="flex justify-center gap-[8px]">
          {Array.from({ length: 5 }, (_, index) => {
            const starNumber = index + 1;
            const isFilled = starNumber <= (hoveredRating || rating);

            return (
              <button
                key={starNumber}
                type="button"
                onClick={() => onRatingChange(starNumber)}
                onMouseEnter={() => onRatingHoverChange(starNumber)}
                onMouseLeave={() => onRatingHoverChange(0)}
                aria-label={`${starNumber}점`}
                className="cursor-pointer rounded-[6px] p-[2px] transition-transform hover:scale-[1.06]">
                {isFilled ? (
                  <StarFilledIcon className="w-[38px] h-[38px]" />
                ) : (
                  <StarEmptyIcon className="w-[38px] h-[38px]" />
                )}
              </button>
            );
          })}
        </div>

        <textarea
          value={reviewComment}
          onChange={(event) => onCommentChange(event.target.value)}
          placeholder="다른 여행자들을 위해 코멘트를 남겨주세요!"
          className="h-[120px] w-full rounded-[10px] border border-base-color p-[17px_18px] b4 text-base-color-0 outline-none placeholder:text-base-color-3 resize-none"
        />

        <button
          type="button"
          disabled={rating === 0 || isSubmitting}
          onClick={onSubmit}
          className="h-[64px] w-full rounded-[10px] h9 text-base-color-6 bg-primary-color disabled:bg-base-color-3 disabled:cursor-not-allowed cursor-pointer transition-colors">
          {isSubmitting ? '평가하는 중...' : '평가하기'}
        </button>

        <button type="button" onClick={onSkip} className="w-full b3 text-base-color-3 cursor-pointer">
          건너뛰기
        </button>
      </section>
    </div>
  );
};

export default TemplateRatingModal;
