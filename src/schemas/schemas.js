import Joi from '@hapi/joi';

export const userCreateSchema = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(30).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().integer().min(4).max(130).required()
});

export const userUpdateSchema = Joi.object().keys({
    login: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().alphanum().min(5).max(30).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean().required()
});

export const groupSchema = Joi.object().keys({
    name: Joi.string().alphanum().min(3).max(30).required(),
    permissions: Joi.array().items(Joi.string().regex(/^(READ|WRITE|DELETE|SHARE|UPLOAD_FILES)$/)).required()
});
