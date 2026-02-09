import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Logo from '@assets/Navbar/icon-nav-logo.svg?react';
import Puzzle from '@assets/Navbar/icon-puzzle.svg?react';
import AlarmOn from '@assets/Navbar/icon-alarm-on.svg?react';
import AlarmOff from '@assets/Navbar/icon-alarm-off.svg?react';
import { useState } from 'react';
import NavbarMenuModal from './NavbarMenuModal';
import AccountModal from '@/feature/mypage/components/AccountModal';
import usePostLogout from '@/feature/auth/logout/hooks/mutations/usePostLogout';
import useGetMyPage from '@/feature/user/hooks/queries/useGetMypage';

const MENU = [
  { id: 1, label: '홈', to: '/' },
  { id: 2, label: '템플릿 탐색', to: '/template' },
  { id: 3, label: '블록 쌓기', to: '/block' },
];

const Navbar = () => {
  const alarm = false; // Todo: 추후 api 연결 시 수정

  const navigate = useNavigate();

  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showLogoutModal, setShowLogoutModal] = useState<boolean>(false);

  const { mutate } = usePostLogout(); // 로그아웃
  const { data } = useGetMyPage(); // 내 정보 조회

  const handleLogout = () => {
    mutate(undefined, {
      onSuccess: () => {
        setShowLogoutModal(false);
        window.location.href = '/login';
      },
    });
  };

  return (
    <nav className="relative bg-white flex justify-center px-8 z-header border-b border-[rgba(217,217,217,0.50)]">
      <div className="flex items-center h-[109px] py-[20px] max-w-[1248px] w-full">
        <Logo className="self-start cursor-pointer" onClick={() => navigate('/')} />

        <div className="flex gap-[36px] justify-end items-center flex-1">
          {MENU.map((menu) => (
            <NavLink
              key={menu.id}
              to={menu.to}
              className={({ isActive }) =>
                clsx(
                  'text-base-color-1 text-[23px] font-regular relative',
                  menu.id === 3 &&
                    'py-[12px] px-[30px] rounded-[30px] bg-gradient-color-hover text-white flex items-center gap-[10px] z-1 transition-all duration-300 ease overflow-hidden after:content-[""] after:absolute after:inset-0 after:z-[-1] after:transition-all after:duration-300 after:ease after:scale-[0.1] hover:bg-transparent hover:bg-none hover:text-white hover:after:bg-gradient-color-hover hover:after:scale-[1]',
                  menu.id === 2 && 'ml-[12px]',
                  isActive && 'font-[500]',
                  isActive && menu.id !== 3 && 'text-base-color-0!',
                )
              }>
              {menu.id === 3 && <Puzzle className="relative z-10" />}
              <span className="relative z-10">{menu.label}</span>
            </NavLink>
          ))}

          <div className="flex items-center gap-[15px] ml-[26px]">
            <div className="size-[40px] hover:bg-base-color-5 rounded-full cursor-pointer">
              {!alarm && <AlarmOff className="self-start cursor-pointer" />}
              {alarm && <AlarmOn className="self-start cursor-pointer" />}
            </div>

            <div
              className="relative py-[5px] px-[12px] rounded-[30px] hover:bg-base-color-5 flex items-center gap-[13px] cursor-pointer"
              onClick={() => {
                setShowMenu(true);
              }}>
              <div className="size-[40px]">
                <img
                  src={data?.data.profileImageUrl}
                  alt={`${data?.data.nickname}의 프로필 사진`}
                  className="size-[40px] object-contain"
                />
              </div>
              <p className="base-color-0 b3">{data?.data.nickname}</p>

              {showMenu && (
                <NavbarMenuModal setShowMenu={setShowMenu} setShowLogoutModal={setShowLogoutModal} data={data} />
              )}
            </div>
          </div>
        </div>
      </div>

      {showLogoutModal && (
        <AccountModal
          modalType="logout"
          onCancel={() => {
            setShowLogoutModal(false);
          }}
          onConfirm={handleLogout}
        />
      )}
    </nav>
  );
};

export default Navbar;
