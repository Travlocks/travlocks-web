import useGetNotificationList from '@/feature/notification/hook/useQuery/useGetNotificationList';
import ShuffleIcon from '@assets/Navbar/icon-shuffle.svg?react';
import { useInView } from 'react-intersection-observer';
import { useEffect, useRef, type SetStateAction } from 'react';

interface NavbarNotificationModal {
  setShowNotificationModal: React.Dispatch<SetStateAction<boolean>>;
  alarmRef: React.RefObject<HTMLDivElement | null>;
}

const NavbarNotificationModal = ({ setShowNotificationModal, alarmRef }: NavbarNotificationModal) => {
  const modalRef = useRef<HTMLDivElement | null>(null);

  const { data: notificationData, fetchNextPage, hasNextPage, isFetching } = useGetNotificationList();
  const notificationsList = notificationData?.pages.map((page) => page.data.notifications).flat() ?? [];
  const hasNotifications = notificationsList.length > 0;

  const { ref, inView } = useInView({ threshold: 0 });

  const handleDelete = () => {
    // setData([]);
  };

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(e.target as Node) &&
        !alarmRef.current?.contains(e.target as Node)
      ) {
        setShowNotificationModal(false);
      }
    };

    document.addEventListener('mousedown', handleOutside);

    return () => {
      document.removeEventListener('mousedown', handleOutside);
    };
  }, [setShowNotificationModal, alarmRef]);

  useEffect(() => {
    if (inView && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, isFetching, hasNextPage, fetchNextPage]);

  return (
    <div
      ref={modalRef}
      className="absolute top-[85px] right-0 w-[585px] bg-white rounded-[30px] px-[34px] pt-[27px] pb-[25px] shadow-[0_1px_20px_0_rgba(0,0,0,0.10)]">
      <div className="flex justify-between pb-[27px] border-b border-base-color">
        <p className="h4">알림</p>
        {hasNotifications && (
          <p onClick={handleDelete} className="h6 font-[500] text-base-color-2">
            전체 삭제
          </p>
        )}
      </div>

      <div className="flex flex-col gap-[20px] py-[25px] overflow-y-auto h-[239px]">
        {notificationsList.map((list) => (
          <div key={list.notificationId} className="flex flex-col">
            <div className="flex gap-[12px] items-center">
              <div className="size-[40px] rounded-full bg-[#E0E7FF] flex justify-center items-center">
                <ShuffleIcon />
              </div>
              <p className="h6 font-[300]">
                <span className="font-[600]">{list.actorNickname}</span>님이 내 템플릿을 리믹스했습니다
              </p>
            </div>

            <p className="text-end text-base-color-2 mt-[-4px]">{list.timeAgo}</p>
          </div>
        ))}

        {!hasNotifications && (
          <p className="h6 font-[400] flex items-center justify-center flex-1">아직 새로운 알림이 없어요.</p>
        )}

        <div ref={ref}></div>
      </div>
    </div>
  );
};

export default NavbarNotificationModal;
