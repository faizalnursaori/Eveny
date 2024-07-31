import express from 'express';
import {
  createReview,
  getReviewsByEvent,
  updateReview,
  deleteReview,
} from '../controllers/review.controller';
import { verifyToken } from '@/middleware/auth.middleware';

const router = express.Router();

router.post('/reviews', verifyToken, createReview);
router.get('/reviews/event/:eventId', getReviewsByEvent);
router.put('/reviews/:id', verifyToken, updateReview);
router.delete('/reviews/:id', verifyToken, deleteReview);

export default router;
