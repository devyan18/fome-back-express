import { body } from 'express-validator';

export const createUserSchema = [
  body('nickName')
    .exists()
    .withMessage('nickName is required')
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('password')
    .exists()
    .withMessage('password is required')
    .isLength({ min: 8 })
    .withMessage('Must be at least 8 chars long')
];
