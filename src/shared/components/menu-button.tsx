'use client';
import { AnimatePresence, HTMLMotionProps, motion } from 'motion/react';
import { VscSettings } from 'react-icons/vsc';
import { IoClose } from 'react-icons/io5';
import { useMemo, useState } from 'react';
import { useFormik } from 'formik';
import Button from './button';
import { cn } from '../lib/utils';
import Checkbox from './checkbox';

interface Value {
  label: string;
  value: string | number;
  defaultChecked?: boolean;
}

interface MenuButtonProps extends Omit<HTMLMotionProps<'button'>, 'values'> {
  title: string;
  values: Value[];
  buttonLabel?: string;
  defaultChecks?: string[];
  onClose?: () => void;
  onConfirm?: (values: string[]) => void;
}

function MenuButton({
  title,
  values,
  buttonLabel = 'Confirmar',
  defaultChecks,
  onClose,
  onConfirm,
  className,
  ...props
}: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const getKey = (value: string | number) => String(value);

  const initialValues = values.reduce<Record<string, boolean>>(
    (acc, option) => {
      const hasDefault = defaultChecks?.find((value) => option.value === value);
      acc[getKey(option.value)] =
        !!hasDefault ||
        (!defaultChecks?.length && option.defaultChecked) ||
        false;
      return acc;
    },
    {},
  );

  const {
    values: formValues,
    handleChange,
    isValid,
    handleSubmit,
  } = useFormik({
    initialValues,
    validate: (values) => {
      const errors: Record<string, string> = {};
      const isOneSelected = Object.values(values).some((val) => val === true);
      if (!isOneSelected) {
        errors['general'] = 'Debes seleccionar al menos una opción';
      }
      return errors;
    },
    validateOnMount: true,
    validateOnChange: true,
    enableReinitialize: true,
    onSubmit(formValues) {
      setIsOpen(false);
      onConfirm?.(
        Object.keys(formValues).filter((option) => formValues[option]),
      );
    },
  });

  const toggle = () => setIsOpen((prev) => !prev);

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
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls='menu-popover'
      >
        <span className="flex items-center gap-2">
          {title} <VscSettings size={24} />
        </span>
      </motion.button>
      <AnimatePresence>
        {isOpen && (
          <motion.section
            id="menu-popover"
            role="dialog"
            aria-label={title}
            tabIndex={-1}
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
                {values.map((option) => {
                  const key = getKey(option.value);
                  return (
                    <li
                      key={key}
                      className="flex items-center whitespace-nowrap"
                    >
                      <label htmlFor={`checkbox-${key}`}>
                        <Checkbox
                          id={`checkbox-${key}`}
                          name={key}
                          value={option.value}
                          checked={formValues[key]}
                          className="mr-4"
                          size="sm"
                          onChange={handleChange}
                        />
                        <span className="font-medium text-primary">
                          {option.label}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
              <Button
                fullWidth
                onClick={handleSubmit as any}
                data-testid="confirm-btn"
                disabled={!isValid}
                type="button"
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
