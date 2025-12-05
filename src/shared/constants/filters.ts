import dayjs from '@lib/dayjs';

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
    defaultChecked: true,
  },
];

export const filterTimeRanges = {
  today: [dayjs().startOf('day'), dayjs().endOf('day')],
  week: [dayjs().startOf('week'), dayjs().endOf('week')],
  month: [dayjs().startOf('month'), dayjs().endOf('month')],
};
