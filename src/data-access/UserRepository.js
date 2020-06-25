import database from '../models/index';
import { Op } from 'sequelize';

export default class UserReposistory {
    static async saveUser(newUser) {
        try {
            return await database.User.create(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async getUser(id) {
        try {
            return await database.User.findOne({ where: { id, isDeleted: false } });
        } catch (error) {
            throw error;
        }
    }

    static async getAutoSuggestUsers(loginSubstring, limit) {
        try {
            return await database.User.findAll(
                { where: { isDeleted: false, login: { [Op.iLike]: `%${loginSubstring}%` } }, order: [['login', 'ASC']], limit });
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await database.User.findAll({ where: { isDeleted: false } });
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, updateUser) {
        try {
            const userToUpdate = await database.User.findOne({ where: { id } });
            if (userToUpdate) {
                const result = await database.User.update(updateUser, { where: { id } });
                if (result > 0) {
                    return updateUser;
                }
            }
            return null;
        } catch (error) {
            throw error;
        }
    }

    static async removeUser(id) {
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
    }
};
