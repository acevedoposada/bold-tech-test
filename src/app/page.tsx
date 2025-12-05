'use client';

import { IoSearchSharp } from 'react-icons/io5';

import { filters } from '@/shared/constants/filters';
import Card, { CardHeader, CardBody } from '@/shared/components/card';
import MenuButton from '@/shared/components/menu-button';
import Tabs from '@/shared/components/tabs';
import Tooltip from '@/shared/components/tooltip';
import useMovementsPage from '@/modules/movements/hooks/movements.hook';
import FormField from '@/shared/components/form-field';
import MovementsTable from '@/modules/movements/components/table';
import Table, { TableHeader } from '@/shared/components/table';
import { tableHeaders } from '@/modules/movements/constants/table-movements';

export default function Home() {
  const {
    tabText,
    selectedTab,
    tabs,
    movements,
    loadingData,
    handleTabChange,
  } = useMovementsPage();
  return (
    <section className="container grid min-h-full gap-4 py-8 lg:py-14 grid-rows-[auto_1fr]">
      <section className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex items-center justify-between">
            Total de ventas de {tabText}
            <Tooltip
              title={`Esta es la sumatoria de las ventas de ${tabText}`}
              clickable
            >
              <i className="text-xl icon-info" />
            </Tooltip>
          </CardHeader>
          <CardBody className="pt-5 text-center">
            <p className="mb-3 text-2xl font-bold brand-gradient text-gradient">
              $ 9'123.950
            </p>
            <p>27 de Junio 2024</p>
          </CardBody>
        </Card>
        <aside className="grid gap-4 lg:col-span-2 grid-rows-[auto_1fr]">
          <Tabs value={selectedTab} tabs={tabs} onChange={handleTabChange} />
          <div className="flex items-start justify-end">
            <MenuButton
              title="Filtrar"
              values={filters}
              buttonLabel="Aplicar"
            />
          </div>
        </aside>
      </section>
      <section className="h-full">
        <Card className="w-full h-full overflow-hidden min-h-[40rem]">
          <CardHeader>Tus ventas de {tabText.toLowerCase()}</CardHeader>
          <FormField
            placeholder="Buscar"
            icon={IoSearchSharp}
            className="border-b border-brand-gray-dark/30"
          />
          <div className="h-[calc(100%-7rem)] overflow-y-hidden">
            <div className="relative w-full h-full overflow-x-auto">
              <MovementsTable
                className="absolute border-collapse w-max md:w-full"
                movements={movements}
              />
            </div>
          </div>
        </Card>
      </section>
    </section>
  );
}
