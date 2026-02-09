import { useNavigate } from 'react-router-dom';
import RoundButton from '@/shared/components/Button/RoundButton';
import Navbar from '@/shared/components/Navbar/Navbar';
import NotFoundSvg from '@assets/exceptions/404.svg?react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-dvh bg-base-color-6">
      <Navbar />

      <div className="flex flex-col items-center justify-center min-h-[calc(100dvh-109px)] px-4">
        <NotFoundSvg className="w-full max-w-[1100px]" />

        {/* 텍스트 영역 */}
        <h1 className="h3 font-medium text-base-color-0 mt-4">페이지를 찾을 수 없어요</h1>
        <p className="b2 font-light text-base-color-2 mt-2">여기에는 끼워 맞출 수 없는 블록이 없는것 같아요..</p>

        {/* 홈으로 돌아가기 */}
        <div className="mt-8 w-full max-w-[516px]">
          <RoundButton text="홈으로 돌아가기" onClick={() => navigate('/')} />
        </div>
      </div>
    </div>
  );
}
