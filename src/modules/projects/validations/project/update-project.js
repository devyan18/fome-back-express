import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const updateProjectByIdSchema = [
  body('title')
    .optional()
    .isLength({ min: 2 })
    .withMessage('Must be at least 2 chars long'),
  body('description')
    .optional()
    .isString()
    .withMessage('Must be a string'),
  param('projectId')
    .exists()
    .withMessage('projectId is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('projectId is invalid');
      }

      return true;
    })
];
