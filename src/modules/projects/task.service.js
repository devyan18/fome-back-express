// Importar el modelo de projectos
import { ProjectModel } from './entity/project.js';

async function getAllTaskByProject ({ projectId }) {
  try {
    const project = await ProjectModel.findById(projectId).populate('tasks');

    if (!project?.tasks) return [];

    return project.tasks;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function addTaskToProject ({ projectId, taskData }) {
  console.log({ projectId }, { taskData });

  try {
    const project = await ProjectModel.findByIdAndUpdate(projectId, {
      $push: {
        tasks: taskData
      }
    }, { new: true }).populate('tasks');

    if (!project?.tasks) return [];

    return project.tasks;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function changeStateTask ({ projectId, taskId, newState }) {
  try {
    const project = await ProjectModel.findByIdAndUpdate(projectId, {
      $set: {
        'tasks.$[task].state': newState
      }
    }, {
      arrayFilters: [
        {
          'task._id': taskId
        }
      ],
      new: true
    });
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
}

async function deleteTaskInProject ({ projectId, taskId }) {
  try {
    const project = await ProjectModel.findByIdAndUpdate(projectId, {
      $pull: {
        tasks: {
          _id: taskId
        }
      }
    }, { new: true });
    return project;
  } catch (error) {
    throw new Error(error.message);
  }
}

export {
  getAllTaskByProject,
  addTaskToProject,
  changeStateTask,
  deleteTaskInProject
};
