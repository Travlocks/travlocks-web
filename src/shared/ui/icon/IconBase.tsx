export interface IconBaseProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
  title?: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

// 아이콘 범용 래퍼 컴포넌트
export function IconBase({ size = 16, title, icon: Component, style, ...props }: IconBaseProps) {
  return (
    <Component
      width={size}
      height={size}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      style={style}
      fill="currentColor"
      {...props}
    />
  );
}
