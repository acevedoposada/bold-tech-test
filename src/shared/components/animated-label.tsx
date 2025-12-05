import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/utils';

interface AnimatedLabelProps {
  children: string;
  className?: string;
}

function AnimatedLabel({ children, className }: AnimatedLabelProps) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={children}
        initial={{ x: -5, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 5, opacity: 0 }}
        layout
        className={cn('inline-block w-fit', className)}
      >
        {children}
      </motion.span>
    </AnimatePresence>
  );
}

export default AnimatedLabel;
