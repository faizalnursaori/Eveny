import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export interface JwtPayload {
  userId: number;
  email: string;
  role?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '').trim();
  console.log(token);
  

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  if (!JWT_SECRET) {
    console.error('JWT_SECRET is not set');
    return res.status(500).json({ message: 'Internal server error' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
    console.error('Error in verifyToken middleware:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const adminGuard = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user?.role !== 'organizer') {
      return res.status(401).json({
        message: 'Unauthorized: Not organizer',
      });
    }
    next();
  } catch (error) {
    console.error('Error in adminGuard', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
