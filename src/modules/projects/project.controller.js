import { Router } from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProjectById,
  deleteProjectById
} from './project.service.js';

import { validations } from './validations/project/index.js';

const projectRouter = Router();

projectRouter.get(
  '/',
  async (_req, res) => {
    try {
      const projects = await getAllProjects();
      res.status(200).json(projects);
    } catch (error) {
      res.status(500).json({ message: 'Error getting projects' });
    }
  });

projectRouter.get(
  '/:projectId',
  validations.getById,
  async (req, res) => {
    try {
      const project = await getProjectById({
        projectId: req.params.projectId
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error getting project' });
    }
  });

projectRouter.post(
  '/',
  validations.create,
  async (req, res) => {
    try {
      const project = await createProject({
        projectData: { ...req.body, creator: req.user._id }
      });
      res.status(201).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error creating project' });
    }
  });

projectRouter.patch(
  '/:projectId',
  validations.update,
  async (req, res) => {
    try {
      const project = await updateProjectById({
        projectId: req.params.projectId,
        projectData: { ...req.body, projectCreator: req.user._id }
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error updating project' });
    }
  });

projectRouter.delete(
  '/:projectId',
  validations.delete,
  async (req, res) => {
    try {
      const project = await deleteProjectById({
        projectId: req.params.projectId
      });
      res.status(200).json(project);
    } catch (error) {
      res.status(500).json({ message: 'Error deleting project' });
    }
  });

export { projectRouter };
