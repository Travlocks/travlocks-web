import LocationIcon from '@/shared/assets/icon-location.svg?react';
import StarFilledIcon from '@/shared/assets/icon-star-filled.svg?react';
import StarEmptyIcon from '@/shared/assets/icon-star-empty.svg?react';

export interface TripItemProps {
  location: string;
  dateRange: string;
  rating?: number;
  showRating?: boolean;
}

const TripItem = ({ location, dateRange, rating, showRating = false }: TripItemProps) => {
  const renderStars = () => {
    if (!showRating || rating === undefined) return null;

    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((star) =>
          star <= rating ? (
            <StarFilledIcon key={star} className="w-5 h-5" />
          ) : (
            <StarEmptyIcon key={star} className="w-5 h-5" />
          ),
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-2 px-6 py-5 bg-base-color-5 rounded-[10px]">
      <div className="flex items-center gap-1 text-base-color-1 b4">
        <LocationIcon className="w-4 h-5" />
        <span>{location}</span>
        <span className="mx-1">·</span>
        <span>{dateRange}</span>
      </div>
      {renderStars()}
    </div>
  );
};

export default TripItem;
