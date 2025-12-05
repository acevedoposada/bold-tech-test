import {
  CardFranchise,
  PaymentMethod,
  TransactionStatus,
} from '@/shared/constants/financials';

export const iconsMapping: Record<
  `${PaymentMethod}` | `${CardFranchise}`,
  {
    img: string;
    additionalClasses?: string;
  }
> = {
  [PaymentMethod.BANCOLOMBIA]: {
    img: '/bancolombia.png',
    additionalClasses: 'scale-80',
  },
  [PaymentMethod.NEQUI]: { img: '/nequi.svg' },
  [PaymentMethod.PSE]: { img: '/pse.png', additionalClasses: 'scale-80' },
  [PaymentMethod.DAVIPLATA]: { img: '/daviplata.svg' },
  [CardFranchise.MASTERCARD]: { img: '/mastercard.svg' },
  [CardFranchise.VISA]: { img: '/visa.svg' },
  [PaymentMethod.CARD]: { img: '' },
};

export const transactionStatusLabels: Record<TransactionStatus, string> = {
  [TransactionStatus.SUCCESSFUL]: 'Cobro exitoso',
  [TransactionStatus.REJECTED]: 'Cobro no realizado',
};
