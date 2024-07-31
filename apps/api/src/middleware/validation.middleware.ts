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

export const validateTransaction = [
  body('totalPrice')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Total price must be a positive decimal')
    .custom((value) => value > 0)
    .withMessage('Total price must be greater than 0'),
  body('finalPrice')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Final price must be a positive decimal')
    .custom((value) => value > 0)
    .withMessage('Final price must be greater than 0'),
  body('discount')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Final price must be a positive decimal')
    .custom((value) => value > 0)
    .withMessage('Final price must be greater than 0'),
  body('pointsUsed')
    .isInt({ min: 0 })
    .withMessage('Points used must be a non-negative integer'),
  body('userId').isInt().withMessage('User ID must be an integer'),
  body('ticket').isArray().withMessage('Ticket must be an array'),
  body('ticket.*.ticketType').notEmpty().withMessage('Ticket type is required'),
  body('ticket.*.ticketAvailable')
    .isIn(['available', 'sold'])
    .withMessage('Invalid ticket status'),
  body('ticket.*.quantity')
    .isInt({ min: 1 })
    .withMessage('Quantity must be a positive integer'),
  body('tickets.*.price')
    .isDecimal({ decimal_digits: '0,2' })
    .withMessage('Ticket price must be a positive decimal')
    .custom((value) => value > 0)
    .withMessage('Ticket price must be greater than 0'),
  body('tickets.*.eventId').isInt().withMessage('Event ID must be an integer'),
];
