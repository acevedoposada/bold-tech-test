'use client';
import { VscSettings } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { useState } from 'react';
import Button from './button';
import { cn } from '../lib/utils';
import Checkbox from './checkbox';

interface Value {
  label: string;
  value: string | number;
}

interface MenuButtonProps extends Omit<HTMLMotionProps<'button'>, 'values'> {
  title: string;
  values: Value[];
  buttonLabel?: string;
  onClose?: () => void;
  onConfirm?: (values?: (string | number)[]) => void;
}

function MenuButton({
  title,
  values,
  buttonLabel = 'Confirmar',
  onClose,
  onConfirm,
  className,
  ...props
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen((prev) => !prev);

  const handleClickBtn = () => {
    setIsOpen(false);
    onConfirm?.([]);
  };

  const handleClose = () => {
    toggle();
    onClose?.();
  };

  return (
    <div className="relative flex">
      <motion.button
        onClick={toggle}
        layoutId="popover"
        className={cn(
          'px-6 py-3 font-semibold bg-white rounded-lg shadow-lg cursor-pointer w-fit',
          className,
        )}
        {...props}
      >
        <span className="flex items-center gap-2">
          {title} <VscSettings size={24} />
        </span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            layoutId="popover"
            className="absolute top-0 right-0 z-10 bg-white rounded-lg shadow-lg w-72"
            data-testid="popover"
          >
            <div className="relative p-4">
              <button
                onClick={handleClose}
                className="absolute grid cursor-pointer top-2 right-2 w-9 h-9 place-content-center"
                data-testid="close-btn"
              >
                <IoClose size={28} />
              </button>
              <motion.p
                className="w-full px-4 pb-2 text-center"
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
              >
                {title}
              </motion.p>
              <ul className="grid gap-2 mb-4">
                {values.map((element, idx) => (
                  <li key={element.value} className="flex items-center whitespace-nowrap">
                    <label htmlFor={`checkbox-${idx}`}>
                      <Checkbox
                        id={`checkbox-${idx}`}
                        value={element.value}
                        className='mr-4'
                        size='sm'
                      />
                      <span className="font-medium text-primary">
                        {element.label}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              <Button
                fullWidth
                onClick={handleClickBtn}
                data-testid="confirm-btn"
              >
                {buttonLabel}
              </Button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

export default MenuButton;
