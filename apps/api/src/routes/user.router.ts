import { Router } from 'express';
import { getUser, editUser } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();
router.get('/user/:id', verifyToken, getUser);
router.put('/user/:id', verifyToken, editUser);

export default router;
