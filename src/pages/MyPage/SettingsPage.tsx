import { Link } from 'react-router-dom';
import ArrowRightIcon from '@assets/icon-arrow-right.svg?react';
import SettingCard from '@/feature/mypage/setting/components/SettingCard';
import PasswordSection from '@/feature/mypage/setting/components/PasswordSection';
import NotificationSection from '@/feature/mypage/setting/components/NotificationSection';
import DataPrivacySection from '@/feature/mypage/setting/components/DataPrivacySection';
import DeleteAccountSection from '@/feature/mypage/setting/components/DeleteAccountSection';

const SettingsPage = () => {
  return (
    <div className="bg-[#F8FAFC] min-h-dvh py-12">
      <div className="mx-auto w-full max-w-300">
        {/* 뒤로가기 */}
        <Link to="/mypage" className="flex items-center gap-[15px] mb-8">
          <ArrowRightIcon className="text-base-color-1 rotate-180" fill="#4A5569" />
          <span className="b2 font-light text-base-color-1">마이페이지로 돌아가기</span>
        </Link>

        {/* 페이지 헤더 */}
        <div className="mb-12">
          <h1 className="h1 font-medium text-base-color-0">계정설정</h1>
          <p className="b2 font-light text-base-color-1 mt-3.5">
            비밀번호 변경 및 보안, 알림 설정을 안전하게 관리하세요
          </p>
        </div>

        {/* 섹션들 */}
        <div className="flex flex-col gap-25">
          <SettingCard title="비밀번호 관리">
            <PasswordSection />
          </SettingCard>

          <SettingCard title="알림 설정">
            <NotificationSection />
          </SettingCard>

          <SettingCard title="데이터 및 개인정보">
            <DataPrivacySection />
          </SettingCard>

          <SettingCard title="계정 삭제" barColor="secondary">
            <DeleteAccountSection />
          </SettingCard>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
