import { Router } from 'express';
import {
  createReview,
  updateReview,
  deleteReview,
} from '@/controllers/review.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = Router();

//CRUD Review
router.post('/events/:id/review', verifyToken, createReview);
router.put('/events/:id/review', verifyToken, updateReview);
router.delete('/events/:id/review', verifyToken, deleteReview);
export default router;
