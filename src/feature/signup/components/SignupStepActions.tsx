import clsx from 'clsx';

interface SignupStepActionsProps {
  left: {
    text: string;
    onClick: () => void;
  };
  right: {
    text: string;
    onClick: () => void;
    disabled?: boolean;
  };
}

const SignupStepActions = ({ left, right }: SignupStepActionsProps) => {
  return (
    <div className="flex w-full gap-5">
      <button
        type="button"
        onClick={left.onClick}
        className="h8 flex h-[60px] flex-1 items-center justify-center rounded-[10px] border border-base-color bg-base-color-6 text-base-color-0 transition-colors hover:bg-base-color-5">
        {left.text}
      </button>
      <button
        type="button"
        disabled={right.disabled}
        onClick={right.onClick}
        className={clsx(
          'h8 flex h-[60px] flex-1 items-center justify-center rounded-[10px] text-base-color-6 transition-colors',
          right.disabled ? 'cursor-not-allowed bg-base-color-3' : 'cursor-pointer bg-primary-color hover:opacity-90',
        )}>
        {right.text}
      </button>
    </div>
  );
};

export default SignupStepActions;
