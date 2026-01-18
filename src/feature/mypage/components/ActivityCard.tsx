import LocationIcon from '@/shared/assets/icon-location.svg?react';
import StarEmptyIcon from '@/shared/assets/icon-star-empty.svg?react';
import StarFilledIcon from '@/shared/assets/icon-star-filled.svg?react';

interface ActivityCardProps {
  title: string;
  location?: string;
  date?: string;
  description?: string;
  showStar?: boolean;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const ActivityCard = ({
  title,
  location,
  date,
  description,
  showStar = false,
  isFavorite = false,
  onToggleFavorite,
}: ActivityCardProps) => {
  if (showStar) {
    return (
      <div className="px-6.5 py-6.25 bg-base-color-5 rounded-[10px]">
        <div className="flex items-start justify-between gap-5 mb-2.75">
          <p className="b1 text-base-color-0">{title}</p>
          <button
            onClick={onToggleFavorite}
            className="shrink-0 cursor-pointer transition-transform"
            aria-label={isFavorite ? '즐겨찾기 해제' : '즐겨찾기 추가'}>
            {isFavorite ? <StarFilledIcon className="w-7 h-7" /> : <StarEmptyIcon className="w-7 h-7" />}
          </button>
        </div>
        <p className="b3 text-base-color-1">{description}</p>
      </div>
    );
  }

  return (
    <div className="px-6.5 py-6.25 bg-base-color-5 rounded-[10px]">
      <p className="b1 text-base-color-0 mb-0.75">{title}</p>
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-0.75">
          <LocationIcon className="shrink-0" />
          <span className="b3 text-base-color-1">{location}</span>
        </div>
        <span className="b1 text-base-color-1">·</span>
        <span className="b3 text-base-color-1">{date}</span>
      </div>
    </div>
  );
};

export default ActivityCard;
