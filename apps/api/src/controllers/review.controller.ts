import { Request, Response } from 'express';
import prisma from '@/prisma';

export const createReview = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { userId, rating, comment } = req.body;

    // const hasAttended = await checkUserAttendance(userId, eventId);
    // if (!hasAttended) {
    //   return res.status(403).json({ message: 'User has not attended this event' });
    // }

    const userTransaction = await prisma.transaction.findMany({
      where: {
        userId: Number(userId),
        eventId: Number(eventId),
      },
    });

    if (userTransaction.length === 0) {
      return res
        .status(403)
        .json({ message: 'User has not attended this event' });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        event: { connect: { id: Number(eventId) } },
        user: { connect: { id: Number(userId) } },
      },
    });

    res.status(201).json({ message: 'Review success', review });
  } catch (error) {
    console.error('Create review error', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await prisma.review.update({
      where: { id: Number(id) },
      data: { rating, comment },
    });

    res.status(200).json({ message: 'Updated review success', review });
  } catch (error) {
    console.error('Error updating review', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const review = await prisma.review.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Deleted review success', review });
  } catch (error) {
    console.error('Error deleting review', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
