import StarIcon from '@/shared/assets/icon-star-rating.svg?react';
import React from 'react';

interface StarProps {
  isFilled: boolean;
  size?: number;
  onHover: () => void;
  onClick: () => void;
  onLeave: () => void;
}

const Star: React.FC<StarProps> = ({ isFilled, size = 40, onHover, onClick, onLeave }) => {
  return (
    <div className="relative cursor-pointer transition-transform hover:scale-110 active:scale-95">
      {/* 그라데이션 정의를 위한 SVG*/}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id="star-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop stopColor="#3C4EF4" offset="0%" />
            <stop stopColor="#00CCFF" offset="100%" />
          </linearGradient>
        </defs>
      </svg>

      <StarIcon
        width={size}
        height={size}
        onMouseOver={onHover}
        onClick={onClick}
        onMouseLeave={onLeave}
        fill={isFilled ? 'url(#star-gradient)' : '#D3D3D3'}
        className="transition-colors duration-200"
        style={{ color: isFilled ? 'transparent' : '#D3D3D3' }}
      />
    </div>
  );
};

export default Star;
