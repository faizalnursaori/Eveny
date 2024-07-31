import { Router } from 'express';
import {
  createTransaction,
  getTransactionById,
  checkUserPurchase,
  updateTransactionStatus,
  deleteTransaction,
  getTransactions,
} from '../controllers/transaction.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();

router.post('/transactions', verifyToken, createTransaction);
router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.get('/transactions/:id', getTransactionById);
router.get(
  '/transactions/user/:userId/event/:eventId',
  verifyToken,
  checkUserPurchase,
);
router.patch('/transactions/:id', verifyToken, updateTransactionStatus);
router.delete('/transactions/:id', verifyToken, deleteTransaction);

export default router;
