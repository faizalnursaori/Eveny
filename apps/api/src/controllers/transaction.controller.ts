import { Request, Response } from 'express';
import { TransactionStatus } from '@prisma/client';
import prisma from '@/prisma';
import {
  CreateTransactionDto,
  UpdateTransactionStatusDto,
  TransactionResponse,
} from '@/utils/types';

// Create a new transaction
export const createTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      eventId,
      userId,
      quantity,
      voucherId,
      pointsUsed,
    }: CreateTransactionDto = req.body;

    const event = await prisma.event.findUnique({ where: { id: eventId } });
    if (!event) {
      res.status(404).json({ message: 'Event not found' });
      return;
    }

    if (event.availableSeat < quantity) {
      res.status(400).json({ message: 'Not enough available seats' });
      return;
    }

    const totalPrice = event.price ? Number(event.price) * quantity : 0;

    let discount = 0;
    if (voucherId) {
      const voucher = await prisma.voucher.findUnique({
        where: { id: voucherId },
      });
      if (voucher && voucher.usage < voucher.maxUsage) {
        discount = voucher.discount;
      }
    }

    const pointDiscount = pointsUsed || 0;

    const finalPrice = Math.max(totalPrice - discount - pointDiscount, 0);

    const result = await prisma.$transaction(async (prisma) => {
      const transaction = await prisma.transaction.create({
        data: {
          eventId,
          userId,
          quantity,
          totalPrice,
          finalPrice,
          discount,
          pointsUsed: pointsUsed || 0,
          voucherId,
          status: 'pending' as TransactionStatus,
        },
      });

      const updatedEvent = await prisma.event.update({
        where: { id: eventId },
        data: {
          availableSeat: {
            decrement: quantity,
          },
        },
      });

      return { transaction, updatedEvent };
    });

    const response: TransactionResponse = {
      id: result.transaction.id,
      eventId: result.transaction.eventId,
      userId: result.transaction.userId,
      quantity: result.transaction.quantity,
      totalPrice: result.transaction.totalPrice,
      finalPrice: result.transaction.finalPrice,
      discount: result.transaction.discount,
      pointsUsed: result.transaction.pointsUsed,
      voucherId: result.transaction.voucherId || undefined,
      status: result.transaction.status,
    };

    res.status(201).json(response);
  } catch (error) {
    res.status(500).json({
      message: 'Error creating transaction',
      error: (error as Error).message,
    });
  }
};

export const getTransactionById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
      include: {
        event: true,
        user: true,
        voucher: true,
      },
    });

    if (!transaction) {
      res.status(404).json({ message: 'Transaction not found' });
      return;
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching transaction',
      error: (error as Error).message,
    });
  }
};

export const updateTransactionStatus = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;
    const { status }: UpdateTransactionStatusDto = req.body;

    if (!['pending', 'completed', 'failed'].includes(status)) {
      res.status(400).json({ message: 'Invalid status' });
      return;
    }

    const updatedTransaction = await prisma.transaction.update({
      where: { id: parseInt(id) },
      data: { status: status as TransactionStatus },
    });

    res.json(updatedTransaction);
  } catch (error) {
    res.status(500).json({
      message: 'Error updating transaction status',
      error: (error as Error).message,
    });
  }
};

export const deleteTransaction = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { id } = req.params;

    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'Error deleting transaction',
      error: (error as Error).message,
    });
  }
};
