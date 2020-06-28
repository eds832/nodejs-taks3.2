module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    User.associate = (models) => {
        User.belongsToMany(models.Group, { through: models.UserGroup, foreignKey: 'user_id', onDelete: 'CASCADE' });
    };
    return User;
};
