import express from 'express';
import { checkUser } from '../controllers/userController';

const authRouter = express.Router();

authRouter.use('/', checkUser);

export default authRouter;
