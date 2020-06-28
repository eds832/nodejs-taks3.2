import { addUsersToGroup } from '../services/UserGroupService';
import { bad } from '../util/constant';

export const addUsers = async (request, response) => {
    const groupId = request.params.id;
    const userIds = request.body;
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
        console.error(err);
        response.status(500).send(bad);
    }
};
