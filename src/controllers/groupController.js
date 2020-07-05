import { save, getById, update, getAllGroups, remove, addUsersToGroup } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity, statusNotFound } from '../util/constant';

export const saveGroup = async (request, response, next) => {
    let group = { id: uuidv4(), ...request.body };
    response.locals.log = `saveGroup ${JSON.stringify(group)}`;
    try {
        group = await save(group);
        response.locals.status = 201;
        response.locals.send =  group;
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
            response.locals.status = 200;
            response.locals.send =  group;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
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
            response.locals.status = 200;
            response.locals.send =  updatedGroup;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
    } catch (err) {
        err.message = `updateGroup failed: ${JSON.stringify(group)}, message: ${err.message}`;
        return next(err);
    }
};

export const getGroups = async (request, response, next) => {
    response.locals.log = 'getGroups';
    try {
        const groups = await getAllGroups();
        response.locals.status = 200;
        response.locals.send = groups;
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
            response.locals.status = 200;
            response.locals.send = group;
            next();
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
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
                response.locals.status = 201;
                response.locals.send = result;
                next();
            } else {
                result.status = statusNotFound;
                response.locals.status = 404;
                response.locals.send = result;
                next();
            }
        } else {
            response.locals.status = 404;
            response.locals.send = notFoundEntity;
            next();
        }
    } catch (err) {
        err.message = `addUsers failed, groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}, message: ${err.message}`;
        return next(err);
    }
};
