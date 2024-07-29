import { Request, Response } from 'express';
import prisma from '@/prisma';

interface TransactionRequestBody {
  totalPrice: number;
  finalPrice: number;
  discount: number;
  pointsUsed: number;
  userId: number;
  eventId: number;
}

export const createTransaction = async (req: Request, res: Response) => {
  const { totalPrice, finalPrice, discount, pointsUsed, userId, eventId } =
    req.body as TransactionRequestBody;

  try {
    // Check if the event exists and has available seats
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    if (event.availableSeat <= 0) {
      return res
        .status(400)
        .json({ message: 'No available seats for this event' });
    }

    // Create the transaction
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

    // Update available seats for the event
    await prisma.event.update({
      where: { id: eventId },
      data: { availableSeat: event.availableSeat - 1 },
    });

    // If points were used, update the user's points
    if (pointsUsed > 0) {
      await prisma.point.updateMany({
        where: { userId, isUsed: false },
        data: { isUsed: true },
      });

      // Create a point transaction record
      await prisma.pointTransaction.create({
        data: {
          userId,
          amount: -pointsUsed,
          description: `Used ${pointsUsed} points for event booking`,
        },
      });
    }

    // Fetch the created transaction with related data
    const transactionWithDetails = await prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Fetch event details separately
    const eventDetails = await prisma.event.findUnique({
      where: { id: eventId },
      select: { id: true, title: true, startDate: true, endDate: true },
    });

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: {
        ...transactionWithDetails,
        event: eventDetails,
      },
    });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};

export const getAllTransaction = async (req: Request, res: Response) => {
  try {
    const transactions = await prisma.transaction.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    // Fetch event details for each transaction
    const transactionsWithEvents = await Promise.all(
      transactions.map(async (transaction) => {
        const event = await prisma.event.findUnique({
          where: { id: transaction.eventId },
          select: { id: true, title: true, startDate: true, endDate: true },
        });
        return { ...transaction, event };
      }),
    );

    res.status(200).json({
      message: 'Get all Transactions success',
      transactions: transactionsWithEvents,
    });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTransaction = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const transaction = await prisma.transaction.findUnique({
      where: { id: Number(id) },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    // Fetch event details
    const event = await prisma.event.findUnique({
      where: { id: transaction.eventId },
      select: {
        id: true,
        title: true,
        startDate: true,
        endDate: true,
        location: true,
      },
    });

    res.status(200).json({
      message: 'Get transaction success',
      transaction: { ...transaction, event },
    });
  } catch (error) {
    console.error('Error fetching transaction:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
