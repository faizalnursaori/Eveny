import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from '@/controllers/event.controller';
import { adminGuard, verifyToken } from '@/middleware/auth.middleware';
import {
  validateEventCreation,
  validateUpdateCreation,
} from '@/middleware/validation.middleware';

const router = Router();
router.get('/events', getAllEvents);
router.get('/events/:id', getEvent);

router.post('/events', verifyToken, adminGuard, validateEventCreation, createEvent);
router.put('/events/:id', verifyToken, adminGuard, validateUpdateCreation, updateEvent);
router.delete('/events/:id', verifyToken, adminGuard, deleteEvent);

export default router;
