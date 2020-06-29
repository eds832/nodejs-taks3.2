import express from 'express';
import { saveGroup, getGroup, getGroups, updateGroup, removeGroup } from '../controllers/groupController';
import { addUsers } from '../controllers/userGroupController';
import { groupSchema, userGroupSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const groupRouter = express.Router();

groupRouter.post('/', validateSchema(groupSchema), saveGroup);
groupRouter.post('/:id/users', validateSchema(userGroupSchema), addUsers);
groupRouter.get('/:id', getGroup);
groupRouter.get('/', getGroups);
groupRouter.put('/:id', validateSchema(groupSchema), updateGroup);
groupRouter.delete('/:id', removeGroup);

export default groupRouter;
