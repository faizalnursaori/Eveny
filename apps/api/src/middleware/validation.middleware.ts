import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

export const validateEventCreation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('startDate').isISO8601().toDate().withMessage('Invalid start date'),
  body('endDate').isISO8601().toDate().withMessage('Invalid end date'),
  body('maxAttendees')
    .isInt({ min: 1 })
    .withMessage('Max attendees must be a positive number'),
  body('isFree').isBoolean().withMessage('Must be a boolean'),
  body('price')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export const validateUpdateCreation = [
  body('title').optional().notEmpty().withMessage('Title is required'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description is required'),
  body('startDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid start date'),
  body('endDate')
    .optional()
    .isISO8601()
    .toDate()
    .withMessage('Invalid end date'),
  body('maxAttendees')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Max attendees must be a positive number'),
  body('isFree').optional().isBoolean().withMessage('Must be a boolean'),
  body('price')
    .optional({ nullable: true })
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
