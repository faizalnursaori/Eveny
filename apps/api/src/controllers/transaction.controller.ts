import { Request, Response } from 'express';
import prisma from '@/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  const { totalPrice, finalPrice, discount, pointsUsed, userId, eventId } =
    req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        eventId,
        totalPrice,
        finalPrice,
        discount,
        pointsUsed,
        user: { connect: { id: userId } },
        status: 'pending',
      },
    });

    const transactionWithTickets = await prisma.transaction.findUnique({
      where: { id: transaction.id },
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: transactionWithTickets,
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const transactionsData = prisma.transaction.findMany();
    res
      .status(200)
      .json({ message: 'Get all Transactions success', transactionsData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
