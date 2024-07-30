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
router.put('/reviews/:id', updateReview);
router.delete('/reviews/:id', deleteReview);

export default router;
