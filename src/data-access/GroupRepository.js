import database from '../models/index';

export const saveGroup = async (newGroup) => {
    try {
        return await database.Group.create(newGroup);
    } catch (error) {
        throw error;
    }
};

export const getGroup = async (id) => {
    try {
        return await database.Group.findOne({ where: { id } });
    } catch (error) {
        throw error;
    }
};

export const getAll = async () => {
    try {
        return await database.Group.findAll();
    } catch (error) {
        throw error;
    }
};

export const updateGroup = async (id, group) => {
    try {
        const groupToUpdate = await database.Group.findOne({ where: { id } });
        if (groupToUpdate) {
            const result = await database.Group.update(group, { where: { id } });
            if (result > 0) {
                return group;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const removeGroup = async (id) => {
    try {
        const toRemove = await database.Group.findOne({ where: { id } });
        if (toRemove) {
            const result = await database.Group.destroy({ where: { id } });
            if (result > 0) {
                return toRemove;
            }
        }
        return null;
    } catch (error) {
        throw error;
    }
};

export const saveUserGroup = async (groupId, userIds) => {
    try {
        const group = await database.Group.findOne({ where: { id : groupId } });
        if (group) {
            const users = await database.User.findAll({ where: { id : userIds, isDeleted : false } });
            if (users && users.length === userIds.length) {
                await database.sequelize.transaction(async (t) => {
                    await group.addUsers(userIds, { transaction: t });
                });
                return await group.getUsers({ through: { group_id: groupId } });
            }
            const userIdsFromDB = users.map((u) => (u.id));
            const notFoundUserIds = userIds.filter((id) => !userIdsFromDB.includes(id));
            return { message : `users with ids: ${JSON.stringify(notFoundUserIds)} aren't found` };
        }
        return { message : `group with id: ${groupId} isn't found` };
    } catch (error) {
        throw error;
    }
};
