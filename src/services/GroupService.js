import { saveGroup, getGroup, getAll, updateGroup, removeGroup } from '../data-access/GroupRepository';

export const save = async (newGroup) => {
    try {
        return await saveGroup(newGroup);
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        return await getGroup(id);
    } catch (error) {
        throw error;
    }
};

export const getAllGroups = async () => {
    try {
        return await getAll();
    } catch (error) {
        throw error;
    }
};

export const update = async (id, group) => {
    try {
        return await updateGroup(id, group);
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    try {
        return await removeGroup(id);
    } catch (error) {
        throw error;
    }
};
