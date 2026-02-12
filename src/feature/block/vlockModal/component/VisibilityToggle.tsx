interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
}

export const VisibilityToggle: React.FC<ToggleProps> = ({ enabled, onChange }) => {
  return (
    <div className="mb-5">
      <div className="inline-flex p-[6px] bg-base-color-4 rounded-[5px]">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`p-[4px_15px] rounded-[5px] h8 text-[14px] cursor-pointer transition-all duration-200 ${
            enabled ? 'bg-white text-primary-color' : 'text-base-color-3'
          }`}>
          전체 공개
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`p-[4px_15px] rounded-[5px] h8 text-[15px] cursor-pointer transition-all duration-200 ${
            !enabled ? 'bg-white text-primary-color' : 'text-base-color-3'
          }`}>
          나만 보기
        </button>
      </div>
    </div>
  );
};

export default VisibilityToggle;
