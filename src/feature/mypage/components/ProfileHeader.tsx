import { Link } from 'react-router-dom';
import SettingsIcon from '@/shared/assets/icon-settings.svg?react';
import clsx from 'clsx';

interface ProfileHeaderProps {
  nickname: string;
  introduction?: string | null;
  profileImageUrl?: string | null;
  className?: string;
}

const ProfileHeader = ({ nickname, introduction, profileImageUrl, className }: ProfileHeaderProps) => {
  return (
    <div className={clsx('flex items-start justify-between w-full mb-12', className)}>
      <div className="flex items-center gap-8">
        {/* Avatar */}
        <div className="relative w-45 h-45 rounded-full bg-base-color-6 flex items-center justify-center border-8 border-base-color-6 overflow-hidden">
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={`${nickname} 프로필 이미지`}
              className={clsx('bg-base-color-4 w-full h-full')}
            />
          ) : (
            <div className="bg-base-color-4 w-full h-full" />
          )}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className="h1 text-base-color-0">{nickname}</h1>
          <p className="h5 text-base-color-2">{introduction || '소개가 없습니다.'}</p>
        </div>
      </div>

      <Link
        to="/mypage/settings"
        className="flex items-center gap-1.25 px-6.25 py-3.25 border border-base-color rounded-[10px] text-base-color-2 h6 hover:bg-base-color-4 transition-colors mt-13">
        <SettingsIcon />
        계정 설정
      </Link>
    </div>
  );
};

export default ProfileHeader;
