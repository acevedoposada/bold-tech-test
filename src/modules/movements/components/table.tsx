import { GoLink } from 'react-icons/go';
import dayjs from 'dayjs';

import Table, { TableHeader, TableBody } from '@/shared/components/table';
import { tableHeaders } from '../constants/table-movements';
import { SalesType } from '@/shared/constants/financials';
import { Transaction } from '@/shared/types/movements';
import { formatCurrency } from '@/shared/lib/numbers';
import { transactionStatusLabels } from '../constants/payment-methods';
import PaymentCell from './payment-cell';

interface MovementsTableProps {
  className?: string;
  movements: Transaction[];
  onRowClick?: (element: Transaction) => void;
}

function MovementsTable({
  className,
  movements,
  onRowClick,
}: MovementsTableProps) {
  return (
    <Table className={className}>
      <TableHeader values={tableHeaders} />
      <TableBody>
        {movements.map((movement) => (
          <tr
            key={movement.id}
            className="h-20 cursor-pointer hover:bg-brand-gray-light/30"
            onClick={() => onRowClick?.(movement)}
          >
            <td>
              <p className="flex items-center gap-4 text-primary">
                <span className="inline-block">
                  {movement.salesType === SalesType.TERMINAL ? (
                    <i className="text-xl icon-terminal"></i>
                  ) : (
                    <GoLink />
                  )}
                </span>
                <span className="text-sm font-semibold">
                  {transactionStatusLabels[movement.status]}
                </span>
              </p>
            </td>
            <td>{dayjs(movement.createdAt).format('DD/MM/YYYY - HH:mm:ss')}</td>
            <td>
              <PaymentCell
                method={movement.paymentMethod}
                reference={movement.transactionReference}
                franchise={movement.franchise}
              />
            </td>
            <td>{movement.id}</td>
            <td>
              <p className="font-semibold text-primary">
                {formatCurrency(movement.amount)}
              </p>
              {movement.deduction && (
                <>
                  <p className="text-sm text-brand-gray-dark/60">
                    Deducción Bold
                  </p>
                  <p className="text-sm text-red-500">
                    {formatCurrency(movement.deduction)}
                  </p>
                </>
              )}
            </td>
          </tr>
        ))}
      </TableBody>
    </Table>
  );
}

export default MovementsTable;
