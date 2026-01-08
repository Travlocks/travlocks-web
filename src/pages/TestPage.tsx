import Button from '@/shared/components/Button/Button';
import DualButton from '@/shared/components/Button/DualButton';
import RoundButton from '@/shared/components/Button/RoundButton';
import SingleButton from '@/shared/components/Button/SingleButton';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import Input from '@/shared/components/Form/Input';
import Alert from '@/shared/components/Form/Alert';

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
    </>
  );
};

export default TestPage;
