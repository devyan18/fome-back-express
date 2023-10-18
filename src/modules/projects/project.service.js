// Importar el modelo de projectos
import { ProjectModel } from './entity/project.js';

// Función para crear un nuevo projecto
async function createProject ({ projectData }) {
  try {
    const newProject = new ProjectModel(projectData);
    const savedProject = await newProject.save();
    return savedProject;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para obtener todos los projectos
async function getAllProjects () {
  try {
    const allProjects = await ProjectModel
      .find()
      .populate('tasks')
      .populate('creator');
    return allProjects;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para obtener un projecto por su ID
async function getProjectById ({ projectId }) {
  try {
    const project = await ProjectModel.findById(projectId);
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para actualizar un projecto por su ID
async function updateProjectById ({ projectCreator, projectId, projectData }) {
  try {
    const project = await ProjectModel.findOne({ projectId, projectCreator });

    if (!project) {
      throw new Error('Project not found');
    }

    project.set(projectData);

    const updatedProject = await project.save();

    return updatedProject;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Función para eliminar un projecto por su ID
async function deleteProjectById ({ projectCreator, projectId }) {
  try {
    const deletedProject = await ProjectModel.findOneAndDelete({ projectId, projectCreator });
    return deletedProject;
  } catch (error) {
    throw new Error(error.message);
  }
}

// Exportar las funciones
export {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById
};
