import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { DEFAULT_PAGE_SIZE, DOTS_SPAN } from '../constants/common';
import { usePagination } from '../hooks/pagination.hook';
import { cn } from '@lib/utils';
import '@styles/pagination.css';
import { MouseEvent } from 'react';

interface PaginationProps {
  itemsCount: number;
  currentPage: number;
  onPageChange?: (page: number, event?: MouseEvent) => void;
}

enum DirectionButton {
  PREV = 'prev',
  NEXT = 'next',
}

function Pagination({
  itemsCount,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const { pages } = usePagination({
    currentPage,
    itemsCount,
  });

  const handleBulletClick =
    (page: number | string) => (event: MouseEvent<Element>) => {
      if (typeof page === 'number') onPageChange?.(page, event);
    };

  const handleArrowClick =
    (direction: DirectionButton) => (event: MouseEvent<HTMLButtonElement>) => {
      onPageChange?.(
        currentPage + (direction === DirectionButton.NEXT ? 1 : -1),
        event,
      );
    };

  return (
    <nav className="flex gap-2">
      <button
        className="pagination__control text-primary"
        onClick={handleArrowClick(DirectionButton.PREV)}
        disabled={currentPage === 1}
      >
        <FaChevronLeft className="-ml-0.5" />
      </button>
      {pages.map((page, idx) => (
        <button
          key={`${page}-${idx.toString(16)}`}
          onClick={handleBulletClick(page)}
          className={cn('pagination__control', {
            'hover:bg-transparent! cursor-default!': page === DOTS_SPAN,
            pagination__control__bullet: page !== DOTS_SPAN,
            'pagination__control--active': page === currentPage,
          })}
        >
          {page}
        </button>
      ))}
      <button
        className="pagination__control text-primary"
        onClick={handleArrowClick(DirectionButton.NEXT)}
        disabled={currentPage === Math.ceil(itemsCount / DEFAULT_PAGE_SIZE)}
      >
        <FaChevronRight className="-mr-0.5" />
      </button>
    </nav>
  );
}

export default Pagination;
