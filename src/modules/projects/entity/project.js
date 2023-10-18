import { model, Schema } from 'mongoose';
import { taskSchema } from './task.js';
import '../../../settings/mongoose-populate-config.js';

const projectSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
    autopopulate: true
  },
  tasks: [taskSchema]
}, {
  timestamps: true
});

export const ProjectModel = model('project', projectSchema);
