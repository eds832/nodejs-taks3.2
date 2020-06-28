import database from '../models/index';
import { Op } from 'sequelize';

export const saveUser = async (newUser) => {
    try {
        return await database.User.create(newUser);
    } catch (error) {
        throw error;
    }
};

export const getUser = async (id) => {
    try {
        return await database.User.findOne({ where: { id, isDeleted: false } });
    } catch (error) {
        throw error;
    }
};

export const getAutoSuggest = async (loginSubstring, limit) => {
    try {
        return await database.User.findAll(
            { where: { isDeleted: false, login: { [Op.iLike]: `%${loginSubstring}%` } }, order: [['login', 'ASC']], limit });
    } catch (error) {
        throw error;
    }
};

export const getAll = async () => {
    try {
        return await database.User.findAll({ where: { isDeleted: false } });
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (id, user) => {
    try {
        const userToUpdate = await database.User.findOne({ where: { id } });
        if (userToUpdate) {
            const result = await database.User.update(user, { where: { id } });
            if (result > 0) {
                return user;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const removeUser = async (id) => {
    try {
        let toRemove = await database.User.findOne({ where: { id } });
        if (toRemove) {
            toRemove = { id: toRemove.id, login: toRemove.login, password: toRemove.password, age: toRemove.age, isDeleted: true };
            const result = await database.User.update(toRemove, { where: { id } });
            if (result > 0) {
                return toRemove;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};
