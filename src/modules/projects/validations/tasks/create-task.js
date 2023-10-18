import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const createTaskSchema = [
  param('projectId')
    .exists()
    .withMessage('projectId is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('projectId is invalid');
      }

      return true;
    }),
  body('title')
    .exists()
    .withMessage('title is required')
    .isString()
    .withMessage('Must be a string')
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('detail')
    .optional()
    .isString()
    .withMessage('Must be a string')
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long')
];
