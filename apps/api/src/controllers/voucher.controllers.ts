import { Request, Response } from 'express';
import prisma from '@/prisma';


export const UsedPoints = async (req:Request, res: Response) => {
    try {
      const {id} = req.params
      const points = await prisma.point.deleteMany({
        where: {userId : Number(id)}
      })
  
      res.status(200).json({message: 'Using user Points success', points})
    } catch (error) {
      console.error('Error using user Point:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
export const getVoucher = async (req:Request, res: Response) => {
    try {
      const {id} = req.params
      const voucher = await prisma.voucher.findFirst({
        where: {userId : Number(id)}
      })
  
      res.status(200).json({message: 'Getting user voucher success', voucher})
    } catch (error) {
      console.error('Error getting user voucher:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
export const usedVoucher = async (req:Request, res: Response) => {
    try {
      const {id} = req.params
      const voucher = await prisma.voucher.deleteMany({
        where: {userId : Number(id)}
      })
  
      res.status(200).json({message: 'using user voucher success', voucher})
    } catch (error) {
      console.error('Error using user voucher:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }