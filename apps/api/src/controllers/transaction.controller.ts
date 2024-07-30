import { Request, Response } from 'express';
import { TransactionStatus } from '@prisma/client';
import prisma from '@/prisma';

// Create a new transaction
export const createTransaction = async (req: Request, res: Response) => {
  try {
    const {
      eventId,
      totalPrice,
      finalPrice,
      discount,
      pointsUsed,
      userId,
      voucherId,
      quantity,
    } = req.body;

    const transaction = await prisma.transaction.create({
      data: {
        eventId,
        totalPrice,
        finalPrice,
        discount,
        pointsUsed,
        userId,
        voucherId,
        status: TransactionStatus.pending, // initially set to pending
        quantity,
      },
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get transaction by ID
export const getTransactionById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const transaction = await prisma.transaction.findUnique({
      where: { id: parseInt(id) },
    });

    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    res.status(200).json(transaction);
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Update transaction status
export const updateTransactionStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const result = await prisma.$transaction(async (prisma) => {
      // Fetch the transaction
      const transaction = await prisma.transaction.findUnique({
        where: { id: parseInt(id) },
      });

      if (!transaction) {
        throw new Error('Transaction not found');
      }

      if (transaction.status === TransactionStatus.completed) {
        throw new Error('Transaction is already completed');
      }

      // Fetch the associated event
      const event = await prisma.event.findUnique({
        where: { id: transaction.eventId },
      });

      if (!event) {
        throw new Error('Associated event not found');
      }

      // Check if there are enough available seats
      if (event.availableSeat < transaction.quantity) {
        throw new Error('Not enough available seats');
      }

      // Update the transaction status
      const updatedTransaction = await prisma.transaction.update({
        where: { id: parseInt(id) },
        data: { status },
      });

      // If the status is being set to completed, update the available seats
      if (status === TransactionStatus.completed) {
        await prisma.event.update({
          where: { id: transaction.eventId },
          data: {
            availableSeat: {
              decrement: transaction.quantity,
            },
          },
        });
      }

      return updatedTransaction;
    });

    res.status(200).json(result);
  } catch (error) {
    console.error('Error updating transaction status:', error);
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

// Delete transaction
export const deleteTransaction = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.transaction.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).end();
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
