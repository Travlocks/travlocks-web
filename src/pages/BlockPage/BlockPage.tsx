import BlockEditor from '@/feature/block/blockBuild/components/BlockEditor';
import { useBlockTemplateStore } from '@/shared/stores/blockTemplateStore';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Level } from '@/feature/block/blockBuild/types/level';
import BlockHeader from '@/feature/block/blockHeader/BlockHeader';
import BlockSummary from '@/feature/block/blockSummary/BlockSummary';
import TemplateRatingModal from './TemplateRatingModal';
// import TemplateModal from '@/feature/block/vlockModal/TemplateModal';
// import { useShallow } from 'zustand/react/shallow';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '@/shared/constants/key';
import { toTripDayCount } from '@/shared/constants/tripDays';
import { getTemplateDetail, postTemplateRating } from '@/shared/apis/template';
import { toast } from '@/shared/stores/toastStore';
import { extractErrorMessage } from '@/shared/utils/apiErrorHandler';
import { useRemixReviewStore } from '@/shared/stores/remixReviewStore';

const BlockPage = () => {
  const { templateId } = useParams<{ templateId?: string }>();
  // const templateIdNum = templateId ? Number(templateId) : null;
  const setTemplateId = useBlockTemplateStore((s) => s.setTemplateId);
  const setTemplateTitle = useBlockTemplateStore((s) => s.setTemplateTitle);
  const setTripDays = useBlockTemplateStore((s) => s.setTripDays);
  const [level, setLevel] = useState<Level>('timeline');
  const [isSummaryUpdating, setIsSummaryUpdating] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewTargetTemplateId, setReviewTargetTemplateId] = useState<number | null>(null);
  const [rating, setRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const consumePendingReview = useRemixReviewStore((s) => s.consumePendingReview);
  // const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);

  // const { templateTitle, templateDescription, templateCoverImageUrl } = useBlockTemplateStore(
  //   useShallow((s) => ({
  //     templateTitle: s.templateTitle,
  //     templateDescription: s.templateDescription,
  //     templateCoverImageUrl: s.templateCoverImageUrl,
  //   })),
  // );
  // const setTemplateInfo = useBlockTemplateStore((s) => s.setTemplateInfo);
  const templateIdNum = Number(templateId);
  const hasValidTemplateId = typeof templateId === 'string' && Number.isInteger(templateIdNum) && templateIdNum > 0;
  const { mutate: submitTemplateRating, isPending: isSubmittingRating } = useMutation({
    mutationFn: ({
      targetTemplateId,
      rating,
      content,
    }: {
      targetTemplateId: number;
      rating: number;
      content?: string;
    }) =>
      postTemplateRating(targetTemplateId, {
        rating,
        content,
      }),
  });

  const { data: templateDetail } = useQuery({
    queryKey: [QUERY_KEY.template, templateIdNum, 'detail'],
    enabled: hasValidTemplateId,
    queryFn: async () => {
      const response = await getTemplateDetail(templateIdNum);
      return response.data;
    },
  });

  useEffect(() => {
    setTemplateId(templateId ?? null);
  }, [setTemplateId, templateId]);

  useEffect(() => {
    if (!templateDetail) return;
    setTemplateTitle(templateDetail.title ?? '');
    setTripDays(toTripDayCount(templateDetail.tripDays));
  }, [setTemplateTitle, setTripDays, templateDetail]);

  useEffect(() => {
    if (!isReviewModalOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsReviewModalOpen(false);
        setReviewTargetTemplateId(null);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isReviewModalOpen]);

  const handleReviewSubmit = () => {
    if (rating === 0) return;
    if (!reviewTargetTemplateId) {
      toast.error('유효한 템플릿 정보가 없어 평가할 수 없습니다.', 'bottom-center');
      return;
    }
    if (isSubmittingRating) return;

    const trimmedContent = reviewComment.trim();

    submitTemplateRating(
      {
        targetTemplateId: reviewTargetTemplateId,
        rating,
        content: trimmedContent || undefined,
      },
      {
        onSuccess: () => {
          toast.success('템플릿 평가가 등록되었습니다.', 'bottom-center');
          setIsReviewModalOpen(false);
          setReviewTargetTemplateId(null);
        },
        onError: (error) => {
          toast.error(extractErrorMessage(error, '템플릿 평가 등록에 실패했습니다.'), 'bottom-center');
        },
      },
    );
  };

  const handleTemplateSaveSuccess = (savedTemplateId: number) => {
    const parentTemplateId = useRemixReviewStore.getState().pendingReviewByTemplateId[savedTemplateId];
    if (!parentTemplateId) return;

    consumePendingReview(savedTemplateId);
    setReviewTargetTemplateId(parentTemplateId);
    setRating(0);
    setReviewComment('');
    setIsReviewModalOpen(true);
  };

  return (
    <div className="flex justify-center bg-base-color-5 px-3 relative">
      <div className="flex flex-col max-w-[1100px] w-full border-x border-base-color">
        {/* <BlockHeader level={level} setLevel={setLevel} onTemplateModalOpenChange={setIsTemplateModalOpen} /> */}
        <BlockHeader level={level} setLevel={setLevel} onSaveSuccess={handleTemplateSaveSuccess} />
        <BlockEditor level={level} setLevel={setLevel} onSummaryUpdatingChange={setIsSummaryUpdating} />
      </div>

      <div className="hidden xl:block absolute left-[calc(50%+575px)] ">
        <BlockSummary isSyncUpdating={isSummaryUpdating} />
      </div>

      {/* {isTemplateModalOpen && templateIdNum != null && (
        <TemplateModal
          templateId={templateIdNum}
          title={templateTitle}
          description={templateDescription}
          coverImgUrl={templateCoverImageUrl}
          onClose={() => setIsTemplateModalOpen(false)}
          onSuccess={(data) => {
            setTemplateInfo({
              title: data.title,
              description: data.description,
              coverImageUrl: data.coverImageUrl,
            });
          }}
        />
      )} */}

      {isReviewModalOpen && (
        <TemplateRatingModal
          templateTitle={templateDetail?.title}
          templateAuthorName={templateDetail?.ownerNickname}
          rating={rating}
          reviewComment={reviewComment}
          isSubmitting={isSubmittingRating}
          onRatingChange={setRating}
          onCommentChange={setReviewComment}
          onSubmit={handleReviewSubmit}
          onSkip={() => {
            setIsReviewModalOpen(false);
            setReviewTargetTemplateId(null);
          }}
        />
      )}
    </div>
  );
};

export default BlockPage;
