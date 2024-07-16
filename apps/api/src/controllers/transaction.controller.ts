import { Request, Response } from 'express';
import prisma from '@/prisma';

export const createTransaction = async (req: Request, res: Response) => {
  const { totalPrice, finalPrice, discount, pointsUsed, userId, tickets } =
    req.body;

  try {
    // Buat transaksi
    const transaction = await prisma.transaction.create({
      data: {
        totalPrice,
        finalPrice,
        discount,
        pointsUsed,
        user: { connect: { id: userId } },
        status: 'pending', // Anda mungkin ingin menetapkan status awal
      },
    });

    // Buat tiket-tiket yang terkait dengan transaksi
    const createdTickets = await Promise.all(
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

    // Ambil transaksi yang sudah dibuat beserta tiket-tiketnya
    const transactionWithTickets = await prisma.transaction.findUnique({
      where: { id: transaction.id },
      include: { tickets: true },
    });

    res
      .status(201)
      .json({
        message: 'Transaction created successfully',
        transaction: transactionWithTickets,
      });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res.status(500).json({ error: 'Failed to create transaction' });
  }
};
