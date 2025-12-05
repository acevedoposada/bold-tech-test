import { create } from 'zustand';

interface LayoutStore {
  isFirstLoad: boolean;
  setFirstLoadFalsy: () => void;
}

export const useLayoutStore = create<LayoutStore>((set) => ({
  isFirstLoad: true,
  setFirstLoadFalsy() {
    set((store) => ({ ...store, isFirstLoad: false }));
  },
}));
