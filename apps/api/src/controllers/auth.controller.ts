import { Request, Response } from 'express';
import prisma from '@/prisma';
import jwt from 'jsonwebtoken';
import bcrypt, { genSalt } from 'bcrypt';

export const register = async (req: Request, res: Response) => {
  try {
    const { username, name, email, password, phoneNumber, referralCode } =
      req.body;

    if (!username || !name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({ message: 'User already exist' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //Create a referral code from the first 3 letters of the User's name
    const namePrefix = name.slice(0, 3).toUpperCase();
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const newReferralCode = `${namePrefix}${randomNumber}`;

    //Logic reffered by
    let referredBy = null;
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });
      if (referrer) {
        referredBy = referrer.id;
      }
    }

    const user = await prisma.user.create({
      data: {
        username,
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        referralCode: newReferralCode,
        referredById: referredBy,
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
  const JWT_SECRET = process.env.JWT_SECRET;
  try {
    const { email, password } = req.body;
    console.log(email, password);
    

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

    const payload = {
      userId: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
      iat: Date.now(),
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: '24h',
    });
    console.log(token);
    
    

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000,
    });

    res.status(200).json({ message: 'Login success', data: user, token });
  } catch (error) {
    console.error('Error login', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
