import { AnimatePresence, motion } from 'motion/react';
import { IoIosCloseCircle } from 'react-icons/io';

import { SalesType } from '@/shared/constants/financials';
import { filters } from '@/shared/constants/filters';
import { cn } from '@/shared/lib/utils';

interface CurrentFilterProps {
  currentFilter: string;
  onRemoveFilter?: () => void;
}

const filterColor: Record<SalesType, string> = {
  [SalesType.TERMINAL]: 'bg-primary-100 text-primary',
  [SalesType.LINK]: 'bg-secondary-100 text-secondary-700',
  [SalesType.ALL]: 'bg-zinc-300 text-zinc-600',
};

function CurrentFilter({ currentFilter, onRemoveFilter }: CurrentFilterProps) {
  return (
    <AnimatePresence>
      {currentFilter && currentFilter !== SalesType.ALL && (
        <motion.div
          initial={{ x: 15, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 15, opacity: 0 }}
          className="text-right text-brand-gray-dark/90"
        >
          <p className="mb-1 text-sm">Filtro actual:</p>
          <AnimatePresence mode="wait">
            <motion.button
              key={currentFilter}
              layout
              className={cn(
                'flex items-center px-3 py-1 overflow-hidden text-sm rounded-full cursor-pointer group',
                filterColor[(currentFilter as SalesType) || SalesType.ALL],
              )}
              initial={{ x: 15, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -15, opacity: 0 }}
              onClick={onRemoveFilter}
            >
              {filters.find((filter) => filter.value === currentFilter)?.label}
              <span className="block ml-3 -mr-8 transition-all duration-200 ease-[cubic-bezier(0.64,0.57,0.67,1.53)] group-hover:ml-1 group-hover:-mr-1">
                <IoIosCloseCircle size={18} />
              </span>
            </motion.button>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default CurrentFilter;
