import { AnimatePresence, motion, Variants } from 'motion/react';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';

import { Breakpoints } from '../constants/breakpoints';
import { CommonProps } from '../types/common';
import { cn } from '../lib/utils';

interface DrawerProps extends CommonProps {
  open: boolean;
  onClose: () => void;
  closeWithBackdrop?: boolean;
}

const wrapperAnimations: Variants = {
  initial: { right: '-100%', opacity: 0 },
  animate: { right: '0%', opacity: 1 },
  exit: { right: '-100%', opacity: 0, transition: { duration: 0.7 } },
};

const wrapperMobileAnimations: Variants = {
  initial: { bottom: '-100%', opacity: 0 },
  animate: { bottom: '0%', opacity: 1 },
  exit: { bottom: '-100%', opacity: 0, transition: { duration: 0.7 } },
};

function Drawer({
  open,
  children,
  closeWithBackdrop = true,
  onClose,
}: DrawerProps) {
  const [animations, setAnimations] = useState(wrapperAnimations);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width < Breakpoints.LG) {
        setAnimations(wrapperMobileAnimations);
        return;
      }
      setAnimations(wrapperAnimations);
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed top-0 left-0 z-40 grid w-full h-full"
          exit={{ pointerEvents: 'none', userSelect: 'none' }}
          data-testid="drawer"
          role="dialog"
          aria-modal
        >
          <motion.div
            data-testid="drawer-backdrop"
            onClick={closeWithBackdrop ? onClose : undefined}
            className={cn('[grid-area:1/1] backdrop-blur-sm bg-white/30', {
              'cursor-pointer': closeWithBackdrop,
            })}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            className="[grid-area:1/1] relative z-1 max-w-xl w-full h-auto lg:h-full mt-auto ml-auto bg-white rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl shadow-[0_-4px_10px_rgba(0,0,0,0.1)] lg:shadow-xl"
            {...animations}
          >
            <motion.button
              className="absolute top-0 right-0 p-6 cursor-pointer lg:p-8"
              onClick={onClose}
              aria-label="Cerrar"
            >
              <IoClose className="w-6 h-6 lg:w-8 lg:h-8" />
            </motion.button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
