import { Router } from 'express';
import {
  createEvent,
  getAllEvents,
  getEvent,
  updateEvent,
  deleteEvent,
} from '@/controllers/event.controller';
import { verifyToken } from '@/middleware/auth.middleware';
import {
  validateEventCreation,
  validateUpdateCreation,
} from '@/middleware/validation.middleware';

const router = Router();
router.get('/events', getAllEvents);
router.get('/events/:id', getEvent);

// router.use(verifyToken);
router.post('/events', validateEventCreation, createEvent);
router.put('/events/:id', validateUpdateCreation, updateEvent);
router.delete('/events/:id', deleteEvent);

export default router;
