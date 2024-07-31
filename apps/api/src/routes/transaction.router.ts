import { Router } from 'express';
import {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
} from '../controllers/transaction.controller';

const router = Router();

router.post('/transactions', createTransaction);
router.get('/transactions/:id', getTransactionById);
router.patch('/transactions/:id', updateTransactionStatus);
router.delete('/transactions/:id', deleteTransaction);

export default router;
