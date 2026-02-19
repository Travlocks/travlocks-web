import StarRating from '@/shared/components/Rating/StarRating';

interface TemplateRatingModalProps {
  templateTitle?: string;
  templateAuthorName?: string;
  rating: number;
  reviewComment: string;
  isSubmitting: boolean;
  onRatingChange: (rating: number) => void;
  onCommentChange: (comment: string) => void;
  onSubmit: () => void;
  onSkip: () => void;
}

const TemplateRatingModal = ({
  templateTitle,
  templateAuthorName,
  rating,
  reviewComment,
  isSubmitting,
  onRatingChange,
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
            {(templateAuthorName ?? '작성자') + '님의 템플릿은 어떠셨나요?'}
            <br />
            해당 템플릿을 1~5점으로 평가해주세요
          </p>
        </div>

        <div className="flex justify-center">
          <StarRating initialRating={rating} onRatingChange={onRatingChange} size={38} />
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
