import { ChangeEvent, DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { IoIosRadioButtonOff, IoIosRadioButtonOn } from 'react-icons/io';

import { cn } from '../lib/utils';
import { motion } from 'motion/react';

enum RadioSizes {
  SM = 'sm',
  DEFAULT = 'default',
}

interface RadioProps extends Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  'size'
> {
  size?: `${RadioSizes}`;
}

const MotionRadioOnIcon = motion.create(IoIosRadioButtonOn);

const radioAnimations = {
  unchecked: { scale: 0, opacity: 0 },
  checked: { scale: 1, opacity: 1 },
};

function Radio({
  className,
  value,
  size = RadioSizes.DEFAULT,
  checked,
  onChange,
  ...props
}: RadioProps) {
  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
  };

  return (
    <span
      className={cn(
        'box-border relative inline-flex items-center justify-center p-2 m-0 align-middle bg-transparent border-0 rounded-full outline-none appearance-none cursor-pointer select-none text-primary',
        {
          'h-10 w-10': size === RadioSizes.DEFAULT,
          'h-6 w-6': size === RadioSizes.SM,
        },
        className,
      )}
    >
      <input
        type="radio"
        className="absolute top-0 left-0 w-full h-full p-0 m-0 z-1 cursor-[inherit] opacity-0"
        value={value}
        onChange={handleClick}
        checked={checked}
        {...props}
      />
      <span className="grid">
        <IoIosRadioButtonOff size={28} className="[grid-area:1/1]" />
        <MotionRadioOnIcon
          variants={radioAnimations}
          initial="unchecked"
          animate={checked ? 'checked' : 'unchecked'}
          size={28}
          className="[grid-area:1/1]"
        />
      </span>
    </span>
  );
}

export default Radio;
