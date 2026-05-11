import type { Meta, StoryObj } from '@storybook/react-vite';
import { useRef, useState } from 'react';

import type { ResponseGetMeDto } from '@/feature/user/types/user';

import NavbarMenuModal from './NavbarMenuModal';

const mockMe: ResponseGetMeDto = {
  isSuccess: true,
  successCode: 'OK',
  successMessage: '',
  data: {
    memberId: 1,
    nickname: '스토리북',
    introduction: '',
    profileImageUrl: 'https://placehold.co/120x120/png',
    email: 'story@example.com',
    preferredTravelStyleIds: [],
    preferredTravelThemeIds: [],
    counts: { vlockCount: 0, templateCount: 0, starCount: 0 },
    recent: { createdVlocks: [], createdTemplates: [] },
  },
};

function MenuModalHost() {
  const profileRef = useRef<HTMLDivElement>(null);
  const [, setShowMenu] = useState(true);
  const [, setShowLogout] = useState(false);

  return (
    <div className="relative min-h-[360px] bg-base-color-5 p-8">
      <p className="b4 text-base-color-2 mb-4">프로필 영역(클릭 아웃사이드 테스트용)</p>
      <div
        ref={profileRef}
        className="inline-flex items-center gap-2 rounded-full border border-base-color-3 bg-white px-3 py-2">
        <div className="size-10 overflow-hidden rounded-full bg-base-color-4" />
        <span className="b3">프로필</span>
      </div>
      <NavbarMenuModal
        setShowMenu={setShowMenu}
        setShowLogoutModal={setShowLogout}
        data={mockMe}
        profileRef={profileRef}
      />
    </div>
  );
}

const meta = {
  title: 'Shared/Navbar/MenuModal',
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    memoryRouter: { initialEntries: ['/mypage'] },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  render: () => <MenuModalHost />,
};
