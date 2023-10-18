import { aplyValidation } from '../../../../middlewares/validations.js';

import { createProjectSchema } from './create-project.js';
import { getProjectByIdSchema } from './get-project-id.js';
import { updateProjectByIdSchema } from './update-project.js';
import { deleteProjectSchema } from './delete-project.js';

export const validations = {
  create: [createProjectSchema, aplyValidation],
  getById: [getProjectByIdSchema, aplyValidation],
  update: [updateProjectByIdSchema, aplyValidation],
  delete: [deleteProjectSchema, aplyValidation]
};
