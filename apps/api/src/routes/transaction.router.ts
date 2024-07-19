import { Router } from 'express';
import { createTransaction } from '@/controllers/transaction.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();

// router.use(verifyToken);
router.post('/transaction', createTransaction);

export default router;
