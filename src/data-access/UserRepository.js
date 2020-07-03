import database from '../models/index';
import { Op } from 'sequelize';

export const saveUser = async (newUser) => {
    return await database.User.create(newUser);
};

export const getUser = async (id) => {
    return await database.User.findOne({ where: { id, isDeleted: false } });
};

export const getAutoSuggest = async (loginSubstring, limit) => {
    return await database.User.findAll(
        { where: { isDeleted: false, login: { [Op.iLike]: `%${loginSubstring}%` } }, order: [['login', 'ASC']], limit });
};

export const getAll = async () => {
    return await database.User.findAll({ where: { isDeleted: false } });
};

export const updateUser = async (id, user) => {
    const userToUpdate = await database.User.findOne({ where: { id } });
    if (userToUpdate) {
        const result = await database.User.update(user, { where: { id } });
        if (result > 0) {
            return user;
        }
    }
    return null;
};

export const removeUser = async (id) => {
    let toRemove = await database.User.findOne({ where: { id } });
    if (toRemove) {
        toRemove = { id: toRemove.id, login: toRemove.login, password: toRemove.password, age: toRemove.age, isDeleted: true };
        const result = await database.User.update(toRemove, { where: { id } });
        if (result > 0) {
            return toRemove;
        }
    }
    return null;
};
