import UserService from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';

const bad = 'Unfortunately, something went a wrong way... Bad luck. Try one more time.';

export default class UserController {
    static async saveUser(request, response) {
        const userId = uuidv4();
        const userLogin = request.body.login;
        const userPassword = request.body.password;
        const userAge = request.body.age;
        const isUserDeleted = false;
        try {
            const user = await UserService.saveUser(
                { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
            response.status(201).send(user);
        } catch (err) {
            console.error(err);
            response.status(500).send(bad);
        }
    }

    static async getUser(request, response) {
        const id = request.params.id;
        try {
            const user = await UserService.getUser(id);
            if (user) {
                response.send(user);
            } else {
                response.status(404).send();
            }
        } catch (err) {
            console.error(err);
            response.status(500).send(bad);
        }
    }

    static async updateUser(request, response) {
        const userId = request.params.id;
        const userLogin = request.body.login;
        const userPassword = request.body.password;
        const userAge = request.body.age;
        const isUserDeleted = request.body.isDeleted;
        try {
            const user = await UserService.updateUser(userId,
                { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
            if (user) {
                response.send(user);
            } else {
                response.status(404).send();
            }
        } catch (err) {
            console.error(err);
            response.status(500).send(bad);
        }
    }

    static async getUsers(request, response) {
        const loginSubstring = String(request.body.loginSubstring);
        const limit = parseInt(request.body.limit, 10);
        try {
            if (loginSubstring && limit && limit >= 0) {
                response.send(await UserService.getAutoSuggestUsers(loginSubstring, limit));
            } else {
                response.send(await UserService.getAllUsers());
            }
        } catch (err) {
            console.error(err);
            response.status(500).send(bad);
        }
    }

    static async removeUser(request, response) {
        const id = request.params.id;
        try {
            const user = await UserService.removeUser(id);
            if (user) {
                response.send(user);
            } else {
                response.status(404).send();
            }
        } catch (err) {
            console.error(err);
            response.status(500).send(bad);
        }
    }
};
