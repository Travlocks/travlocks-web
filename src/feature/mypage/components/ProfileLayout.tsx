import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import ArrowRightIcon from '@assets/icon-arrow-right.svg?react';
import mainBackgroundUrl from '@/shared/assets/backgrounds/mainBg.svg';
import ProfileListContainer from '@/feature/mypage/components/ProfileListContainer';

interface ProfileLayoutProps {
  nickname: string;
  introduction?: string | null;
  profileImageUrl?: string | null;
  title: string;
  description: string;
  children: ReactNode;
}

const ProfileLayout = ({
  nickname,
  introduction,
  profileImageUrl,
  title,
  description,
  children,
}: ProfileLayoutProps) => {
  return (
    <div className="min-h-dvh bg-white">
      <div className="relative h-[280px] overflow-hidden bg-[#9FCDFF]">
        <img
          src={mainBackgroundUrl}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover object-top"
        />

        <div className="relative mx-auto w-full max-w-300 px-6 pt-10">
          <Link
            to="/mypage"
            className="inline-flex h-[52px] items-center rounded-[15px] bg-white/95 pl-2 pr-[18px] shadow-[0_8px_24px_rgba(74,85,105,0.12)] backdrop-blur-sm">
            <ArrowRightIcon className="h-[31px] w-[27px] rotate-180 text-base-color-1" fill="#4A5569" />
            <span className="pl-1.5 text-2xl font-medium leading-none text-base-color-1">마이페이지로 돌아가기</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 w-full bg-white">
        <div className="mx-auto w-full max-w-300 px-6 pb-16">
          <div className="relative pt-0">
            <div className="absolute left-0 top-0 flex w-[242px] aspect-square -translate-y-1/2 items-center justify-center overflow-hidden rounded-full border-8 border-white bg-base-color-4 shadow-[0_10px_24px_rgba(74,85,105,0.18)]">
              {profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt={`${nickname} 프로필 이미지`}
                  className="h-full w-full bg-base-color-4"
                />
              ) : (
                <div className="h-full w-full bg-base-color-4" />
              )}
            </div>
            <div className="ml-[282px] flex flex-col justify-start pt-3 text-left">
              <h1 className="text-[38px] font-semibold leading-none text-base-color-0">{nickname}</h1>
              <p className="mt-[11px] text-[28px] font-medium leading-none text-base-color-3">
                {introduction || '소개가 없습니다.'}
              </p>
            </div>
          </div>

          <div className="mt-14">
            <ProfileListContainer title={title} description={description}>
              {children}
            </ProfileListContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;
