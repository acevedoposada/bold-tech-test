import { ChangeEvent, useMemo, useState } from 'react';
import { BsEmojiTear } from 'react-icons/bs';
import { LuSearchX } from 'react-icons/lu';
import _ from 'lodash';

import { useMovementsStore } from '@/shared/store/movements.store';
import { SalesType } from '@/shared/constants/financials';
import { Transaction } from '@/shared/types/movements';
import { useDebounce } from '@/shared/lib/debounce';
import dayjs from '@lib/dayjs';
import { DEFAULT_PAGE_SIZE } from '@/shared/constants/common';

const useMovementsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMovement, setSelectedMovement] = useState<Transaction | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState<string>('');

  const movements = useMovementsStore((state) => state.movements);
  const selectedFilter = useMovementsStore((state) => state.selectedFilter);
  const selectedTab = useMovementsStore((state) => state.timeFilter);
  const applyFilter = useMovementsStore((state) => state.applyFilter);
  const applyTimeFilter = useMovementsStore((state) => state.applyTimeFilter);

  const tabs = useMemo(
    () => ['Hoy', 'Esta semana', _.capitalize(dayjs().format('MMMM'))],
    [],
  );

  const filteredMovements = useMemo(() => {
    let data: Transaction[] = [];
    if (selectedFilter === SalesType.ALL || !selectedFilter) {
      data = movements;
    } else {
      data = movements.filter(
        (movement) => movement.salesType === selectedFilter,
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
  }, [selectedFilter, movements, searchTerm]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * DEFAULT_PAGE_SIZE;
    const endIndex = startIndex + DEFAULT_PAGE_SIZE;
    return filteredMovements.slice(startIndex, endIndex);
  }, [currentPage, filteredMovements]);

  const notFoundMessage = useMemo(() => {
    if (
      filteredMovements.length === 0 &&
      !searchTerm.trim().length &&
      !selectedFilter
    ) {
      return {
        icon: BsEmojiTear,
        message:
          'Aún no tienes movimientos. Empieza a usar tus productos Bold y disfruta una nueva forma de mover tu plata',
      };
    }
    return {
      icon: LuSearchX,
      message: 'No encontramos nada que coincida con tus criterios de búsqueda',
    };
  }, [filteredMovements, searchTerm, selectedFilter]);

  const tabText = useMemo(() => tabs[selectedTab], [selectedTab, tabs]);

  const handleSearchChange = useDebounce(
    (event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event.target.value),
  );

  const handleTabChange = (value: number | string) => {
    applyTimeFilter(value as number);
  };

  const handleConfirmFilters = (filters: string[]) => {
    if (filters.length > 0) applyFilter(filters[0]);
  };

  const handleRowClicked = (element: Transaction) => {
    setSelectedMovement(element);
  };

  const handleCloseDrawer = () => setSelectedMovement(null);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return {
    selectedTab,
    tabText,
    tabs,
    filteredMovements,
    paginatedData,
    movements,
    selectedFilter,
    selectedMovement,
    notFoundMessage,
    currentPage,
    handleRowClicked,
    handleTabChange,
    handleConfirmFilters,
    handleSearchChange,
    handleCloseDrawer,
    handleChangePage,
  };
};

export default useMovementsPage;
