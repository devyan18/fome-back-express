import { Schema } from 'mongoose';

export const STATES = {
  STOPPED: 'stopped',
  STARTED: 'started',
  FINISHED: 'finished'
};

export const taskSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: STATES.STOPPED,
    enum: [...Object.values(STATES)]
  }
});
