import express from 'express';
import { checkUser, loginUser } from '../controllers/userController';
import { loginSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const authMiddleware = express.Router();

authMiddleware.use(['/users', '/groups'], checkUser);

authMiddleware.post('/login', validateSchema(loginSchema), loginUser);

export default authMiddleware;
