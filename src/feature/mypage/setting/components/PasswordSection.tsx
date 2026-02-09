import { FormProvider, type UseFormRegisterReturn } from 'react-hook-form';
import { useState } from 'react';
import clsx from 'clsx';

import Input from '@/shared/components/Form/Input';
import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x.svg?react';
import { PASSWORD_VALIDATION_RULES, type PasswordConfirmFormData } from '@/shared/utils/validationSchemas';
import { usePasswordConfirmForm } from '@/feature/auth/password/hooks/useResetPasswordForm';
import { useUpdatePassword } from '../hooks/useUpdatePassword';
import SingleButton from '@/shared/components/Button/SingleButton';
import { toast } from '@/shared/stores/toastStore';

const PasswordSection = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const currentPasswordRegister: UseFormRegisterReturn = {
    name: 'currentPassword',
    onChange: async (e) => {
      setCurrentPassword(e.target.value);
    },
    onBlur: async () => {},
    ref: () => {},
  };

  const { updatePassword, isPending } = useUpdatePassword({
    onSuccess: () => {
      toast.success('수정이 완료되었습니다', 'bottom-center');
    },
    onError: (error) => {
      toast.error(error.message, 'top-center');
    },
  });

  const handleSubmit = (data: PasswordConfirmFormData) => {
    if (!currentPassword) return;
    updatePassword({
      currentPassword,
      newPassword: data.password,
    });
  };

  const formMethods = usePasswordConfirmForm(handleSubmit);
  const { register, submit, canSubmit: baseCanSubmit, errors, isLengthValid, isCombinationValid } = formMethods;

  const canSubmit = baseCanSubmit && !!currentPassword && !isPending;

  return (
    <FormProvider {...formMethods}>
      <h3 className="h4 font-medium text-base-color-0 mb-5">비밀번호 변경</h3>
      <form onSubmit={submit} className="flex flex-col gap-7 px-[11px]">
        {/* 현재 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">현재 비밀번호</label>
          <Input
            register={currentPasswordRegister}
            type="password"
            label="left"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="current-password"
            width={1130}
          />
        </div>
        {/* 새 비밀번호 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">새 비밀번호</label>
          <Input
            register={register('password')}
            type="password"
            label="left"
            placeholder="새 비밀번호를 입력해주세요. (8자 이상, 영문/숫자/특수문자 포함)"
            autoComplete="new-password"
            width={1130}
          />

          {/* 비밀번호 유효성 검사 */}
          <div className="flex flex-col gap-1 mt-1">
            {PASSWORD_VALIDATION_RULES.map((rule) => {
              const isValid = rule.id === 1 ? isLengthValid : isCombinationValid;
              return (
                <div
                  key={rule.id}
                  className={clsx(
                    'flex gap-[10px] items-center b4 font-normal ml-[15px]',
                    isValid ? 'text-positive' : 'text-negative',
                  )}>
                  <div className="size-[19px] flex items-center justify-center">
                    {isValid ? <CheckIcon /> : <XIcon className="object-cover" />}
                  </div>
                  <p>{rule.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* 비밀번호 확인 */}
        <div className="flex flex-col gap-3">
          <label className="t2 font-light text-base-color-0">비밀번호 확인</label>
          <div className="relative">
            <Input
              register={register('passwordCheck')}
              type="password"
              label="left"
              placeholder="새로운 비밀번호를 재입력해주세요."
              autoComplete="new-password"
              width={1130}
              error={!!errors.passwordCheck?.message}
            />

            {/* 비밀번호 불일치 에러 */}
            {errors.passwordCheck?.message && (
              <div className="flex items-center gap-[10px] left-[15px] absolute top-[61px]">
                <div className="rounded-full bg-negative size-[17px] text-center text-[14px] font-normal tracking-[-0.15px] text-white">
                  <p className="translate-y-[-2px]">!</p>
                </div>
                <p className="text-negative b4 font-normal">{errors.passwordCheck.message}</p>
              </div>
            )}
          </div>
        </div>

        {/* 변경사항 저장 버튼 */}
        <div className="flex justify-end mt-4">
          <SingleButton
            text="변경사항 저장"
            width={217}
            height={65}
            textSize={20}
            disabled={!canSubmit}
            onClick={submit}
          />
        </div>
      </form>
    </FormProvider>
  );
};

export default PasswordSection;
