import clsx from 'clsx';
import { useId } from 'react';

interface CheckboxProps {
  text: string | React.ReactNode;
  outline: boolean;
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

const Checkbox = ({ text, outline, checked, onChange, className }: CheckboxProps) => {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className={clsx(
        'relative b3 flex items-center px-[20px] rounded-[5px] max-w-[440px] w-full gap-[13px]',
        outline && ' border border-base-color h-[60px] py-[15px]',
        className,
      )}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={`peer appearance-none size-[20px] rounded-[5px] border border-base-color checked:bg-[rgba(60,78,244,0.05)] checked:border-none checked:bg-[url('https://rlexwdwoprxkgngnucap.supabase.co/storage/v1/object/sign/image/icon-checked.svg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wYTdlNjA2Yy03NDdiLTRiMDUtODVlMC0zZmYxMjU3YjM2NzYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJpbWFnZS9pY29uLWNoZWNrZWQuc3ZnIiwiaWF0IjoxNzY3OTQ1Njk0LCJleHAiOjE3OTk0ODE2OTR9.NVT-mfevqksKOKTsmKOUtKCeH2XcZ2jbRj3-l4RhlBo')] bg-no-repeat bg-center`}></input>
      <span>{text}</span>
      <div className={clsx('absolute inset-0', outline && 'peer-checked:bg-[rgba(60,78,244,0.05)]')}></div>
    </label>
  );
};

export default Checkbox;
