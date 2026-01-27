import type { SnapPreviewsState } from '../../types/drag';

interface SnapPreviewProps {
  snapPreview: SnapPreviewsState;
}

// 스냅 프리뷰
const SnapPreview = ({ snapPreview }: SnapPreviewProps) => {
  if (!snapPreview || !snapPreview.visible) return null;

  return (
    <div
      className="absolute pointer-events-none border-2 border-dashed border-blue-400 bg-blue-50/40 rounded-xl transition-all duration-75"
      style={{
        left: snapPreview.x,
        top: snapPreview.y,
        width: snapPreview.w,
        height: snapPreview.h,
      }}
    />
  );
};

export default SnapPreview;
