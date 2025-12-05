import { create } from 'zustand';
import { apiInstance } from '../lib/interceptors';
import { Transaction } from '../types/movements';

interface MovementsState {
  loading: boolean;
  movements: Transaction[];
  fetchMovements: () => void;
}

export const useMovementsStore = create<MovementsState>((set) => ({
  loading: true,
  movements: [],
  setLoading(value: boolean) {
    set((state) => ({ ...state, loading: value }));
  },
  async fetchMovements() {
    set((state) => ({ ...state, loading: true }));
    const result = await apiInstance.get('/api');
    set((state) => ({ ...state, loading: false, movements: result.data }));
  },
}));
