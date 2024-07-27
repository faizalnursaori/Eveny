import { Router } from 'express';
import { createTransaction, getTransactions } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();

// router.use(verifyToken);
router.post('/transaction', createTransaction);
router.get('/transaction', getTransactions);

export default router;
