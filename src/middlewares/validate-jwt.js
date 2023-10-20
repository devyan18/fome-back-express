import jwt from 'jsonwebtoken';

import { settings } from '../settings/config.js';
import { getUserById } from '../modules/users/user.service.js';

const { jwtSecret } = settings();

export const validateJWT = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token is required' });
  }

  try {
    const { id } = jwt.verify(token, jwtSecret);

    const user = await getUserById(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
