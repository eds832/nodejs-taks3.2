import { save, getById, update, getAllGroups, remove } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { bad } from '../util/constant';
import logger from '../util/logger';

export const saveGroup = async (request, response) => {
    const groupId = uuidv4();
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    logger.info(`saveGroup {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}`);
    try {
        const group = await save({ id: groupId, name: groupName, permissions: groupPermissions });
        response.status(201).send(group);
    } catch (err) {
        logger.error(`saveGroup failed: {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const getGroup = async (request, response) => {
    const id = request.params.id;
    logger.info(`getGroup by id: ${id}`);
    try {
        const group = await getById(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`getGroup by id: ${id} failed, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const updateGroup = async (request, response) => {
    const groupId = request.params.id;
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    logger.info(`updateGroup {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}`);
    try {
        const group = await update(groupId, { id: groupId, name: groupName, permissions: groupPermissions });
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`updateGroup failed: {id: ${groupId}, name: ${groupName}, permissions: ${groupPermissions}}, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const getGroups = async (request, response) => {
    logger.info('getGroups');
    try {
        response.send(await getAllGroups());
    } catch (err) {
        logger.error(`getGroups failed, message: ${err.message}`);
        response.status(500).send(bad);
    }
};

export const removeGroup = async (request, response) => {
    const id = request.params.id;
    logger.info(`removeGroup by id: ${id}`);
    try {
        const group = await remove(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        logger.error(`removeGroup by id: ${id} failed, message: ${err.message}`);
        response.status(500).send(bad);
    }
};
