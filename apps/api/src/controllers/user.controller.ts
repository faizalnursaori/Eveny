import { Request, Response } from 'express';
import prisma from '@/prisma';
import { param } from 'express-validator';

export const getUser = async (req: Request, res: Response) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, name: true, email: true, role: true, username: true, phoneNumber: true, referralCode:true },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error('Error fetching current user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const editUser = async (req: Request, res: Response) => {
  try {
    const {id} = req.params
    const updateData = req.body;

    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: updateData,
    });

    res.status(200).json({ message: 'Update user data success', user });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const getPoints = async (req:Request, res: Response) => {
  try {
    const {id} = req.params
    const points = await prisma.point.findMany({
      where: {userId : Number(id)}
    })

    res.status(200).json({message: 'Getting user Points success', points})
  } catch (error) {
    console.error('Error getting user Point:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}