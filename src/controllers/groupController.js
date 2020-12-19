import { save, getById, update, getAllGroups, remove, addUsersToGroup } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity, statusNotFound } from '../util/constant';
import { omitPassword } from '../util/util';
import * as HttpStatus from 'http-status-codes';

export const saveGroup = async (request, response, next) => {
    let group = { id: uuidv4(), ...request.body };
    response.locals.log = `saveGroup ${JSON.stringify(group)}`;
    try {
        group = await save(group);
        response.locals.status = HttpStatus.CREATED;
        response.locals.send = group;
        next();
    } catch (err) {
        err.message = `saveGroup failed: ${JSON.stringify(group)}, message: ${err.message}`;
        return next(err);
    }
};

export const getGroup = async (request, response, next) => {
    const id = request.params.id;
    response.locals.log = `getGroup by id: ${id}`;
    try {
        const group = await getById(id);
        if (group) {
            response.locals.status = HttpStatus.OK;
            response.locals.send = group;
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `getGroup by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const updateGroup = async (request, response, next) => {
    const group = { id: request.params.id, ...request.body };
    response.locals.log = `updateGroup ${JSON.stringify(group)}`;
    try {
        const updatedGroup = await update(group.id, group);
        if (updatedGroup) {
            response.locals.status = HttpStatus.OK;
            response.locals.send = updatedGroup;
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `updateGroup failed: ${JSON.stringify(group)}, message: ${err.message}`;
        return next(err);
    }
};

export const getGroups = async (request, response, next) => {
    response.locals.log = 'getGroups';
    try {
        response.locals.send = await getAllGroups();
        response.locals.status = HttpStatus.OK;
        next();
    } catch (err) {
        err.message = `getGroups failed, message: ${err.message}`;
        return next(err);
    }
};

export const removeGroup = async (request, response, next) => {
    const id = request.params.id;
    response.locals.log = `removeGroup by id: ${id}`;
    try {
        const group = await remove(id);
        if (group) {
            response.locals.status = HttpStatus.OK;
            response.locals.send = group;
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `removeGroup by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const addUsers = async (request, response, next) => {
    const groupId = request.params.id;
    const userIds = request.body;
    response.locals.log = `addUsers groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}`;
    try {
        const result = await addUsersToGroup(groupId, userIds);
        if (result) {
            if (result.error === undefined) {
                const group = result.map(u => omitPassword(u));
                response.locals.status = HttpStatus.CREATED;
                response.locals.send = group;
            } else {
                result.status = statusNotFound;
                response.locals.status = HttpStatus.NOT_FOUND;
                response.locals.send = result;
            }
        } else {
            response.locals.status = HttpStatus.NOT_FOUND;
            response.locals.send = notFoundEntity;
        }
        next();
    } catch (err) {
        err.message = `addUsers failed, groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}, message: ${err.message}`;
        return next(err);
    }
};
