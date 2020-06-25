import express from 'express';
import UserController from '../controllers/userController';
import { userCreateSchema, userUpdateSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const userRouter = express.Router();

userRouter.post('/', validateSchema(userCreateSchema), UserController.saveUser);
userRouter.get('/:id', UserController.getUser);
userRouter.get('/', UserController.getUsers);
userRouter.put('/:id', validateSchema(userUpdateSchema), UserController.updateUser);
userRouter.delete('/:id', UserController.removeUser);

export default userRouter;