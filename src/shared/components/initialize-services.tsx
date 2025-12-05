'use client';

import { useLayoutEffect } from 'react';
import { useLayoutStore } from '../store/layout.store';
import { useMovementsStore } from '../store/movements.store';

function InitializeServices() {
  const setFirstLoadFalsy = useLayoutStore((state) => state.setFirstLoadFalsy);
  const fetchMovements = useMovementsStore((state) => state.fetchMovements);

  useLayoutEffect(() => {
    (async () => {
      await fetchMovements();
      setFirstLoadFalsy();
    })();
  }, []);

  return null;
}

export default InitializeServices;
