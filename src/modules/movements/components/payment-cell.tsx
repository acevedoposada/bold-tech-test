import { PaymentMethod } from '@/shared/constants/financials';
import { useMemo } from 'react';
import { iconsMapping } from '../constants/payment-methods';
import { cn } from '@/shared/lib/utils';
import Image from 'next/image';

interface PaymentCellProps {
  method: string;
  franchise?: string;
  reference: number;
}

function PaymentCell({ method, reference, franchise }: PaymentCellProps) {
  const icon = useMemo(
    () => iconsMapping[(franchise || method) as keyof typeof iconsMapping],
    [method],
  );
  return (
    <p className="flex items-center gap-2 text-sm">
      <span className="block w-8 overflow-hidden max-w-32">
        <Image
          src={icon.img}
          width={32}
          height={28}
          alt={franchise || method}
          className={`object-contain w-full h-full ${icon.additionalClasses}`}
        />
      </span>
      {method !== PaymentMethod.PSE ? `****${reference}` : PaymentMethod.PSE}
    </p>
  );
}

export default PaymentCell;
