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
import upload from '@/middleware/uploader.middleware';

const router = Router();

// Get Event
router.get('/events', getAllEvents);
router.get('/events/:slug', getEvent);

// CRUD Event
router.post(
  '/events',
  verifyToken,
  adminGuard,
  upload.single('image'), // Tambahkan middleware upload
  validateEventCreation,
  createEvent,
);
router.put(
  '/events/:id',
  verifyToken,
  adminGuard,
  upload.single('image'), // Tambahkan middleware upload juga di sini jika diperlukan
  validateUpdateCreation,
  updateEvent,
);
router.delete('/events/:id', verifyToken, adminGuard, deleteEvent);

export default router;
