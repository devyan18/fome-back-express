import { param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const getTasksByProjectIdSchema = [
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
