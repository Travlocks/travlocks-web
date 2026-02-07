import { useForm, FormProvider } from 'react-hook-form';
import { useEffect } from 'react';
import clsx from 'clsx';

import Input from '@/shared/components/Form/Input';
import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x.svg?react';

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const VALIDATION_RULES = [
  { id: 1, label: '최소 8자 이상' },
  { id: 2, label: '영문 + 숫자 포함' },
];

const PasswordSection = () => {
  const methods = useForm<PasswordFormData>({
    mode: 'onChange',
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const {
    register,
    watch,
    formState: { errors, dirtyFields },
    trigger,
  } = methods;

  const newPassword = watch('newPassword');
  const confirmPassword = watch('confirmPassword');

  const isLengthValid = newPassword.length >= 8;
  const hasLetter = /[A-Za-z]/.test(newPassword);
  const hasNumber = /\d/.test(newPassword);
  const isCombinationValid = hasLetter && hasNumber;

  useEffect(() => {
    if (confirmPassword) {
      void trigger('confirmPassword');
    }
  }, [newPassword, confirmPassword, trigger]);

  const canSubmit =
    !!newPassword && !!confirmPassword && !errors.confirmPassword && isLengthValid && isCombinationValid;

  const handleSubmit = methods.handleSubmit((_data) => {
    // TODO: 비밀번호 변경 API 연동
  });

  return (
    <FormProvider {...methods}>
      <h3 className="h4 font-medium text-base-color-0 mb-5">비밀번호 변경</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 px-[11px]">
        {/* 현재 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">현재 비밀번호</label>
          <Input
            register={register('currentPassword')}
            type="password"
            label="left"
            placeholder="기존 비밀번호를 입력하세요."
            autoComplete="current-password"
            width={1130}
          />
        </div>

        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">새 비밀번호</label>
          <Input
            register={register('newPassword')}
            type="password"
            label="left"
            placeholder="새 비밀번호를 입력해주세요. (8자 이상, 영문/숫자/특수문자 포함)"
            autoComplete="new-password"
            width={1130}
          />

          {/* 비밀번호 유효성 검사 */}
          <div className="flex flex-col gap-1 mt-1">
            {VALIDATION_RULES.map((rule) => (
              <div
                key={rule.id}
                className={clsx(
                  'flex gap-[10px] items-center b4 font-normal ml-[15px]',
                  !dirtyFields.newPassword && 'text-base-color-2',
                  dirtyFields.newPassword &&
                    ((rule.id === 1 ? isLengthValid : isCombinationValid) ? 'text-positive' : 'text-negative'),
                )}>
                <div className="size-[19px] flex items-center justify-center">
                  {!dirtyFields.newPassword && <CheckIcon />}
                  {dirtyFields.newPassword &&
                    ((rule.id === 1 ? isLengthValid : isCombinationValid) ? (
                      <CheckIcon />
                    ) : (
                      <XIcon className="object-cover" />
                    ))}
                </div>
                <p>{rule.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">비밀번호 확인</label>
          <div className="relative">
            <Input
              register={register('confirmPassword', {
                validate: (value) => value === newPassword || '비밀번호가 일치하지 않습니다.',
              })}
              type="password"
              label="left"
              placeholder="비밀번호를 확인해주세요."
              autoComplete="new-password"
              width={1130}
              error={!!errors.confirmPassword?.message}
            />

            {/* 비밀번호 불일치 에러 */}
            {errors.confirmPassword?.message && (
              <div className="flex items-center gap-[10px] left-[15px] absolute top-[61px]">
                <div className="rounded-full bg-negative size-[17px] text-center text-[14px] font-normal tracking-[-0.15px] text-white">
                  <p className="translate-y-[-2px]">!</p>
                </div>
                <p className="text-negative b4 font-normal">{errors.confirmPassword.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* 변경사항 저장 버튼 */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            disabled={!canSubmit}
            className={clsx(
              'h9 px-8 h-[50px] text-base-color-6 rounded-[10px] cursor-pointer transition-all',
              'bg-primary-color hover:opacity-90',
              'disabled:bg-base-color-3 disabled:cursor-not-allowed',
            )}>
            변경사항 저장
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PasswordSection;
