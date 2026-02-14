import clsx from 'clsx';
import React from 'react';
import ChevronRightIcon from '@assets/icon-chevron-right.svg?react';

interface StatusCardProps {
  icon: React.ReactNode;
  label: string;
  count: number;
  onClick?: () => void;
  className?: string;
}

const StatusCard = ({ icon, label, count, onClick, className }: StatusCardProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col flex-1 bg-base-color-6 border border-base-color rounded-[10px] p-8 shadow-sm hover:shadow-md cursor-pointer justify-between',
        className,
      )}
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
