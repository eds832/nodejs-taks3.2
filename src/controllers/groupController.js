import { save, getById, update, getAllGroups, remove, addUsersToGroup } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity, statusNotFound } from '../util/constant';
import logger from '../util/logger';
import { omitPassword } from '../util/util';

export const saveGroup = async (request, response, next) => {
    let group = { id: uuidv4(), ...request.body };
    logger.info(`saveGroup ${JSON.stringify(group)}`);
    try {
        group = await save(group);
        response.status(201).send(group);
    } catch (err) {
        err.message = `saveGroup failed: ${JSON.stringify(group)}, message: ${err.message}`;
        return next(err);
    }
};

export const getGroup = async (request, response, next) => {
    const id = request.params.id;
    logger.info(`getGroup by id: ${id}`);
    try {
        const group = await getById(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `getGroup by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const updateGroup = async (request, response, next) => {
    const group = { id: request.params.id, ...request.body };
    logger.info(`updateGroup ${JSON.stringify(group)}`);
    try {
        const updatedGroup = await update(group.id, group);
        if (updatedGroup) {
            response.send(updatedGroup);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `updateGroup failed: ${JSON.stringify(group)}, message: ${err.message}`;
        return next(err);
    }
};

export const getGroups = async (request, response, next) => {
    logger.info('getGroups');
    try {
        response.send(await getAllGroups());
    } catch (err) {
        err.message = `getGroups failed, message: ${err.message}`;
        return next(err);
    }
};

export const removeGroup = async (request, response, next) => {
    const id = request.params.id;
    logger.info(`removeGroup by id: ${id}`);
    try {
        const group = await remove(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `removeGroup by id: ${id} failed, message: ${err.message}`;
        return next(err);
    }
};

export const addUsers = async (request, response, next) => {
    const groupId = request.params.id;
    const userIds = request.body;
    logger.info(`addUsers groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}`);
    try {
        const userGroup = await addUsersToGroup(groupId, userIds);
        if (userGroup) {
            if (userGroup.error === undefined) {
                const group = userGroup.map(u => omitPassword(u));
                response.status(201).send(group);
            } else {
                userGroup.status = statusNotFound;
                response.status(404).send(userGroup);
            }
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `addUsers failed, groupId: ${groupId}, userIds: ${JSON.stringify(userIds)}, message: ${err.message}`;
        return next(err);
    }
};
