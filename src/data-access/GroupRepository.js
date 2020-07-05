import database from '../models/index';

export const saveGroup = async (newGroup) => {
    return await database.Group.create(newGroup);
};

export const getGroup = async (id) => {
    return await database.Group.findOne({ where: { id } });
};

export const getAll = async () => {
    return await database.Group.findAll();
};

export const updateGroup = async (id, group) => {
    const groupToUpdate = await database.Group.findOne({ where: { id } });
    if (groupToUpdate) {
        const result = await database.Group.update(group, { where: { id } });
        if (result > 0) {
            return group;
        }
    }
    return null;
};

export const removeGroup = async (id) => {
    const toRemove = await database.Group.findOne({ where: { id } });
    if (toRemove) {
        const result = await database.Group.destroy({ where: { id } });
        if (result > 0) {
            return toRemove;
        }
    }
    return null;
};

export const saveUserGroup = async (groupId, userIds) => {
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
        return { error : `users with ids: ${JSON.stringify(notFoundUserIds)} aren't found` };
    }
    return { error : `group with id: ${groupId} isn't found` };
};
