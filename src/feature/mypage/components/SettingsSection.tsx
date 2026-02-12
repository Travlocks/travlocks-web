import { useState } from 'react';
import clsx from 'clsx';
import SectionHeader from './SectionHeader';
import ProfileEditForm from './ProfileEditForm';
import TravelStyleSection, { type TravelStyle } from './TravelStyleSection';
import InterestThemeSection, { type InterestTheme } from './InterestThemeSection';

interface SettingsSectionProps {
  initialNickname?: string;
  email: string;
  initialBio?: string;
  initialTravelStyles?: TravelStyle[];
  initialInterestThemes?: InterestTheme[];
  onSave?: (data: {
    nickname: string;
    bio: string;
    travelStyles: TravelStyle[];
    interestThemes: InterestTheme[];
  }) => void;
  isSaving?: boolean;
  className?: string;
}

const MAX_SELECTABLE_PREFERENCES = 2;

const SettingsSection = ({
  initialNickname = '',
  email,
  initialBio = '',
  initialTravelStyles = [],
  initialInterestThemes = [],
  onSave,
  isSaving = false,
  className,
}: SettingsSectionProps) => {
  const [nickname, setNickname] = useState(initialNickname);
  const [bio, setBio] = useState(initialBio);
  const [travelStyles, setTravelStyles] = useState<TravelStyle[]>(initialTravelStyles);
  const [interestThemes, setInterestThemes] = useState<InterestTheme[]>(initialInterestThemes);

  const handleToggleTravelStyle = (style: TravelStyle) => {
    setTravelStyles((prev) => {
      if (prev.includes(style)) {
        return prev.filter((s) => s !== style);
      }

      if (prev.length >= MAX_SELECTABLE_PREFERENCES) {
        return prev;
      }

      return [...prev, style];
    });
  };

  const handleToggleInterestTheme = (theme: InterestTheme) => {
    setInterestThemes((prev) => {
      if (prev.includes(theme)) {
        return prev.filter((t) => t !== theme);
      }

      if (prev.length >= MAX_SELECTABLE_PREFERENCES) {
        return prev;
      }

      return [...prev, theme];
    });
  };

  const handleSave = () => {
    onSave?.({
      nickname,
      bio,
      travelStyles,
      interestThemes,
    });
  };

  return (
    <div className={clsx('flex flex-col gap-7', className)}>
      <SectionHeader title="설정" />

      <div className="p-9 bg-base-color-6 border border-base-color rounded-[10px]">
        {/* Profile Edit Form Section */}
        <h3 className="h4 text-base-color-0 mb-8">프로필 편집</h3>

        <ProfileEditForm
          nickname={nickname}
          email={email}
          bio={bio}
          onNicknameChange={setNickname}
          onBioChange={setBio}
          onNicknameClear={() => setNickname('')}
          onBioClear={() => setBio('')}
        />

        {/* Travel Style Section */}
        <div className="mt-10">
          <TravelStyleSection selectedStyles={travelStyles} onToggleStyle={handleToggleTravelStyle} />
        </div>

        {/* Interest Theme Section */}
        <div className="mt-10">
          <InterestThemeSection selectedThemes={interestThemes} onToggleTheme={handleToggleInterestTheme} />
        </div>

        {/* Save Button */}
        <div className="flex justify-end mt-10">
          <button
            type="button"
            disabled={isSaving}
            onClick={handleSave}
            className="h10 w-[217px] h-[65px] bg-primary-color text-base-color-6 rounded-[15px] cursor-pointer hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed">
            {isSaving ? '저장 중...' : '변경사항 저장'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;
