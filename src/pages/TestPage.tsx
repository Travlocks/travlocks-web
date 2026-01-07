import Button from '@/shared/components/Button/Button';

const TestPage = () => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h1>✅ Button.tsx</h1>
        <Button text="Vlock 쌓으러 가기" />
        <Button text="Vlock 쌓으러 가기" variant="gradient" />
        <Button text="Vlock 쌓으러 가기" bg="bg-red-400" />
      </div>
    </>
  );
};

export default TestPage;
