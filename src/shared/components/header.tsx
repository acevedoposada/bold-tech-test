'use client';

import { LuCircleHelp, LuMenu } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { IoClose } from 'react-icons/io5';
import { motion } from 'motion/react';

import '@styles/gradients.css';

import { Breakpoints } from '../constants/breakpoints';
import Logo from './logo';
import { cn } from '../lib/utils';
import Link from 'next/link';

const appearVariantsAnimations = {
  hidden: { height: 112 },
  visible: { height: 220 },
};

const iconVariantsAnimations = {
  show: { scale: 0 },
  hide: { scale: 1 },
};

function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen(!isOpen);

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > Breakpoints.LG && isOpen) {
        setIsOpen(false);
      }
    });
    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  return (
    <header data-testid="header" className="sticky top-0 z-10 h-28">
      <div
        className={cn(
          'flex w-full px-8 transition-shadow brand-gradient place-content-center',
          {
            'shadow-lg': isOpen,
          },
        )}
      >
        <motion.div
          className="container flex flex-col w-full overflow-y-hidden text-white h-28 lg:justify-between lg:items-center lg:flex-row"
          animate={isOpen ? 'visible' : 'hidden'}
          variants={appearVariantsAnimations}
          initial="hidden"
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 200,
          }}
        >
          <div className="flex items-center justify-between w-full lg:w-auto">
            <Link href="/">
              <Logo className="w-28 h-28 lg:w-42" fill="white" />
            </Link>
            <button
              data-testid="burger-menu"
              className="grid w-10 h-10 cursor-pointer place-content-center lg:hidden"
              onClick={toggleOpen}
            >
              <motion.span
                variants={iconVariantsAnimations}
                className="[grid-area:1/1]"
                initial="show"
                animate={isOpen ? 'show' : 'hide'}
              >
                <LuMenu size={28} />
              </motion.span>
              <motion.span
                variants={iconVariantsAnimations}
                className="[grid-area:1/1]"
                initial="hide"
                animate={!isOpen ? 'show' : 'hide'}
              >
                <IoClose size={28} />
              </motion.span>
            </button>
          </div>
          <nav className="pb-3 lg:pb-0">
            <ul className="flex flex-col lg:gap-12 lg:flex-row">
              <li className="grid">
                <a
                  href="https://panel.bold.co/api/auth/login"
                  target="_blank"
                  className="w-full py-3 hover:opacity-80"
                  rel="noopener noreferrer"
                >
                  Mi negocio
                </a>
              </li>
              <li className="grid">
                <a
                  href="https://boldco.kustomer.help/lang/es/"
                  target="_blank"
                  className="flex items-center gap-2 py-3 hover:opacity-80"
                  rel="noopener noreferrer"
                >
                  Ayuda
                  <LuCircleHelp size={18} />
                </a>
              </li>
            </ul>
          </nav>
        </motion.div>
      </div>
    </header>
  );
}

export default Header;
