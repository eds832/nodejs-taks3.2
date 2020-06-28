import express from 'express';
import { saveGroup, getGroup, getGroups, updateGroup, removeGroup } from '../controllers/groupController';
import { groupSchema } from '../schemas/schemas';
import { validateSchema } from '../schemas/validator';

const groupRouter = express.Router();

groupRouter.post('/', validateSchema(groupSchema), saveGroup);
groupRouter.get('/:id', getGroup);
groupRouter.get('/', getGroups);
groupRouter.put('/:id', validateSchema(groupSchema), updateGroup);
groupRouter.delete('/:id', removeGroup);

export default groupRouter;
