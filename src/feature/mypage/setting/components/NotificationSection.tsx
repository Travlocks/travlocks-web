import { useState } from 'react';
import clsx from 'clsx';
import ToggleSwitch from '@/shared/ui/setting/ToggleSwitch';

interface NotificationItem {
  id: string;
  title: string;
  description: string;
  defaultOn: boolean;
}

const NOTIFICATION_ITEMS: NotificationItem[] = [
  {
    id: 'service',
    title: '서비스 주요 알림',
    description: '보안, 약관 변경 등 주요 안내 사항을 받습니다',
    defaultOn: false,
  },
  {
    id: 'travel',
    title: '여행 활동 알림',
    description: '내 Vlock에 대한 즐겨찾기, 리믹스 알림을 받습니다',
    defaultOn: true,
  },
  {
    id: 'marketing',
    title: '마케팅 정보 수신',
    description: '트래블록스의 새로운 기능,이벤트 소식을 받습니다',
    defaultOn: false,
  },
];

const NotificationSection = () => {
  const [notifications, setNotifications] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(NOTIFICATION_ITEMS.map((item) => [item.id, item.defaultOn])),
  );

  const handleToggle = (id: string) => {
    setNotifications((prev) => ({ ...prev, [id]: !prev[id] }));
    // TODO: 알림 설정 변경 API 연동
  };

  return (
    <div className="flex flex-col gap-6">
      <h3 className="h4 font-medium text-base-color-0">이메일 수신 알림 설정</h3>

      <div className="flex flex-col gap-6.5">
        {NOTIFICATION_ITEMS.map((item) => {
          const isActive = notifications[item.id];
          return (
            <div
              key={item.id}
              className={clsx(
                'flex items-center justify-between py-6.25 px-6.5 border rounded-[10px] transition-all duration-200',
                isActive ? 'bg-base-color-6 border-base-color-2' : 'bg-base-color-5 border-base-color-6',
              )}>
              <div className="flex flex-col gap-1">
                <p className="b2 font-light transition-colors text-base-color-0">{item.title}</p>
                <p className="b4 font-light text-base-color-2">{item.description}</p>
              </div>
              <ToggleSwitch isOn={isActive} onToggle={() => handleToggle(item.id)} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NotificationSection;
