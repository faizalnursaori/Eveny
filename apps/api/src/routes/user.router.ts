import { Router } from 'express';
import { getUser } from '@/controllers/user.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();
router.get('/user/:id', verifyToken, getUser);

export default router;
