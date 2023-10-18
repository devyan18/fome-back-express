import { aplyValidation } from '../../../../middlewares/validations.js';

import { createTaskSchema } from './create-task.js';
import { deleteTaskInProjectSchema } from './delete-task.js';
import { changeStateTaskInProjectSchema } from './done-task.js';
import { getTasksByProjectIdSchema } from './get-by-id-tasks.js';

export const validations = {
  create: [createTaskSchema, aplyValidation],
  delete: [deleteTaskInProjectSchema, aplyValidation],
  state: [changeStateTaskInProjectSchema, aplyValidation],
  getById: [getTasksByProjectIdSchema, aplyValidation]
};
