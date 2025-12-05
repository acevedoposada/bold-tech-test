import { AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';

import { CommonProps } from '../types/common';

interface DrawerProps extends CommonProps {
  open: boolean;
  onClose: () => void;
}

function Drawer({ open, children, onClose }: DrawerProps) {
  return (
    <AnimatePresence>
      {open && (
        <div className="fixed top-0 left-0 z-40 grid w-full h-full">
          <div
            onClick={onClose}
            className="[grid-area:1/1] backdrop-blur-sm bg-white/30"
          />
          <div className="[grid-area:1/1] relative z-1 max-w-3xl w-full h-[calc(100%-4rem)] lg:h-full mt-auto ml-auto bg-white rounded-t-3xl lg:rounded-tr-none lg:rounded-l-3xl shadow-xl">
            <button
              className="absolute top-0 right-0 p-8 cursor-pointer"
              onClick={onClose}
            >
              <IoClose size={32} />
            </button>
            {children}
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Drawer;
