import { NavLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import Logo from '@assets/Navbar/icon-nav-logo.svg?react';
import Puzzle from '@assets/Navbar/icon-puzzle.svg?react';
import AlarmOn from '@assets/Navbar/icon-alarm-on.svg?react';
import AlarmOff from '@assets/Navbar/icon-alarm-off.svg?react';
import Profile from '@assets/Navbar/profile-happy.svg?react';

const MENU = [
  { id: 1, label: '홈', to: '/' },
  { id: 2, label: '템플릿 탐색', to: '/template' },
  { id: 3, label: '블록 쌓기', to: '/block' },
];

const Navbar = () => {
  const alarm = false; // Todo: 추후 api 연결 시 수정

  const navigate = useNavigate();

  return (
    <nav className="relative bg-white flex justify-center px-8 z-header">
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
              className="py-[5px] px-[12px] rounded-[30px] hover:bg-base-color-5 flex items-center gap-[13px] cursor-pointer"
              onClick={() => {
                navigate('/mypage');
              }}>
              <Profile className="size-[40px]" />
              <p className="base-color-0 b3">유저닉네임</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
