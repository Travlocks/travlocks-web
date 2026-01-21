import clsx from 'clsx';
import TextField from '@/shared/components/TextField/TextField';

interface ProfileEditFormProps {
  nickname: string;
  email: string;
  bio: string;
  onNicknameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onNicknameClear: () => void;
  onBioClear: () => void;
  className?: string;
}

const ProfileEditForm = ({
  nickname,
  email,
  bio,
  onNicknameChange,
  onBioChange,
  onNicknameClear,
  onBioClear,
  className,
}: ProfileEditFormProps) => {
  return (
    <div className={clsx(className)}>
      {/* 닉네임 + 이메일 */}
      <div className="flex gap-5 mb-5">
        <TextField
          label="닉네임"
          value={nickname}
          onChange={(e) => onNicknameChange(e.target.value)}
          onClear={onNicknameClear}
          helperText="닉네임은 2자 이상 ~ 10자 이하로 입력해주세요"
          className="flex-1"
        />

        {/* TODO: TextField에 leftIcon prop 추가 필요, 혹은 회원가입에서 사용하는 컴포넌트로 교체 */}
        <TextField
          label="이메일"
          type="email"
          value={email}
          disabled
          helperText="이메일은 변경할 수 없습니다"
          className="flex-1"
        />
      </div>

      {/* 한줄소개*/}
      <TextField
        label="한줄소개"
        value={bio}
        onChange={(e) => onBioChange(e.target.value)}
        onClear={onBioClear}
        placeholder="한줄소개 내용이 이곳에 들어갑니다"
      />
    </div>
  );
};

export default ProfileEditForm;
