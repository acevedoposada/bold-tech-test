import {
  TransactionStatus,
  PaymentMethod,
  SalesType,
  CardFranchise,
} from '../constants/financials';

export interface Transaction {
  id: string;
  status: TransactionStatus;
  paymentMethod: PaymentMethod;
  salesType: SalesType;
  createdAt: number;
  transactionReference: number;
  amount: number;

  franchise?: CardFranchise;
  deduction?: number;
}

export interface TransactionsResponse {
  data: Transaction[];
}
