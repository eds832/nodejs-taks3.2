import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import logger from '../util/logger';

const basename = path.basename(__filename);
const database = {};

logger.info(`start DB: ${  process.env.DB_NAME}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 1,
        acquire: 30000,
        idle: 10000
    },
    dialectOption: {
        ssl: true,
        native: true
    },
    logging: (msg) => logger.info(msg),
    define: {
        timestamps: false
    }
});

fs.readdirSync(__dirname).filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    database[model.name] = model;
});

Object.keys(database).forEach((modelName) => {
    if (database[modelName].associate) {
        database[modelName].associate(database);
    }
});

database.sequelize = sequelize;
database.Sequelize = Sequelize;

module.exports = database;
