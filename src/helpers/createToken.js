import jwt from 'jsonwebtoken';
import { settings } from '../settings/config.js';

const { jwtSecret } = settings();

export const createJWT = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, jwtSecret, (error, token) => {
      if (error) {
        return reject(error);
      }

      resolve(token);
    });
  });
};
