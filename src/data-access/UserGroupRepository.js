import database from '../models/index';

export const saveUserGroup = async (groupId, userIds) => {
    try {
        const group = await database.Group.findOne({ where: { id : groupId } });
        if (group) {
            const insertArray = [];
            for (const id of userIds) {
                const user = await database.User.findOne({ where: { id } });
                if (!user) {
                    return { message : `user with id: ${id} not found` };
                }
                if (!user.isDeleted) {
                    const userGroup = await database.UserGroup.findOne({ where: { group_id : groupId, user_id : id } });
                    if (!userGroup) {
                        insertArray.push({ group_id : group.id, user_id : id });
                    }
                }
            }
            await database.sequelize.transaction(async (t) => {
                await database.UserGroup.bulkCreate(insertArray, { transaction: t });
            });
            return await database.UserGroup.findAll({ where: { group_id : groupId } });
        }
        return { message : `group with id: ${groupId} not found` };
    } catch (error) {
        throw error;
    }
};
