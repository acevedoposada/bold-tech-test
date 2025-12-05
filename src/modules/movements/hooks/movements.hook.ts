import { useLayoutStore } from '@/shared/store/layout.store';
import { useMovementsStore } from '@/shared/store/movements.store';
import { useLayoutEffect, useMemo, useState } from 'react';

const useMovementsPage = () => {
  const { setFirstLoadFalsy } = useLayoutStore();
  const { fetchMovements, loading, movements } = useMovementsStore();
  const [selectedTab, setSelectedTab] = useState(2);
  const tabs = useMemo(() => ['Hoy', 'Esta semana', 'Junio'], []);

  const tabText = useMemo(() => tabs[selectedTab], [selectedTab]);

  const handleTabChange = (value: number | string) => {
    setSelectedTab(value as number);
  };

  useLayoutEffect(() => {
    (async () => {
      await fetchMovements();
      setFirstLoadFalsy();
    })();
  }, []);

  return {
    selectedTab,
    tabText,
    tabs,
    loadingData: loading,
    movements,
    handleTabChange,
  };
};

export default useMovementsPage;
