import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity } from '../util/constant';

export const saveUser = async (request, response, next) => {
    let user = { id: uuidv4(), ...request.body, isDeleted: false };
    response.locals.log = `saveUser ${JSON.stringify(user)}`;
    try {
        user = await save(user);
        response.locals.status = 201;
        response.locals.send = user;
        next();
    } catch (err) {
        err.message = `saveUser failed: ${JSON.stringify(user)}, message: ${err.message}`;
        return next(err);
    }
};

export const getUser = async (request, response, next) => {
    const id = request.params.id;
    response.locals.log = `getUser by id: ${id}`;
    try {
        const user = await getById(id);
        if (user) {
            response.locals.status = 200;
            response.locals.send = user;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
    } catch (err) {
        err.message = `getUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const updateUser = async (request, response, next) => {
    const user = { id: request.params.id, ...request.body };
    response.locals.log = `updateUser req: ${JSON.stringify(user)}`;
    try {
        const updatedUser = await update(user.id, user);
        if (updatedUser) {
            response.locals.status = 200;
            response.locals.send = updatedUser;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
    } catch (err) {
        err.message = `updateUser failed: ${JSON.stringify(user)}, message: ${err.message}`;
        return next(err);
    }
};

export const getUsers = async (request, response, next) => {
    const loginSubstring = String(request.body.loginSubstring);
    const limit = parseInt(request.body.limit, 10);
    response.locals.log = `getUsers loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}`;
    let users;
    try {
        if (loginSubstring && limit && limit >= 0) {
            users = await getAutoSuggestUsers(loginSubstring, limit);
            response.locals.status = 200;
            response.locals.send = users;
            next();
        } else {
            users = await getAllUsers();
            response.locals.status = 200;
            response.locals.send = users;
            next();
        }
    } catch (err) {
        err.message = `getUsers failed, loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}, message: ${err.message}`;
        return next(err);
    }
};

export const removeUser = async (request, response, next) => {
    const id = request.params.id;
    response.locals.log = `removeUser by id: ${id}`;
    try {
        const user = await remove(id);
        if (user) {
            response.locals.status = 200;
            response.locals.send = user;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
    } catch (err) {
        err.message = `removeUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};
