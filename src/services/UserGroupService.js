import { saveUserGroup } from '../data-access/UserGroupRepository';

export const addUsersToGroup = async (groupId, userIds) => {
    try {
        return await saveUserGroup(groupId, userIds);
    } catch (error) {
        throw error;
    }
};
