import { saveUser, getUser, getAutoSuggest, getAll, updateUser, removeUser } from '../data-access/UserRepository';

export const save = async (newUser) => {
    try {
        return await saveUser(newUser);
    } catch (error) {
        throw error;
    }
};

export const getById = async (id) => {
    try {
        return await getUser(id);
    } catch (error) {
        throw error;
    }
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    try {
        return await getAutoSuggest(loginSubstring, limit);
    } catch (error) {
        throw error;
    }
};

export const getAllUsers = async () => {
    try {
        return await getAll();
    } catch (error) {
        throw error;
    }
};

export const update = async (id, user) => {
    try {
        return await updateUser(id, user);
    } catch (error) {
        throw error;
    }
};

export const remove = async (id) => {
    try {
        return await removeUser(id);
    } catch (error) {
        throw error;
    }
};
