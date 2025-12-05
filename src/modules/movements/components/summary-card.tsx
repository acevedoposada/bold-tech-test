import NumberFlow from '@number-flow/react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo } from 'react';
import _ from 'lodash';

import Card, { CardHeader, CardBody } from '@/shared/components/card';
import Tooltip from '@/shared/components/tooltip';
import dayjs from '@lib/dayjs';
import AnimatedLabel from '@/shared/components/animated-label';
import { filterTimeRanges } from '@/shared/constants/filters';
import { Transaction } from '@/shared/types/movements';

interface SummaryCardProps {
  selectedTab: number;
  tabText: string;
  movements: Transaction[];
}

const labels = [
  dayjs().format('DD [de] MMMM YYYY'),
  `${filterTimeRanges.week[0].format('DD MMM, YYYY')} - ${filterTimeRanges.week[1].format('DD MMM, YYYY')}`,
  _.capitalize(dayjs().format('MMMM, YYYY')),
];
const ranges = [
  filterTimeRanges.today,
  filterTimeRanges.week,
  filterTimeRanges.month,
];

function SummaryCard({
  selectedTab = 0,
  tabText,
  movements,
}: SummaryCardProps) {
  const summary = useMemo(() => {
    const [startAt, endAt] = ranges[selectedTab] || [];
    if (!startAt || !endAt) return 0;
    return movements
      .filter((movement) =>
        dayjs(movement.createdAt).isBetween(startAt, endAt, 'day', '[]'),
      )
      .reduce(
        (previous, current) =>
          previous + (current.amount - (current.deduction || 0)),
        0,
      );
  }, [selectedTab, movements]);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <span>
          Total de ventas de{' '}
          <AnimatedLabel className="lowercase whitespace-nowrap">
            {tabText}
          </AnimatedLabel>
        </span>
        <Tooltip
          title={`Esta es la sumatoria de las ventas de ${tabText}`}
          clickable
        >
          <i className="text-xl icon-info" />
        </Tooltip>
      </CardHeader>
      <CardBody className="pt-5 text-center">
        <NumberFlow
          className="mb-3 text-2xl font-bold text-primary"
          value={summary}
          locales="es-CO"
          format={{
            currency: 'COP',
            style: 'currency',
            minimumFractionDigits: 0,
          }}
        />
        <div>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={selectedTab}
              layout
              initial={{ y: -5, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 5, opacity: 0 }}
            >
              {labels[selectedTab]}
            </motion.p>
          </AnimatePresence>
        </div>
      </CardBody>
    </Card>
  );
}

export default SummaryCard;
