import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

// Create an event
export const createEvent = async (req: Request, res: Response) => {
  const {
    category,
    title,
    description,
    location,
    startDate,
    endDate,
    availableSeat,
    maxAttendees,
    imageUrl,
    isFree,
    price,
    organizerId,
  } = req.body;

  if (!title || !description || !startDate || !endDate) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const event = await prisma.event.create({
      data: {
        category,
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        availableSeat,
        maxAttendees,
        imageUrl,
        isFree,
        price: isFree ? null : price,
        organizer: { connect: { id: organizerId } },
      },
    });
    res.status(201).json({ message: 'Create event success', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany();
    res.status(200).json({ message: 'Get all event success', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const event = await prisma.event.findUnique({
      where: { id: Number(id) },
    });

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Get event success', event });
  } catch (error) {
    console.error('Error fetching event', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No update data provided' });
    }

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.status(200).json({ message: 'Update event sucess', event });
  } catch (error) {
    console.error('Error updating event', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const event = await prisma.event.delete({
      where: { id: Number(id) },
    });

    res.status(200).json({ message: 'Delete event success', event });
  } catch (error) {
    console.error('Error deleting event', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { totalPrice, finalPrice, discount, pointsUsed, userId, tickets } =
    req.body;

  try {
    const transaction = await prisma.transaction.create({
      data: {
        totalPrice,
        finalPrice,
        discount,
        pointsUsed,
        user: { connect: { id: userId } },
        tickets: {
          create: tickets.map((ticket: any) => ({
            ticketType: ticket.ticketType,
            ticketAvailable: ticket.ticketAvailable,
            quantity: ticket.quantity,
            price: ticket.price,
            event: { connect: { id: ticket.eventId } },
          })),
        },
      },
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};
