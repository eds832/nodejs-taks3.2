import express from 'express';
import { saveUser, getUser, getUsers, updateUser, removeUser } from '../controllers/userController';
import { userCreateSchema, userUpdateSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const userRouter = express.Router();

userRouter.post('/', validateSchema(userCreateSchema), saveUser);
userRouter.get('/:id', getUser);
userRouter.get('/', getUsers);
userRouter.put('/:id', validateSchema(userUpdateSchema), updateUser);
userRouter.delete('/:id', removeUser);

export default userRouter;
