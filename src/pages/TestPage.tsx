import Button from '@/shared/components/Button/Button';
import DualButton from '@/shared/components/Button/DualButton';
import RoundButton from '@/shared/components/Button/RoundButton';
import SingleButton from '@/shared/components/Button/SingleButton';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';
import TemplateSwiper from '@/feature/template/TemplateSwiper';
import { mockPopularTemplates, mockRecommendedTemplates } from '@/feature/template/template.data';
import { Block } from '@/shared/components/Block/Block';
import { createRectPoints } from '@/shared/components/Block/blockShape';
import Footer from '@/shared/components/Footer/Footer';
import MyPage from './MyPage';
import Loading from '@/shared/components/Exception/Loading';

const TestPage = () => {
  const schema = z.object({
    email: z.string().email({ message: '올바르지 않은 이메일' }),
    email2: z.string().email({ message: '가입되지 않은 이메일 주소입니다' }),
    password: z.string().min(8, { message: '비밀번호는 8자 이상' }).max(20, { message: '비밀번호는 20자 이하' }),
    password2: z.string().min(8, { message: '비밀번호는 8자 이상' }).max(20, { message: '비밀번호는 20자 이하' }),
    nickname: z
      .string()
      .min(2, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' })
      .max(10, { message: '닉네임은 2자 이상 ~ 10자 이하로 입력해주세요' }),
  });

  type FormFields = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    defaultValues: {
      email: '',
      email2: '',
      password: '',
      password2: '',
      nickname: '',
    },
    resolver: zodResolver(schema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
  };

  return (
    <>
      <div>
        <MyPage />
      </div>

      <div className="flex flex-col gap-4">
        <h1>✅ Block.tsx</h1>

        <div className="flex gap-6">
          <Block
            category="식당"
            title="향라식당"
            duration="2시간"
            points={[
              { x: 0, y: 0 },
              { x: 160, y: 0 },
              { x: 160, y: 160 },
              { x: 320, y: 160 },
              { x: 320, y: 320 },
              { x: 0, y: 320 },
            ]}
            connections={[
              { edgeIndex: 0, type: 'plug', align: 'start' },
              { edgeIndex: 3, type: 'socket', align: 'end' },
              { edgeIndex: 4, type: 'socket', align: 'start' },
              { edgeIndex: 5, type: 'plug', align: 'end' },
            ]}
          />

          <Block
            category=""
            title="향라식당"
            duration="1시간"
            color="text-positive"
            points={createRectPoints(150, 300)}
            connections={[
              { edgeIndex: 0, type: 'plug', align: 'start' },
              { edgeIndex: 1, type: 'socket', align: 'end' },
              { edgeIndex: 2, type: 'socket', align: 'start' },
              { edgeIndex: 3, type: 'plug', align: 'end' },
            ]}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h1>✅ Button.tsx</h1>
        <Button text="Vlock 쌓으러 가기" />
        <Button text="Vlock 쌓으러 가기" variant="gradient" />
        <Button text="Vlock 쌓으러 가기" bg="bg-red-400" />
      </div>

      <div className="flex flex-col gap-2">
        <h1>✅ RoundButton.tsx</h1>
        <RoundButton text="여행 조립하러 떠나기" width={292} hover />
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

      <div>
        <h1>✅ Input.tsx & Alert.tsx</h1>
        <form className="flex flex-col gap-4 mt-4">
          {/* 아이콘 상단에 있는 input */}
          <Input register={register('email')} type="email" label="top" />
          <Input register={register('password')} type="password" label="top" />

          {/* 아이콘 좌측에 있는 input */}
          <p className="mt-2 -mb-3">👇 Alert.tsx 적용</p>
          <Input register={register('email2')} type="email" label="left" placeholder="your@eamil.com" width={500} />
          {errors.email2?.message && <Alert text={errors.email2?.message} type="alert"></Alert>}

          <Input register={register('password2')} type="password" label="left" />

          <p className="mt-2 -mb-3">👇 Alert.tsx 적용</p>
          <Input
            register={register('nickname')}
            label="left"
            placeholder="닉네임 (한글, 영문 2자 이상 ~ 10자 이하)"
            error={!!errors.nickname?.message}
          />
          {errors.nickname?.message && <Alert text={errors.nickname?.message} type="alert" width={440}></Alert>}
          <Alert text="인증 메일 전송됨" type="check" width={440} onClick={() => alert('재전송')}></Alert>
          <SingleButton text="제출" width={217} height={65} textSize={20} onClick={handleSubmit(onSubmit)} />
        </form>
      </div>

      <div>
        <h1>✅ TemplateSection.tsx (Recommended by AI)</h1>
        <TemplateSwiper cards={mockRecommendedTemplates} />
      </div>

      <div>
        <h1>✅ TemplateSection.tsx (Popular by AI)</h1>
        <TemplateSwiper cards={mockPopularTemplates} />
      </div>

      <Loading fullScreen={true} />

      <Footer />
    </>
  );
};

export default TestPage;
