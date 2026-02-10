import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/scrollToTop';

interface FeatureLayoutProps {
  subtitle: string;
  title: string;
}

/**
 * OnboardingPage와 TemplatePage에서 사용하는 공통 레이아웃 컴포넌트
 *
 * @remarks
 * - 배경: 퍼즐 애니메이션 요소가 포함된 #F8FAFC 배경
 * - 헤더: 부제목과 제목을 중앙 정렬로 표시
 * - 컨텐츠: Outlet으로 렌더링되며 패딩 없음
 *
 * @param subtitle - 상단에 표시될 부제목 텍스트
 * @param title - 메인 제목 텍스트
 */
const FeatureLayout = ({ subtitle, title }: FeatureLayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F8FAFC] relative">
      <ScrollToTop />

      {/* 퍼즐 애니메이션 요소 추가 예정입니다*/}

      {/* 컨텐츠 영역 */}
      <div className="py-[157px]">
        <div className="w-full flex flex-col gap-[60px]">
          <header className="flex flex-col items-center gap-[40px]">
            <p className="h5 text-base-color-1">{subtitle}</p>
            <h1 className="h1 text-[60px]">{title}</h1>
          </header>

          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default FeatureLayout;
