import { body, param } from 'express-validator';
import { isValidObjectId } from 'mongoose';
import { STATES } from '../../entity/task.js';

export const changeStateTaskInProjectSchema = [
  param('projectId')
    .exists()
    .withMessage('projectId is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('projectId is invalid');
      }

      return true;
    }),
  param('taskId')
    .exists()
    .withMessage('taskId is required')
    .custom((value) => {
      if (!isValidObjectId(value)) {
        throw new Error('projectId is invalid');
      }

      return true;
    }),
  body('state')
    .exists()
    .withMessage('state is required')
    .isIn([...Object.values(STATES)])
    .withMessage('state is invalid')
];
