import { param } from 'express-validator';
import { isValidObjectId } from 'mongoose';

export const deleteTaskInProjectSchema = [
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
        throw new Error('taskId is invalid');
      }
      return true;
    })
];
