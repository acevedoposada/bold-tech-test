'use client';
import { motion } from 'motion/react';

interface TabsProps {
  value: string | number;
  tabs: (string | number)[];
  onChange?: (selectedValue: string | number) => void;
}

function Tabs({ value, tabs, onChange }: TabsProps) {
  const handleClick = (value: string | number) => () => onChange?.(value);

  return (
    <motion.div
      data-testid="tabs"
      className="flex w-full p-2 bg-white h-fit rounded-xl"
      role="tablist"
      aria-label='Selección de pestañas'
    >
      {tabs.map((tab, idx) => {
        const isSelected = value === idx
        return (
          <motion.button
            key={idx}
            className="relative flex-1 p-1 text-center rounded-full cursor-pointer h-fit"
            onClick={handleClick(idx)}
            aria-controls={`panel-${idx}`}
            aria-selected={isSelected}
            tabIndex={isSelected ? 0 : -1}
          >
            <span className="relative z-1 text-primary">{tab}</span>
            {idx === value && (
              <motion.span
                data-testid="indicator"
                className="absolute top-0 left-0 w-full h-full rounded-full bg-brand-gray-light"
                layoutId="indicator"
                id="indicator"
              />
            )}
          </motion.button>
        )
      })}
    </motion.div>
  );
}

export default Tabs;
