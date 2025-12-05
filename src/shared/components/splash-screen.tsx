'use client';

import { AnimatePresence, motion } from 'motion/react';

import { useLayoutStore } from '@/shared/store/layout.store';
import '@styles/splash-screen.css';

function SplashScreen() {
  const { isFirstLoad } = useLayoutStore();
  return (
    <AnimatePresence mode="popLayout">
      {isFirstLoad && (
        <motion.div
          data-testid="splash-screen"
          className="fixed top-0 left-0 z-20 grid w-full h-full"
          initial={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 1, transition: { delay: 1.3 } }}
        >
          <motion.div
            className="grid logo-mask place-content-center bg-linear-to-t from-primary to-secondary"
            exit={{
              maskSize: '15rem',
              maskPosition: 'center center',
              transition: {
                duration: 1.5,
                ease: [0.19, 1, 0.22, 1],
              },
            }}
          >
            <motion.div
              className="min-w-60 min-h-40 logo-mask mask-contain! mask-center! bg-white"
              animate={{
                scale: [1.1, 1],
                transition: {
                  repeat: Infinity,
                  duration: 1,
                  repeatType: 'reverse',
                  type: 'spring',
                  stiffness: 500,
                  damping: 15,
                },
              }}
              exit={{ opacity: 0 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default SplashScreen;
