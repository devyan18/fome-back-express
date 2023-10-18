import { body } from 'express-validator';

export const updateUserSchema = [
  body('nickName')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('password')
    .optional()
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 chars long')
];
