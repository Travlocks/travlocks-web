import Button from '@/shared/components/Button/Button';
import DualButton from '@/shared/components/Button/DualButton';
import RoundButton from '@/shared/components/Button/RoundButton';
import SingleButton from '@/shared/components/Button/SingleButton';

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

      <div>
        <h1>✅ SingleButton.tsx</h1>
        <SingleButton text="변경사항 저장" width={217} height={65} textSize={20} />
      </div>

      <div className="flex flex-col gap-2">
        <h1>✅ DualButton.tsx</h1>
        <DualButton
          left={{
            text: '이전',
            variant: 'white',
          }}
          right={{
            text: '다음',
          }}
          width={215}
          height={64}
          gap={10}
          textSize={20}
        />
        <DualButton
          left={{
            text: '취소',
            variant: 'white',
          }}
          right={{
            text: '동의',
          }}
          width={105}
          height={45}
          gap={17}
          textSize={18}
        />
      </div>
    </>
  );
};

export default TestPage;
