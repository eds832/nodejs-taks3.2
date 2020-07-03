import { saveUser, getUser, getAutoSuggest, getAll, updateUser, removeUser } from '../data-access/UserRepository';

export const save = async (newUser) => {
    return await saveUser(newUser);
};

export const getById = async (id) => {
    return await getUser(id);
};

export const getAutoSuggestUsers = async (loginSubstring, limit) => {
    return await getAutoSuggest(loginSubstring, limit);
};

export const getAllUsers = async () => {
    return await getAll();
};

export const update = async (id, user) => {
    return await updateUser(id, user);
};

export const remove = async (id) => {
    return await removeUser(id);
};
