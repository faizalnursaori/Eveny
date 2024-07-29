import express from 'express';
import {
  createTransaction,
  getAllTransaction,
  getTransaction,
} from '@/controllers/transaction.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = express.Router();

router.post('/transactions', verifyToken, createTransaction);
router.get('/transactions', verifyToken, getAllTransaction);
router.get('/transactions/:id', verifyToken, getTransaction);

export default router;
