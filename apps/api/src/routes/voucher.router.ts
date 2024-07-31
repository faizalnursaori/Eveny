import { Router } from 'express';
import { getVoucher, usedVoucher, UsedPoints } from '@/controllers/voucher.controllers';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();
router.get('/voucher/:id', getVoucher);
router.delete('/user/point/:id', UsedPoints);
router.delete('/voucher/:id', usedVoucher);

export default router;