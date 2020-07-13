import { save, getById, update, getAutoSuggestUsers, getAllUsers, remove, checkToken, login } from '../services/UserService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity, unauthorized, forbidden, wrongLogin, wrongLoginPassword } from '../util/constant';
import logger from '../util/logger';
import bcrypt from 'bcryptjs';
import { omitPassword } from '../util/util';
import * as HttpStatus from 'http-status-codes';

export const saveUser = async (request, response, next) => {
    let user = { id: uuidv4(), ...request.body, isDeleted: false };
    user.password = await bcrypt.hash(user.password, +process.env.APP_SECRET_SALT);
    response.locals.log = `saveUser ${JSON.stringify(omitPassword(user))}`;
    try {
        user = await save(user);
        if (user) {
            response.locals.status = HttpStatus.CREATED;
            response.locals.send = omitPassword(user);
        } else {
            response.locals.status = HttpStatus.BAD_REQUEST;
            response.locals.send = wrongLogin;
        }
        next();
    } catch (err) {
        err.message = `saveUser failed: ${JSON.stringify(omitPassword(user))}, message: ${err.message}`;
        return next(err);
    }
};

export const getUser = async (request, response, next) => {
    const id = request.params.id;
    response.locals.log = `getUser by id: ${id}`;
    try {
        const user = await getById(id);
        if (user) {
            response.locals.status = HttpStatus.OK;
            response.locals.send = omitPassword(user);
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `getUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const updateUser = async (request, response, next) => {
    let user = { id: request.params.id, ...request.body };
    user.password = await bcrypt.hash(user.password, +process.env.APP_SECRET_SALT);
    response.locals.log = `updateUser req: ${JSON.stringify(omitPassword(user))}`;
    try {
        user = await update(user.id, user);
        if (user) {
            if (user.error === undefined) {
                response.locals.status = HttpStatus.OK;
                response.locals.send = omitPassword(user);
            } else {
                response.locals.status = HttpStatus.BAD_REQUEST;
                response.locals.send = wrongLogin;
            }
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `updateUser failed: ${JSON.stringify(omitPassword(user))}, message: ${err.message}`;
        return next(err);
    }
};

export const getUsers = async (request, response, next) => {
    const loginSubstring = String(request.body.loginSubstring);
    const limit = parseInt(request.body.limit, process.env.APP_SECRET_SALT);
    response.locals.log = `getUsers loginSubstring: ${request.body.loginSubstring}, limit: ${request.body.limit}`;
    try {
        let users;
        if (loginSubstring && limit && limit >= 0) {
            users = await getAutoSuggestUsers(loginSubstring, limit);
        } else {
            users = await getAllUsers();
        }
        users = users.map(u => omitPassword(u));
        response.locals.status = HttpStatus.OK;
        response.locals.send = users;
        next();
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
            response.locals.status = HttpStatus.OK;
            response.locals.send = omitPassword(user);
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `removeUser by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const checkUser = (request, response, next) => {
    const authHeader = request.headers.authorization;
    logger.info(`checkUser with authHeader: ${authHeader}`);
    if (authHeader) {
        try {
            const token = typeof authHeader === 'string' && authHeader.split(' ')[0] === 'Bearer' && authHeader.split(' ')[1];
            const isPassed = token && checkToken(token);
            if (isPassed) {
                next();
            } else {
                logger.warn(`user with authHeader: ${JSON.stringify(authHeader)} wasn't authorized`);
                response.status(HttpStatus.FORBIDDEN).send(forbidden);
            }
        } catch (err) {
            err.message = `checkUser with authHeader: ${authHeader} failed, message: ${err.message}`;
            return next(err);
        }
    } else {
        logger.info("user with empty authHeader wasn't authorized");
        response.status(HttpStatus.UNAUTHORIZED).send(unauthorized);
    }
};

export const loginUser = async (request, response, next) => {
    response.locals.log = `loginUser with login: ${request.body.username}`;
    try {
        const token = await login(request.body.username, request.body.password);
        if (token) {
            response.locals.status = HttpStatus.CREATED;
            response.locals.send = { token };
        } else {
            response.locals.status = HttpStatus.UNAUTHORIZED;
            response.locals.send = wrongLoginPassword;
        }
        next();
    } catch (err) {
        err.message = `loginUser with login: ${request.body.username} failed, message: ${err.message}`;
        return next(err);
    }
};
