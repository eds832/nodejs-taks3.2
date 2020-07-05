import express from 'express';
import { loginUser } from '../controllers/userController';
import { loginSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const loginRouter = express.Router();

loginRouter.post('/login', validateSchema(loginSchema), loginUser);

export default loginRouter;
