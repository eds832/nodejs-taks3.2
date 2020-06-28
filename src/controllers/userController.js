import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { bad } from '../util/constant';

export const saveUser = async (request, response) => {
    const userId = uuidv4();
    const userLogin = request.body.login;
    const userPassword = request.body.password;
    const userAge = request.body.age;
    const isUserDeleted = false;
    try {
        const user = await save(
            { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
        response.status(201).send(user);
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const getUser = async (request, response) => {
    const id = request.params.id;
    try {
        const user = await getById(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const updateUser = async (request, response) => {
    const userId = request.params.id;
    const userLogin = request.body.login;
    const userPassword = request.body.password;
    const userAge = request.body.age;
    const isUserDeleted = request.body.isDeleted;
    try {
        const user = await update(userId,
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
};

export const getUsers = async (request, response) => {
    const loginSubstring = String(request.body.loginSubstring);
    const limit = parseInt(request.body.limit, 10);
    try {
        if (loginSubstring && limit && limit >= 0) {
            response.send(await getAutoSuggestUsers(loginSubstring, limit));
        } else {
            response.send(await getAllUsers());
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const removeUser = async (request, response) => {
    const id = request.params.id;
    try {
        const user = await remove(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};
