import winston from 'winston';

const myFormat = winston.format.printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
});

const logger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp(), myFormat),
    transports: [
        new winston.transports.File({ filename: 'logs/all-logs.log', maxsize: 10000 }),
        new winston.transports.Console({ level: 'info' })
    ],
    exceptionHandlers: [
        new winston.transports.File({ filename: 'logs/exceptions.log', maxsize: 10000 }),
        new winston.transports.Console({ level: 'error' })
    ],
    exitOnError: false
});

process.on('unhandledRejection', (reason, promise) => {
    logger.error(reason, 'Unhandled Rejection at Promise', promise);
});

process.on('uncaughtException', (err) => {
    logger.error(err, 'Uncaught Exception thrown');
    process.exit(1);
});

export default logger;
