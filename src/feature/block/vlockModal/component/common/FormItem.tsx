import type { ReactNode } from 'react';

interface FormItemProps {
  label: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export const FormItem = ({ label, required = false, children, className }: FormItemProps) => {
  return (
    <div className={`w-full flex flex-col gap-[10px] ${className || ''}`}>
      <div className="flex flex-row items-center gap-[5px]">
        {required && <span className="text-negative">*</span>}
        <label className="h9 text-base-color-0">{label}</label>
      </div>
      {children}
    </div>
  );
};
