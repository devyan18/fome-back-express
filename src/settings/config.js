import { config } from 'dotenv';

const files = {
  local: '.env.local',
  production: '.env.production'
};

const path = files.local;

config({
  path
});

export const settings = () => {
  return ({
    database: process.env.DATABASE || 'test',
    port: process.env.PORT || 3000,
    mongoDB: process.env.MONGODB_URI || 'mongodb://localhost:27017/express-mongodb',
    jwtSecret: process.env.JWT_SECRET || 'secret'
  });
};
