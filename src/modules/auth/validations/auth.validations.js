import { body } from 'express-validator';
import { aplyValidation } from '../../../middlewares/validations';

export const validations = {
  login: [
    [
      body('email').isEmail().withMessage('Email is required'),
      body('password').isLength({ min: 5 }).withMessage('Password is required')
    ],
    aplyValidation
  ],
  register: [
    [
      body('email').isEmail().withMessage('Email is required'),
      body('nickName').isLength({ min: 2 }).withMessage('NickName is required'),
      body('password').isStrongPassword({ minLength: 8 }).withMessage('Password is required')
    ],
    aplyValidation
  ]
};
