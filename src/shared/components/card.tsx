import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { CommonProps } from '@/shared/types/common';
import { cn } from '../lib/utils';

type CardCommonProps = CommonProps &
  DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

function Card({ children, className, ...props }: CardCommonProps) {
  return (
    <section
      className={cn('bg-white rounded-2xl shadow-lg', className)}
      {...props}
    >
      {children}
    </section>
  );
}

function CardHeader({ children, className, ...props }: CardCommonProps) {
  return (
    <div
      className={cn('p-4 text-white brand-gradient rounded-t-2xl', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function CardBody({ children, className, ...props }: CardCommonProps) {
  return (
    <div className={cn('p-4', className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
export { CardHeader, CardBody };
