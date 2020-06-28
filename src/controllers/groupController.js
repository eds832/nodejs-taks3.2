import { save, getById, update, getAllGroups, remove } from '../services/GroupService';
import { v4 as uuidv4 } from 'uuid';
import { bad } from '../util/constant';

export const saveGroup = async (request, response) => {
    const groupId = uuidv4();
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    try {
        const group = await save({ id: groupId, name: groupName, permissions: groupPermissions });
        response.status(201).send(group);
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const getGroup = async (request, response) => {
    const id = request.params.id;
    try {
        const group = await getById(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const updateGroup = async (request, response) => {
    const groupId = request.params.id;
    const groupName = request.body.name;
    const groupPermissions = request.body.permissions;
    try {
        const group = await update(groupId, { id: groupId, name: groupName, permissions: groupPermissions });
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const getGroups = async (request, response) => {
    try {
        response.send(await getAllGroups());
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};

export const removeGroup = async (request, response) => {
    const id = request.params.id;
    try {
        const group = await remove(id);
        if (group) {
            response.send(group);
        } else {
            response.status(404).send();
        }
    } catch (err) {
        console.error(err);
        response.status(500).send(bad);
    }
};
