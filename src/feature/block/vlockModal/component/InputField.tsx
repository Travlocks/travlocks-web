import { FormItem } from './common/FormItem';
import XIcon from '@/shared/assets/icon-x.svg?react';

interface InputFieldProps {
  isRequired?: boolean;
  label: string;
  value: string;
  placeholder?: string;
  type: 'text' | 'textarea';
  onChange?: (val: string) => void;
}

const InputField = ({ isRequired = true, label, value, placeholder, type = 'text', onChange }: InputFieldProps) => {
  const handleClear = () => {
    onChange?.('');
  };

  return (
    <FormItem label={label} required={isRequired}>
      <div className="relative w-full">
        {type === 'text' ? (
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full box-border p-[17px_18px] pr-[40px] bg-base-color-6 border border-base-color rounded-[5px] hover:border-primary-color focus:ring-1 focus:ring-inset focus:ring-primary-color focus:border-primary-color transition-all outline-none"
          />
        ) : (
          <textarea
            value={value}
            placeholder={placeholder}
            onChange={(e) => onChange?.(e.target.value)}
            className="w-full box-border h-[180px] p-[17px_18px] pr-[40px] bg-base-color-6 border border-base-color rounded-[5px] hover:border-primary-color focus:ring-1 focus:ring-inset focus:ring-primary-color focus:border-primary-color transition-all outline-none resize-none"
          />
        )}
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-[18px] top-[20px] w-5 h-5 flex items-center justify-center cursor-pointer bg-base-color-3 rounded-full">
            <XIcon className="text-base-color-6" />
          </button>
        )}
      </div>
    </FormItem>
  );
};

export default InputField;
