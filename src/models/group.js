module.exports = (sequelize, DataTypes) => {
    const Group = sequelize.define('Group', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    });
    Group.associate = (models) => {
        Group.belongsToMany(models.User, { through: 'UserGroups', foreignKey: 'group_id', onDelete: 'CASCADE' });
    };
    return Group;
};
