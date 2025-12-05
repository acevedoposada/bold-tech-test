import { ChangeEvent, useMemo, useState } from 'react';
import dayjs from '@lib/dayjs';
import _ from 'lodash';

import { useMovementsStore } from '@/shared/store/movements.store';
import { SalesType } from '@/shared/constants/financials';
import { useDebounce } from '@/shared/lib/debounce';
import { Transaction } from '@/shared/types/movements';

const useMovementsPage = () => {
  const [selectedMovement, setSelectedMovement] = useState<Transaction | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  const movements = useMovementsStore((state) => state.movements);
  const filters = useMovementsStore((state) => state.filters);
  const selectedTab = useMovementsStore((state) => state.timeFilter);
  const applyFilters = useMovementsStore((state) => state.applyFilters);
  const applyTimeFilter = useMovementsStore((state) => state.applyTimeFilter);

  const tabs = useMemo(
    () => ['Hoy', 'Esta semana', _.capitalize(dayjs().format('MMMM'))],
    [],
  );

  const filteredMovements = useMemo(() => {
    let data: Transaction[] = [];
    if (filters.includes(SalesType.ALL) || !filters.length) {
      data = movements;
    } else {
      data = movements.filter((movement) =>
        filters.includes(movement.salesType),
      );
    }
    const term = searchTerm.trim().toLowerCase();
    return data.filter(
      (movement) =>
        movement.paymentMethod.toLocaleLowerCase().includes(term) ||
        movement.id.toLocaleLowerCase().includes(term) ||
        movement.franchise?.toLocaleLowerCase().includes(term) ||
        movement.transactionReference.toString().includes(term),
    );
  }, [filters, movements, searchTerm]);

  const tabText = useMemo(() => tabs[selectedTab], [selectedTab]);

  const handleSearchChange = useDebounce(
    (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value),
  );

  const handleTabChange = (value: number | string) => {
    applyTimeFilter(value as number);
  };

  const handleConfirmFilters = (filters: string[]) => {
    applyFilters(filters);
  };

  const handleRowClicked = (element: Transaction) => {
    setSelectedMovement(element);
  };

  const handleCloseDrawer = () => setSelectedMovement(null);

  return {
    selectedTab,
    tabText,
    tabs,
    filteredMovements,
    movements,
    filters,
    selectedMovement,
    handleRowClicked,
    handleTabChange,
    handleConfirmFilters,
    handleSearchChange,
    handleCloseDrawer,
  };
};

export default useMovementsPage;
