import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CommonProps } from '../types/common';
import { cn } from '../lib/utils';

import '@styles/table.css';

type TableProps<T = HTMLTableElement> = CommonProps &
  DetailedHTMLProps<HTMLAttributes<T>, T>;

function Table({ children, className, ...props }: TableProps) {
  return (
    <table className={cn('', className)} {...props}>
      {children}
    </table>
  );
}

function TableHeader({
  values,
  className,
  ...props
}: { values: string[] } & TableProps<HTMLTableSectionElement>) {
  return (
    <thead
      className={cn('border-b border-brand-gray-dark/30', className)}
      {...props}
    >
      <tr>
        {values.map((value) => (
          <td key={value} className="px-4 py-3 text-sm">
            {value}
          </td>
        ))}
      </tr>
    </thead>
  );
}

function TableBody({
  children,
  className,
  ...props
}: TableProps<HTMLTableSectionElement>) {
  return (
    <tbody className={cn('table__body', className)} {...props}>
      {children}
    </tbody>
  );
}

export default Table;
export { TableHeader, TableBody };
