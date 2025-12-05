import { SalesType } from './financials';

export const filters = [
  {
    label: 'Cobro con datáfono',
    value: SalesType.TERMINAL,
  },
  {
    label: 'Cobro con link de pago',
    value: SalesType.LINK,
  },
  {
    label: 'Ver todos',
    value: SalesType.ALL,
  },
];
