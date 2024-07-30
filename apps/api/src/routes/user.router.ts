import { Router } from 'express';
import { getUser, editUser, getPoints } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();
router.get('/user/:id', verifyToken, getUser);
router.get('/user/point/:id', verifyToken, getPoints);
router.put('/user/:id', verifyToken, editUser);

export default router;
