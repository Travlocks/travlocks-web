import React, { useState } from 'react';
import Star from './Star';
import { formatOneDecimal } from '@/shared/utils/format';

interface StarRatingProps {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ initialRating = 0, onRatingChange, size = 40 }) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const displayRating = hoverRating !== null ? hoverRating : rating;

  const handleHover = (index: number) => {
    setHoverRating(index + 1);
  };

  const handleClick = (index: number) => {
    const newRating = index + 1;
    const formattedRatingString = formatOneDecimal(newRating); // "1.0", "2.0" 등 문자열 포맷팅
    const formattedRatingNumber = parseFloat(formattedRatingString); // 숫자로 다시 변환

    console.log(`[StarRating] Rating Change: ${formattedRatingString}`);

    setRating(newRating);
    if (onRatingChange) onRatingChange(formattedRatingNumber);
  };

  const handleLeave = () => {
    setHoverRating(null);
  };

  return (
    <div className="flex items-center gap-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <Star
          key={index}
          size={size}
          isFilled={displayRating > index}
          onHover={() => handleHover(index)}
          onClick={() => handleClick(index)}
          onLeave={handleLeave}
        />
      ))}
    </div>
  );
};

export default StarRating;
