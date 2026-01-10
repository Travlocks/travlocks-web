import ChevronRightIcon from '@/shared/assets/icon-chevron-right.svg?react';
import React from 'react';

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  onClick?: () => void;
}

const StatusCard = ({ icon, label, count, onClick }: StatusCardProps) => {
  return (
    <div
      className="flex flex-col flex-1 bg-base-color-6 border border-base-color-3 rounded-[10px] p-8 shadow-sm hover:shadow-md cursor-pointer justify-between"
      onClick={onClick}>
      <div className="flex items-center gap-1.5 mb-3">
        <div className="text-primary-color">{icon}</div>
        <span className="h9 text-base-color-1">{label}</span>
      </div>
      <div className="flex flex-col items-end">
        <span className="h1 text-base-color-0">{count}</span>
        <div className="flex items-center text-base-color-1 b2 mt-3">
          <span>보러가기</span>
          <ChevronRightIcon />
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
