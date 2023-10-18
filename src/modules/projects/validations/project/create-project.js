import { body } from 'express-validator';

export const createProjectSchema = [
  body('title')
    .exists()
    .withMessage('nickName is required')
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Must be a string')
];
