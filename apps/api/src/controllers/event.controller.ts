import { Request, Response } from 'express';
import prisma from '@/prisma';
import slugify from 'slugify';
import path from 'path';

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
    isFree,
    price,
    organizerId,
  } = req.body;

  try {
    let slug = slugify(title, {
      lower: true,
    });

    const imageUrl = req.file ? `/events/${req.file.filename}` : null;

    const event = await prisma.event.create({
      data: {
        slug,
        category,
        title,
        description,
        location,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        availableSeat: parseInt(availableSeat, 10),
        maxAttendees: parseInt(maxAttendees, 10),
        imageUrl,
        isFree: isFree === 'true', // Mengonversi string ke boolean
        price: parseFloat(price),
        organizer: { connect: { id: parseInt(organizerId, 10) } },
      },
    });

    res.status(201).json({ message: 'Event created successfully', event });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        organizer: true,
      },
    });
    res.status(200).json({ message: 'Get all event success', events });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEvent = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const event = await prisma.event.findUnique({
      where: { slug: slug },
      include: {
        promotions: true,
        organizer: true,
      },
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

    if (updateData.title) {
      const newSlug = slugify(updateData.title, {
        lower: true,
      });

      updateData.slug = newSlug;
    }

    const event = await prisma.event.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.status(200).json({ message: 'Update event success', event });
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
