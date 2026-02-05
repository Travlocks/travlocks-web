import type { Step } from '@/pages/ResetPasswordPage';
import Input from '@/shared/components/Form/Input';
import { usePasswordHeader } from '../hooks/usePasswordHeader';
import clsx from 'clsx';
import CheckIcon from '@assets/icon-check-password.svg?react';
import XIcon from '@assets/icon-x.svg?react';
import { usePasswordConfirmForm } from '../hooks/useResetPasswordForm';
import type { PasswordConfirmFormData } from '@/shared/utils/validationSchemas';
import Button from '@/shared/components/Button/Button';
import { Link } from 'react-router-dom';
// import { AUTH_HEADER } from '@/shared/layouts/auth/authHeaderPresets';
import { AppIcon } from '@/shared/ui/icon/AppIcon';

type Props = {
  step: Step;
  onSubmitResetPassword: (data: PasswordConfirmFormData) => void;
};

const ERRORS = [
  { id: 1, error: '최소 8자 이상' },
  {
    id: 2,
    error: '영문 + 숫자 포함',
  },
];

const PasswordResetView = ({ step, onSubmitResetPassword }: Props) => {
  const { buttonText } = usePasswordHeader(step);

  const { register, submit, canSubmit, errors, dirtyFields, isLengthValid, isCombinationValid } =
    usePasswordConfirmForm(onSubmitResetPassword);

  return (
    <>
      <form onSubmit={submit}>
        <div className="flex flex-col gap-[8px]">
          {/* 비밀번호 입력 */}
          <Input
            register={register('password')}
            type="password"
            label="left"
            placeholder="비밀번호를 입력해주세요."
            autoComplete="new-password"
            width={500}
          />

          {/* 비밀번호 유효성 검사 */}
          {ERRORS.map((error) => (
            <div
              key={error.id}
              className={clsx(
                'flex gap-[10px] items-center b4 ml-[15px]',
                !dirtyFields.password && 'text-base-color-2',
                dirtyFields.password &&
                  ((error.id === 1 ? isLengthValid : isCombinationValid) ? 'text-positive' : 'text-negative'),
              )}>
              <div className="size-[19px] flex items-center justify-center">
                {!dirtyFields.password && <CheckIcon />}
                {dirtyFields.password &&
                  ((error.id === 1 ? isLengthValid : isCombinationValid) ? (
                    <CheckIcon />
                  ) : (
                    <XIcon className="object-cover" />
                  ))}
              </div>

              <p>{error.error}</p>
            </div>
          ))}

          <div className="relative">
            {/* 비밀번호 재입력 */}
            <Input
              register={register('passwordCheck')}
              type="password"
              label="left"
              placeholder="비밀번호를 확인해주세요."
              autoComplete="new-password"
              error={!!errors.passwordCheck?.message}
              width={500}
            />

            {/* 비밀번호 재입력 유효성 검사 */}
            {errors.passwordCheck?.message && (
              <div className="flex items-center justify-center gap-[10px] left-[15px] absolute top-[61px]">
                <div className="rounded-full bg-negative size-[17px] text-center text-[14px] tracking-[-0.15px] text-white">
                  !
                </div>
                <p className="text-negative b3">{errors.passwordCheck.message}</p>
              </div>
            )}
          </div>
        </div>
        <Button
          type="submit"
          disabled={!canSubmit}
          text={buttonText}
          showIcon={false}
          className="mt-10 rounded-[10px]"
        />
        <Link to="/login" className="flex justify-center items-center gap-2.5 mt-5">
          <AppIcon name="arrow" className="rotate-180 text-base-color-1" size={16} />
          <p className="b4 text-base-color-1">로그인으로 돌아가기</p>
        </Link>
      </form>
    </>
  );
};

export default PasswordResetView;
