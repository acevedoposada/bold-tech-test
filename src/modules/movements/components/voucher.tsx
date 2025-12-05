import { HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { GoLink } from 'react-icons/go';
import { motion } from 'motion/react';
import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { SalesType, TransactionStatus } from '@/shared/constants/financials';
import { Transaction } from '@/shared/types/movements';
import { formatCurrency } from '@/shared/lib/numbers';
import { cn } from '@/shared/lib/utils';
import dayjs from '@lib/dayjs';

import PaymentCell from './payment-cell';
import NumberFlow from '@number-flow/react';

interface VoucherProps {
  transaction: Transaction;
}

const labels = {
  title: {
    SUCCESSFUL: '¡Cobro exitoso!',
    REJECTED: 'Cobro no realizado',
  },
  salesType: {
    TERMINAL: 'Datáfono',
    PAYMENT_LINK: 'Link de pagos',
  },
};

const appearAnimation = {
  hidden: { x: 25, opacity: 0 },
  shown: (custom: number) => ({ x: 0, opacity: 1, transition: { delay: (custom * 0.1) + 0.3 } })
}

function Voucher({ transaction }: VoucherProps) {
  const [amountValue, setAmountValue] = useState(0)
  const isSuccesfully = transaction.status === TransactionStatus.SUCCESSFUL;
  const Icon = motion.create(isSuccesfully ? HiCheckCircle : HiXCircle);

  const transactionIcon =
    transaction.salesType === SalesType.TERMINAL ? (
      <i className="text-xl icon-terminal text-primary" />
    ) : (
      <GoLink className="text-primary" />
    );

  const info = useMemo(() => {
    const data = [
      ['ID transacción Bold', <p className="font-bold">{transaction.id}</p>],
      ['Divider'],
      [
        'Método de pago',
        <PaymentCell
          method={transaction.paymentMethod}
          reference={transaction.transactionReference}
          franchise={transaction.franchise}
          className="justify-end gap-6 text-brand-gray-dark/80"
        />,
      ],
      [
        'Tipo de pago',
        <p className="flex items-center justify-end gap-3">
          {transactionIcon}{' '}
          <span className="text-sm font-bold">
            {
              labels.salesType[
              transaction.salesType as keyof typeof labels.salesType
              ]
            }
          </span>
        </p>,
      ],
    ];
    if (transaction.deduction) {
      data.splice(1, 0, [
        'Deducción Bold',
        <p className="text-sm font-bold text-red-400">
          {formatCurrency(-transaction.deduction)}
        </p>,
      ]);
    }
    return data;
  }, [transaction.id]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setAmountValue(transaction.amount)
      clearTimeout(timeoutId)
    }, 300)
  }, [])

  return (
    <motion.div className="px-4 pb-20 lg:pb-0 lg:px-8" initial="hidden" animate="shown" >
      <div className="grid gap-2 py-16 text-center">
        <Icon
          key={transaction.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1, transition: { type: 'spring', stiffness: 300, delay: 0.3, duration: 0.3 } }}
          size={48}
          className={cn('mx-auto', {
            'text-green-300': isSuccesfully,
            'text-red-400': !isSuccesfully,
          })}
        />
        <motion.p custom={0} variants={appearAnimation} className="text-xl font-bold">{labels.title[transaction.status]}</motion.p>
        <motion.h5 custom={1} variants={appearAnimation} className="my-1 text-4xl font-semibold text-primary">
          <NumberFlow
            value={amountValue}
            locales="es-CO"
            format={{
              currency: 'COP',
              style: 'currency',
              minimumFractionDigits: 0,
            }}
          />
        </motion.h5>
        <motion.p custom={2} variants={appearAnimation} className="text-sm lg:text-base">
          {dayjs(transaction.createdAt).format('DD/MM/YYYY - HH:mm:ss')}
        </motion.p>
      </div>
      <motion.table custom={3} variants={appearAnimation} className="w-full">
        <tbody>
          {info.map(([label, value], idx) =>
            idx + 1 === info.length - 2 ? (
              <tr key={idx}>
                <td colSpan={2} className="py-2">
                  <div className="w-full h-px bg-brand-gray-dark" />
                </td>
              </tr>
            ) : (
              <tr key={idx}>
                <td className="py-2 font-medium text-brand-gray-dark/70">
                  {label}
                </td>
                <td align="right" className="py-2">
                  {value}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </motion.table>
    </motion.div>
  );
}

export default Voucher;
