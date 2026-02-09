import { motion } from 'motion/react';
import clsx from 'clsx';

interface ToggleSwitchProps {
  isOn: boolean;
  onToggle: () => void;
  disabled?: boolean;
}

const ToggleSwitch = ({ isOn, onToggle, disabled = false }: ToggleSwitchProps) => {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      className={clsx(
        'flex h-[36px] w-[66px] cursor-pointer items-center rounded-[50px] p-[5px] transition-colors duration-200',
        isOn ? 'justify-end bg-primary-color' : 'justify-start bg-base-color',
        disabled && 'opacity-50 cursor-not-allowed',
      )}>
      <motion.div
        className="h-[28px] w-[28px] rounded-full bg-white shadow-sm"
        layout
        transition={{
          type: 'spring',
          visualDuration: 0.2,
          bounce: 0.2,
        }}
      />
    </button>
  );
};

export default ToggleSwitch;
