import { Router } from 'express';
import {
  createUser,
  deleteUserById,
  getUserById,
  getUsers,
  updateUserById
} from './user.service.js';

import { aplyValidation } from '../../middlewares/validations.js';

import { createUserSchema } from './validations/create-user.js';
import { updateUserSchema } from './validations/update-user.js';

const userRouter = Router();

userRouter.get('/', async (_req, res) => {
  try {
    const users = await getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.get('/:id', async (req, res) => {
  try {
    const user = await getUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post('/', createUserSchema, aplyValidation, async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.patch('/:id', updateUserSchema, aplyValidation, async (req, res) => {
  try {
    const user = await updateUserById(req.params.id, req.body);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.delete('/:id', async (req, res) => {
  try {
    const user = await deleteUserById(req.params.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { userRouter };
