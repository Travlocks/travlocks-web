import Button from '@/shared/components/Button/Button';
import RoundButton from '@/shared/components/Button/RoundButton';

const TestPage = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1>✅ Button.tsx</h1>
        <Button text="Vlock 쌓으러 가기" />
        <Button text="Vlock 쌓으러 가기" variant="gradient" />
        <Button text="Vlock 쌓으러 가기" bg="bg-red-400" />
      </div>

      <div className="flex flex-col gap-2">
        <h1>✅ RoundButton.tsx</h1>
        <RoundButton text="여행 조립하러 떠나기" width={292} />
        <RoundButton text="여행 시작하기" />
      </div>
    </>
  );
};

export default TestPage;
