import { renderHook } from '@testing-library/react';

import { DOTS_SPAN } from '../constants/common';
import { usePagination } from './pagination.hook';

describe('usePagination hook', () => {
  const setup = (itemsCount: number, currentPage: number) =>
    renderHook(() => usePagination({ itemsCount, currentPage })).result.current
      .pages;

  it('returns all pages when total pages are under the visible limit', () => {
    const pages = setup(24, 1);
    expect(pages).toEqual([1, 2]);
  });

  it('shows initial range and trailing last page when near the beginning', () => {
    const pages = setup(120, 1);
    expect(pages).toEqual([1, 2, 3, 4, DOTS_SPAN, 10]);
  });

  it('shows leading first page and ending range when near the end', () => {
    const pages = setup(120, 9);
    expect(pages).toEqual([1, DOTS_SPAN, 7, 8, 9, 10]);
  });

  it('shows current page centered with ellipsis on both sides in the middle range', () => {
    const pages = setup(120, 5);
    expect(pages).toEqual([1, DOTS_SPAN, 4, 5, 6, DOTS_SPAN, 10]);
  });
});
