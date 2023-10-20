import { Router } from 'express';
import { validations } from './validations/auth.validations.js';
import bcrypt from 'bcrypt';
import { UserModel } from '../users/entity/user.js';
import { createJWT } from '../../helpers/createToken.js';
import { validateJWT } from '../../middlewares/validate-jwt.js';

const authRouter = Router();

authRouter.post('/', validateJWT, (req, res) => {
  res.status(200).json({ user: req.user });
});

authRouter.post('/login', validations.login, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = await createJWT({ id: user._id });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error login user' });
  }
});

authRouter.post('/register', validations.register, async (req, res) => {
  try {
    const user = await UserModel.create(req.body);

    const token = await createJWT({ id: user._id });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error register user' });
  }
});

export { authRouter };
