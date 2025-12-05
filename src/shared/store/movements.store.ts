import { persist } from 'zustand/middleware';
import { create } from 'zustand';

import { Transaction } from '../types/movements';
import { fetchMovementsEffect } from './effect/movements.effect';

interface MovementsState {
  loading: boolean;
  page: number;
  movements: Transaction[];
  filters: string[];
  timeFilter: number;
  fetchMovements: () => void;
  changePage: (page: number) => void;
  applyFilters: (filters: string[]) => void;
  applyTimeFilter: (value: number) => void;
}

export const useMovementsStore = create<MovementsState>()(
  persist(
    (set) => ({
      loading: true,
      page: 1,
      movements: [],
      filters: [],
      timeFilter: 2,
      setLoading(value: boolean) {
        set((state) => ({ ...state, loading: value }));
      },
      async fetchMovements() {
        set((state) => ({ ...state, loading: true }));
        const result = await fetchMovementsEffect();
        set((state) => ({
          ...state,
          loading: false,
          movements: result.data || [],
        }));
      },
      applyFilters(filters: string[]) {
        set((state) => ({ ...state, filters }));
      },
      applyTimeFilter(value: number) {
        set((state) => ({ ...state, timeFilter: value }));
      },
      changePage(page: number) {
        set((state) => ({ ...state, page }));
      },
    }),
    {
      name: 'movements-storage',
    },
  ),
);
