import { TransactionStatus } from '@prisma/client';

export interface CreateTransactionDto {
  eventId: number;
  userId: number;
  quantity: number;
  voucherId?: number;
  pointsUsed?: number;
}

export interface UpdateTransactionStatusDto {
  status: TransactionStatus;
}

export interface TransactionResponse {
  id: number;
  eventId: number;
  userId: number;
  quantity: number;
  totalPrice: number;
  finalPrice: number;
  discount: number;
  pointsUsed: number;
  voucherId?: number;
  status: TransactionStatus;
}
