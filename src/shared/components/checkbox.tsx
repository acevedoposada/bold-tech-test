import { ChangeEvent, DetailedHTMLProps, HTMLAttributes, InputHTMLAttributes, useRef, useState } from "react"
import { IoCheckbox, IoSquareOutline } from "react-icons/io5";

import { cn } from "../lib/utils"
import { motion } from "motion/react";

enum CheckboxSizes {
  SM = 'sm',
  DEFAULT = 'default'
}

interface CheckboxProps extends Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'> {
  size?: `${CheckboxSizes}`
}

const MotionCheckboxIcon = motion.create(IoCheckbox)

const checkedAnimations = {
  unchecked: { scale: 0, opacity: 0 },
  checked: { scale: 1, opacity: 1 }
}

function Checkbox({ className, value, size = CheckboxSizes.DEFAULT, checked, onChange, ...props }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);

  const handleClick = (event: ChangeEvent<HTMLInputElement>) => {
    onChange?.(event);
    setIsChecked(event.target.checked)
  }

  return (
    <span className={cn(
      "box-border relative inline-flex items-center justify-center p-2 m-0 align-middle bg-transparent border-0 rounded-full outline-none appearance-none cursor-pointer select-none text-primary",
      {
        'h-10 w-10': size === CheckboxSizes.DEFAULT,
        'h-6 w-6': size === CheckboxSizes.SM,
      },
      className
    )}>
      <input
        type="checkbox"
        className="absolute top-0 left-0 w-full h-full p-0 m-0 z-1 cursor-[inherit] opacity-0"
        value={value}
        onChange={handleClick}
        {...props}
      />
      <span className="grid">
        <IoSquareOutline size={28} className='[grid-area:1/1]' />
        <MotionCheckboxIcon
          variants={checkedAnimations}
          initial="unchecked"
          animate={isChecked ? "checked" : "unchecked"}
          size={28}
          className='[grid-area:1/1]'
        />
      </span>
    </span>
  )
}

export default Checkbox