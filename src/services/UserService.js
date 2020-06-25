import userRepository from '../data-access/UserRepository';

export default class UserService {
    static async saveUser(newUser) {
        try {
            return await userRepository.saveUser(newUser);
        } catch (error) {
            throw error;
        }
    }

    static async getUser(id) {
        try {
            return await userRepository.getUser(id);
        } catch (error) {
            throw error;
        }
    }

    static async getAutoSuggestUsers(loginSubstring, limit) {
        try {
            return await userRepository.getAutoSuggestUsers(loginSubstring, limit);
        } catch (error) {
            throw error;
        }
    }

    static async getAllUsers() {
        try {
            return await userRepository.getAllUsers();
        } catch (error) {
            throw error;
        }
    }

    static async updateUser(id, updateUser) {
        try {
            return await userRepository.updateUser(id, updateUser);
        } catch (error) {
            throw error;
        }
    }

    static async removeUser(id) {
        try {
            return await userRepository.removeUser(id);
        } catch (error) {
            throw error;
        }
    }
};
