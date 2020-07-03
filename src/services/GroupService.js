import { saveGroup, getGroup, getAll, updateGroup, removeGroup, saveUserGroup } from '../data-access/GroupRepository';

export const save = async (newGroup) => {
    return await saveGroup(newGroup);
};

export const getById = async (id) => {
    return await getGroup(id);
};

export const getAllGroups = async () => {
    return await getAll();
};

export const update = async (id, group) => {
    return await updateGroup(id, group);
};

export const remove = async (id) => {
    return await removeGroup(id);
};

export const addUsersToGroup = async (groupId, userIds) => {
    return await saveUserGroup(groupId, userIds);
};
