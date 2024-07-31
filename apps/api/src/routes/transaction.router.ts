import { Router } from 'express';
import {
  createTransaction,
  getTransactionById,
  updateTransactionStatus,
  deleteTransaction,
  getTransactions,
} from '../controllers/transaction.controller';

const router = Router();

router.get('/transactions', getTransactions);
router.post('/transactions', createTransaction);
router.get('/transactions/:id', getTransactionById);
router.patch('/transactions/:id', updateTransactionStatus);
router.delete('/transactions/:id', deleteTransaction);


export default router;
