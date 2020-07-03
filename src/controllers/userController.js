import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity } from '../util/constant';
import logger from '../util/logger';

export const saveUser = async (request, response, next) => {
    let user = { id: uuidv4(), ...request.body, isDeleted: false };
    logger.info(`saveUser ${JSON.stringify(user)}`);
    try {
        user = await save(user);
        response.status(201).send(user);
    } catch (err) {
        err.message = `saveUser failed: ${JSON.stringify(user)}, message: ${err.message}`;
        return next(err);
    }
};

export const getUser = async (request, response, next) => {
    const id = request.params.id;
    logger.info(`getUser by id: ${id}`);
    try {
        const user = await getById(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `getUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const updateUser = async (request, response, next) => {
    const user = { id: request.params.id, ...request.body };
    logger.info(`updateUser req: ${JSON.stringify(user)}`);
    try {
        const updatedUser = await update(user.id, user);
        if (updatedUser) {
            response.send(updatedUser);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `updateUser failed: ${JSON.stringify(user)}, message: ${err.message}`;
        return next(err);
    }
};

export const getUsers = async (request, response, next) => {
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
        err.message = `getUsers failed, loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}, message: ${err.message}`;
        return next(err);
    }
};

export const removeUser = async (request, response, next) => {
    const id = request.params.id;
    logger.info(`removeUser by id: ${id}`);
    try {
        const user = await remove(id);
        if (user) {
            response.send(user);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `removeUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};
