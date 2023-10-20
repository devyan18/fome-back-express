import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import { Server } from 'socket.io';
import { createServer } from 'node:http';

import { settings } from './settings/config.js';
import { connectDB } from './settings/database.js';

import { userRouter } from './modules/users/user.controller.js';
import { projectRouter } from './modules/projects/project.controller.js';
import { taskRouter } from './modules/projects/task.controller.js';
import { getAllTaskByProject } from './modules/projects/task.service.js';
import { getAllProjects } from './modules/projects/project.service.js';
import { validateJWT } from './middlewares/validate-jwt.js';
import { authRouter } from './modules/auth/auth.controller.js';

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
});

app.use(morgan('dev'));
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/projects', validateJWT, projectRouter);
app.use('/api/tasks', validateJWT, taskRouter);

const { port, mongoDB, database } = settings();

io.on('connection', (socket) => {
  socket.on('updating-tasks', async ({ projectId }) => {
    try {
      const data = await getAllTaskByProject({ projectId });
      socket.broadcast.emit('updating-tasks', {
        projectId,
        newData: data
      });
    } catch (e) {
      console.log(e);
    }
  });

  socket.on('updating-projects', async () => {
    const data = await getAllProjects();
    io.emit('updating-projects', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server on port ${port}`);
  connectDB(mongoDB, database);
});
