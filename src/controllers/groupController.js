import { save, getById, update, getAllGroups, remove, addUsersToGroup } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { notFoundEntity } from '../util/constant';
import logger from '../util/logger';

export const saveGroup = async (request, response, next) => {
    const groupId = uuidv4();
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    logger.info(`saveGroup {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}`);
    try {
        const group = await save({ id: groupId, name: groupName, permissions: groupPermissions });
        response.status(201).send(group);
    } catch (err) {
        err.message = `saveGroup failed: {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}, message: ${err.message}`;
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
    const groupId = request.params.id;
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    logger.info(`updateGroup {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}`);
    try {
        const group = await update(groupId, { id: groupId, name: groupName, permissions: groupPermissions });
        if (group) {
            response.send(group);
        } else {
            response.status(404).send(notFoundEntity);
        }
    } catch (err) {
        err.message = `updateGroup failed: {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}, message: ${err.message}`;
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
            if (userGroup.message === undefined) {
                response.status(201).send(userGroup);
            } else {
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
