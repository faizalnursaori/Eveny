import { Request, Response } from 'express';
import prisma from '@/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  const {
    totalPrice,
    finalPrice,
    discount,
    pointsUsed,
    userId,
    tickets,
    eventId,
  } = req.body;

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

    await Promise.all(
      tickets.map(async (ticket: any) => {
        return prisma.ticket.create({
          data: {
            ticketType: ticket.ticketType,
            quantity: ticket.quantity,
            price: ticket.price,
            event: { connect: { id: ticket.eventId } },
            transaction: { connect: { id: transaction.id } },
            ticketAvailable: 'sold',
          },
        });
      }),
    );

    const transactionWithTickets = await prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: { tickets: true },
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
