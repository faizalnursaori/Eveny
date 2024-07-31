import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a new review
export const createReview = async (req: Request, res: Response) => {
  const { rating, comment, eventId, userId } = req.body;

  try {
    // Check if the user has purchased a ticket for this event
    const transaction = await prisma.transaction.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
        status: 'completed',
      },
    });

    if (!transaction) {
      return res
        .status(403)
        .json({ error: 'You must purchase a ticket to review this event' });
    }

    const review = await prisma.review.create({
      data: {
        rating,
        comment,
        event: {
          connect: { id: eventId },
        },
        user: {
          connect: { id: userId },
        },
      },
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

// Get all reviews for an event
export const getReviewsByEvent = async (req: Request, res: Response) => {
  const { eventId } = req.params;
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;

  if (isNaN(Number(eventId))) {
    return res.status(400).json({ error: 'Invalid eventId' });
  }

  try {
    const reviews = await prisma.review.findMany({
      where: { eventId: parseInt(eventId) },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            name: true,
          },
        },
        event: {
          select: {
            id: true,
            title: true,
            slug: true,
          },
        },
      },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalReviews = await prisma.review.count({
      where: { eventId: parseInt(eventId) },
    });

    res.status(200).json({
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalReviews / limit),
      totalReviews,
    });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

// Update a review
export const updateReview = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { rating, comment } = req.body;

  try {
    const review = await prisma.review.update({
      where: { id: parseInt(id) },
      data: {
        rating,
        comment,
      },
    });
    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update review' });
  }
};

// Delete a review
export const deleteReview = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
