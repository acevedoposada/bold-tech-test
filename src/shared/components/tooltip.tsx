'use client';

import {
  cloneElement,
  ReactElement,
  MouseEvent,
  useState,
  useRef,
  useCallback,
  useEffect,
  RefObject,
} from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { cn } from '../lib/utils';

interface TooltipProps {
  children: ReactElement<{
    onMouseEnter?: (e: MouseEvent) => void;
    onMouseLeave?: (e: MouseEvent) => void;
    onClick?: (e: MouseEvent) => void;
    className?: string;
    ref?: RefObject<HTMLElement | null>;
  }>;
  title: string;
  clickable?: boolean;
}

const tooltipVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const SPACING = 8;
const WINDOW_MARGIN = 10;

function Tooltip({ children, title, clickable }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLSpanElement>(null);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const { width: tooltipWidth, height: tooltipHeight } = triggerRect;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const topPlacementY = triggerRect.top - tooltipHeight - SPACING;
    const leftPlacementX = triggerRect.left - tooltipWidth;

    const bottomPlacementY = triggerRect.bottom - SPACING;

    let finalX;
    let finalY;

    if (leftPlacementX >= WINDOW_MARGIN) {
      finalX = leftPlacementX;
    } else {
      finalX = triggerRect.right + SPACING;

      if (finalX + tooltipWidth + WINDOW_MARGIN > windowWidth) {
        finalX = triggerRect.left + triggerRect.width / 2 - tooltipWidth / 2;

        if (finalX + tooltipWidth + WINDOW_MARGIN > windowWidth) {
          finalX = windowWidth - tooltipWidth - WINDOW_MARGIN;
        }
      }
    }

    if (topPlacementY >= WINDOW_MARGIN) {
      finalY = topPlacementY;
    } else if (
      bottomPlacementY + tooltipHeight + WINDOW_MARGIN <=
      windowHeight
    ) {
      finalY = bottomPlacementY;
    } else {
      finalY = WINDOW_MARGIN;
    }

    setPosition({ top: finalY, left: finalX });
  }, []);

  useEffect(() => {
    if (isVisible) {
      calculatePosition();
      window.addEventListener('scroll', calculatePosition);
    }
    return () => window.removeEventListener('scroll', calculatePosition);
  }, [isVisible]);

  const handlemouseEnter = () => setIsVisible(true);
  const handlemouseLeave = () => setIsVisible(false);
  const handleClick = (event: MouseEvent) => {
    children.props.onClick?.(event);
    setIsVisible((prev) => !prev);
  };

  return (
    <>
      {cloneElement(children, {
        onMouseEnter: !clickable ? handlemouseEnter : undefined,
        onMouseLeave: handlemouseLeave,
        onClick: clickable ? handleClick : undefined,
        ref: triggerRef,
        className: cn(children.props.className, {
          'cursor-pointer': clickable,
        }),
      })}
      <AnimatePresence>
        {isVisible && (
          <motion.span
            ref={tooltipRef}
            className="fixed z-10 px-2 py-1 text-xs text-white rounded-sm pointer-events-none bg-brand-gray-dark"
            style={{ left: position.left, top: position.top }}
            variants={tooltipVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {title}
          </motion.span>
        )}
      </AnimatePresence>
    </>
  );
}

export default Tooltip;
