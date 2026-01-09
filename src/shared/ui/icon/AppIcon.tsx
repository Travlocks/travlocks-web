import { IconBase } from './IconBase';
import { iconRegistry, type IconName } from './registry';

type AppIconProps = Omit<React.ComponentProps<typeof IconBase>, 'icon'> & {
  name: IconName;
};

// 앱 표준 API 공용 아이콘 컴포넌트
export function AppIcon({ name, ...props }: AppIconProps) {
  const Icon = iconRegistry[name];

  return <IconBase icon={Icon} {...props} />;
}
