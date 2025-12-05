'use client';

import { IoSearchSharp } from 'react-icons/io5';

import { filters } from '@/shared/constants/filters';
import Card, { CardHeader } from '@/shared/components/card';
import MenuButton from '@/shared/components/menu-button';
import Tabs from '@/shared/components/tabs';
import useMovementsPage from '@/modules/movements/hooks/movements.hook';
import FormField from '@/shared/components/form-field';
import MovementsTable from '@/modules/movements/components/table';
import SummaryCard from '@/modules/movements/components/summary-card';
import AnimatedLabel from '@/shared/components/animated-label';
import Drawer from '@/shared/components/drawer';
import Voucher from '@/modules/movements/components/voucher';

export default function Home() {
  const {
    tabText,
    selectedTab,
    tabs,
    filteredMovements,
    filters: selectedFilters,
    selectedMovement,
    handleTabChange,
    handleConfirmFilters,
    handleSearchChange,
    handleRowClicked,
    handleCloseDrawer,
  } = useMovementsPage();
  return (
    <>
      <section className="container grid min-h-full gap-4 py-8 lg:py-14 grid-rows-[auto_1fr]">
        <section className="grid gap-4 lg:grid-cols-3">
          <SummaryCard selectedTab={selectedTab} tabText={tabText} />
          <aside className="grid gap-4 lg:col-span-2 grid-rows-[auto_1fr]">
            <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
            <div className="flex items-start justify-end">
              <MenuButton
                title="Filtrar"
                values={filters}
                defaultChecks={selectedFilters}
                buttonLabel="Aplicar"
                onConfirm={handleConfirmFilters}
              />
            </div>
          </aside>
        </section>
        <section className="h-full">
          <Card className="w-full h-full overflow-hidden min-h-[40rem]">
            <CardHeader>
              Tus ventas de{' '}
              <AnimatedLabel className="lowercase whitespace-nowrap">
                {tabText}
              </AnimatedLabel>
            </CardHeader>
            <FormField
              placeholder="Buscar"
              icon={IoSearchSharp}
              className="border-b border-brand-gray-dark/30"
              onChange={handleSearchChange}
            />
            <div className="h-[calc(100%-7rem)] overflow-y-hidden">
              <div className="relative w-full h-full overflow-x-auto">
                <MovementsTable
                  className="absolute border-collapse w-max md:w-full"
                  movements={filteredMovements}
                  onRowClick={handleRowClicked}
                />
              </div>
            </div>
          </Card>
        </section>
      </section>
      <Drawer open={!!selectedMovement} onClose={handleCloseDrawer}>
        {selectedMovement && <Voucher transaction={selectedMovement} />}
      </Drawer>
    </>
  );
}
