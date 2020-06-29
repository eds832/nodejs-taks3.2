import { addUsersToGroup } from '../services/UserGroupService';
import { bad } from '../util/constant';
import logger from '../util/logger';

export const addUsers = async (request, response) => {
    const groupId = request.params.id;
    const userIds = request.body;
    logger.info(`addUsers groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}`);
    try {
        const userGroup = await addUsersToGroup(groupId, userIds);
        if (userGroup) {
            if (userGroup.message === undefined) {
                response.status(201).send(userGroup);
            } else {
                response.status(404).send(userGroup);
            }
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`addUsers failed, groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};
