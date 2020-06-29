import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { bad } from '../util/constant';
import logger from '../util/logger';

export const saveUser = async (request, response) => {
    const userId = uuidv4();
    const userLogin = request.body.login;
    const userPassword = request.body.password;
    const userAge = request.body.age;
    const isUserDeleted = false;
    logger.info(`saveUser {id: ${userId}, login: ${userLogin}, password: ${userPassword}, age: ${userAge}, isDeleted: ${isUserDeleted}}`);
    try {
        const user = await save(
            { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
        response.status(201).send(user);
    } catch (err) {
        logger.error(`saveUser failed: {id: ${userId}, login: ${userLogin}, password: ${userPassword}, age: ${userAge}, isDeleted: ${isUserDeleted}}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const getUser = async (request, response) => {
    const id = request.params.id;
    logger.info(`getUser by id: ${id}`);
    try {
        const user = await getById(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`getUser by id: ${id} failed, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const updateUser = async (request, response) => {
    const userId = request.params.id;
    const userLogin = request.body.login;
    const userPassword = request.body.password;
    const userAge = request.body.age;
    const isUserDeleted = request.body.isDeleted;
    logger.info(`updateUser req: {id: ${userId}, login: ${userLogin}, password: ${userPassword}, age: ${userAge}, isDeleted: ${isUserDeleted}}`);
    try {
        const user = await update(userId,
            { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
        if (user) {
            response.send(user);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`updateUser failed: {id: ${userId}, login: ${userLogin}, password: ${userPassword}, age: ${userAge}, isDeleted: ${isUserDeleted}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const getUsers = async (request, response) => {
    const loginSubstring = String(request.body.loginSubstring);
    const limit = parseInt(request.body.limit, 10);
    logger.info(`getUsers loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}`);
    try {
        if (loginSubstring && limit && limit >= 0) {
            response.send(await getAutoSuggestUsers(loginSubstring, limit));
        } else {
            response.send(await getAllUsers());
        }
    } catch (err) {
        logger.error(`getUsers failed, loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const removeUser = async (request, response) => {
    const id = request.params.id;
    logger.info(`removeUser by id: ${id}`);
    try {
        const user = await remove(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`removeUser by id: ${id} failed, message: ${err.message}`);
        response.status(500).send(bad);
    }
};
