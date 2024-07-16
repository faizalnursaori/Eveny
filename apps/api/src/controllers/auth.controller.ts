import { Request, Response } from 'express';
import prisma from '@/prisma';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, phoneNumber } = req.body;

    if (!username || !email || !password || !phoneNumber) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
      },
    });

    res.status(201).json({ message: 'Register success', user });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        role: user.role,
        iat: Date.now(),
      },
      process.env.JWT_SECRET!,
      {
        expiresIn: '1h',
      },
    );

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res
      .status(200)
      .json({ message: 'Login success', data: user, login, token });
  } catch (error) {
    console.error('Error login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
