import { THEME_COLORS } from './template.constants';
import { TemplateCardStyle } from './styles/TemplateCard.styles';
import RemixIcon from '@/shared/assets/template/icon-remix.svg?react';
import StarIcon from '@/shared/assets/template/icon-star.svg?react';
import PinIcon from '@/shared/assets/template/icon-pin.svg?react';
import SingleButton from '@/shared/components/Button/SingleButton';
import type { Template } from '../home/types/template';
import DefaultThumbnail from '@assets/template/thumbnail.png';
import usePostTemplateRemix from '../home/hooks/mutations/usePostTemplateRemix';
import { useNavigate } from 'react-router-dom';
import { formatOneDecimal } from '@/shared/utils/format';
import useDeleteTemplate from '../user/hooks/mutations/useDeleteTemplate';
import AccountModal from '../mypage/components/AccountModal';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

// Props of TemplateCard
interface TemplateCardProps {
  template: Template; // 표시할 템플릿 데이터
  type?: 'recommended' | 'popular';
  onButtonClick?: (templateId: number) => void; // 버튼 클릭 콜백
  onCardClick?: (templateId: number) => void; // 카드 영역 클릭 콜백
  disableAuthorProfileNavigation?: boolean;
  hasDelete?: boolean;
}

/**
 * 여행 템플릿을 카드 형태로 표시하는 공용 컴포넌트입니다.
 * 홈 화면과 템플릿 탐색 화면에서 사용됩니다.
 *
 * @remarks
 * - AI 추천 템플릿과 인기 템플릿 두 가지 타입을 지원합니다.
 * - 추천 템플릿 타입에서는 지역과 여행 일수 정보를 표시합니다.
 * - 인기 템플릿 타입에서는 평점과 리믹스 수 정보를 표시합니다.
 *
 * @param props - 템플릿 카드 컴포넌트에 전달되는 props입니다.
 * @param props.template - 카드에 표시할 템플릿 데이터입니다.
 * @param props.template - 카드에 표시할 템플릿 데이터입니다.
 * @param props.onButtonClick - 카드 하단 버튼 클릭 시 호출되는 콜백 함수입니다.
 * @param props.onCardClick - 카드 영역 클릭 시 호출되는 콜백 함수입니다.
 *   템플릿 ID를 인자로 전달합니다.
 *
 * @returns 템플릿 카드를 렌더링하는 JSX 엘리먼트를 반환합니다.
 *
 * @example
 * ```tsx
 * // 추천 템플릿 카드 예시입니다.
 * <TemplateCard
 *   template={recommendedTemplate}
 *   onButtonClick={(id) => handleButtonClick(id)}
 *   onCardClick={(id) => handleCardClick(id)}
 * />
 * ```
 */
const TemplateCard = ({
  template,
  type,
  onButtonClick,
  onCardClick,
  disableAuthorProfileNavigation = false,
  hasDelete = false,
}: TemplateCardProps) => {
  const theme = type === 'recommended' ? template.tripTheme : template.travelTheme;

  const navigate = useNavigate();
  const { mutate } = usePostTemplateRemix(); // 템플릿 리믹스
  const canNavigateToAuthorProfile =
    type !== 'recommended' && !disableAuthorProfileNavigation && typeof template.ownerId === 'number';

  const { mutate: mutateDeleteTemplate } = useDeleteTemplate();
  const queryClient = useQueryClient();
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setShowDeleteModal(false);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>, templateId: number) => {
    e.stopPropagation();

    mutateDeleteTemplate(templateId, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['my-templates'] });
      },
    });
    setShowDeleteModal(false);
  };

  return (
    <div className={TemplateCardStyle.wrapper() + 'group'} onClick={() => onCardClick?.(template.templateId)}>
      <div className={TemplateCardStyle.container()}>
        {/* 썸네일 */}
        <div className={TemplateCardStyle.imageContainer}>
          <img
            className={TemplateCardStyle.image()}
            src={template.coverImageUrl || DefaultThumbnail}
            alt={template.title}
          />
        </div>

        {/* 여행 테마 태그 */}
        <div className={TemplateCardStyle.travelTheme()} style={{ backgroundColor: THEME_COLORS[theme!] }}>
          {theme}
        </div>

        {/* 템플릿 정보 */}
        <div className={TemplateCardStyle.content}>
          {/* 상단 영역(제목, 부제목) */}
          <div className={TemplateCardStyle.topSection}>
            <p className={TemplateCardStyle.title}>{template.title}</p>
            <p className={TemplateCardStyle.subtitle}>
              {type === 'recommended' ? (
                template.description
              ) : canNavigateToAuthorProfile ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/member/${template.ownerId}/templates`);
                  }}
                  className="cursor-pointer hover:underline">
                  @{template.ownerNickname}
                </button>
              ) : (
                <span>@{template.ownerNickname}</span>
              )}
            </p>
          </div>

          {/* 하단 영역(메타 정보, 버튼) */}
          <div className={TemplateCardStyle.bottomSection}>
            <div className={TemplateCardStyle.metadata}>
              {type === 'recommended' ? (
                <>
                  <span className={TemplateCardStyle.metadataItem}>
                    <PinIcon className={TemplateCardStyle.pinIcon} />
                    {template.region}
                  </span>
                  <span className={TemplateCardStyle.metadataItem}>{template.tripDays}</span>
                </>
              ) : (
                <>
                  <span className={TemplateCardStyle.metadataItem}>
                    <StarIcon className={TemplateCardStyle.starIcon} />
                    {formatOneDecimal(template.avgRating)}
                  </span>
                  <span className={TemplateCardStyle.metadataItem}>리믹스 {template.remixCount}회</span>
                </>
              )}
            </div>

            <SingleButton
              text={type === 'recommended' ? '이 템플릿 사용하기' : '리믹스 하기'}
              width="full"
              height={45}
              textSize={18}
              variant="white"
              onClick={(e) => {
                e?.stopPropagation();
                onButtonClick?.(template.templateId);
                mutate(template.templateId, {
                  onSuccess: (data) => {
                    navigate(`/block/${data.data.remixedTemplateId}`);
                  },
                });
              }}
              className={TemplateCardStyle.button()}
              icon={type === 'popular' ? <RemixIcon className={TemplateCardStyle.buttonIcon} /> : undefined}
              iconPosition="left"
            />

            {hasDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                className="opacity-0 group-hover:opacity-100 duration-500 flex absolute bottom-[170px] right-[20px] w-[135px] h-[59px] rounded-[30px] bg-white shadow-md justify-center items-center text-base-color-2 b3 cursor-pointer">
                삭제하기
              </button>
            )}
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <AccountModal
          modalType="delete"
          // @ts-expect-error: 이벤트 타입이 달라서 발생하는 TS 오류 무시
          onCancel={(e) => handleCancel(e)}
          // @ts-expect-error: 이벤트 타입이 달라서 발생하는 TS 오류 무시
          onConfirm={(e) => handleDelete(e, template.templateId)}
        />
      )}
    </div>
  );
};

export default TemplateCard;
