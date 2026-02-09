import Profile from '@assets/Navbar/profile-happy.svg?react';
import MypageIcon from '@assets/Navbar/icon-mypage.svg?react';
import LogoutIcon from '@assets/Navbar/icon-logout.svg?react';
import { useEffect, useRef, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';

interface NavbarMenuModalProps {
  setShowMenu: React.Dispatch<SetStateAction<boolean>>;
  setShowLogoutModal: React.Dispatch<SetStateAction<boolean>>;
}

const NavbarMenuModal = ({ setShowMenu, setShowLogoutModal }: NavbarMenuModalProps) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const TABS = [
    {
      id: 1,
      icon: <MypageIcon className="size-[20px]" />,
      label: '마이페이지',
      onClick: () => {
        navigate('/mypage');
      },
    },
    {
      id: 2,
      icon: <LogoutIcon className="size-[20px]" />,
      label: '로그아웃',
      onClick: () => {},
    },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setShowMenu(false); // 외부 클릭시 닫히도록
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowMenu]);

  return (
    <>
      <div
        ref={modalRef}
        className="absolute z-modal right-0 top-[85px] bg-white rounded-[30px] w-[307px] shadow-[0_1px_20px_0_rgba(0,0,0,0.10)] px-[27px] pt-[27px] pb-[16px]">
        <div className="flex gap-[16px] items-center pb-[18px] border-b border-base-color">
          <Profile className="size-[60px]" />
          <div className="flex flex-col gap-[4px]">
            <p className="t2">유저닉네임</p>
            <p className="b4 text-base-color-1">your@email.com</p>
          </div>
        </div>

        <div>
          {TABS.map((tab) => (
            <div
              key={tab.id}
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(false);
                tab.onClick();

                if (tab.id === 2) {
                  setShowLogoutModal(true);
                }
              }}
              className="py-[16px] px-[5px] flex items-center gap-[16px] text-base-color-2 hover:text-base-color-1">
              {tab.icon}
              <p className="b3">{tab.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default NavbarMenuModal;
