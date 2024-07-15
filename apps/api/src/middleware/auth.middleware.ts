import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const verifiedUser = jwt.verify(token, JWT_SECRET);
    req.user = { userId: verifiedUser };
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};
