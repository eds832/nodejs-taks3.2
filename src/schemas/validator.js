import logger from '../util/logger';

const errorResponse = (schemaErrors) => {
    const errors = schemaErrors.map((error) => {
        const { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
};

export const validateSchema = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });
        if (error && error.isJoi) {
            logger.warn(`invalid body: ${error.message}, url: ${req.url}`);
            res.status(400).json(errorResponse(error.details));
        } else {
            return next();
        }
    };
};
