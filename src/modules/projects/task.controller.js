import { Router } from 'express';
import {
  addTaskToProject,
  changeStateTask,
  deleteTaskInProject,
  getAllTaskByProject
} from './task.service.js';

import { validations } from './validations/tasks/index.js';

const taskRouter = Router();

taskRouter.post(
  '/:projectId',
  validations.create,
  async (req, res) => {
    try {
      const project = await addTaskToProject({
        projectId: req.params.projectId,
        taskData: req.body
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error creating task' });
    }
  });

taskRouter.get(
  '/:projectId',
  validations.getById,
  async (req, res) => {
    try {
      const project = await getAllTaskByProject({ projectId: req.params.projectId });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error getting tasks' });
    }
  });

taskRouter.delete(
  '/:projectId/:taskId',
  validations.delete,
  async (req, res) => {
    try {
      const project = await deleteTaskInProject({
        projectId: req.params.projectId,
        taskId: req.params.taskId
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting task' });
    }
  });

taskRouter.patch(
  '/:projectId/:taskId/done',
  validations.state,
  async (req, res) => {
    try {
      const project = await changeStateTask({
        projectId: req.params.projectId,
        taskId: req.params.taskId
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error done task' });
    }
  });

export { taskRouter };
