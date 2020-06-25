'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var errorResponse = function errorResponse(schemaErrors) {
    var errors = schemaErrors.map(function (error) {
        var path = error.path,
            message = error.message;

        return { path: path, message: message };
    });
    return {
        status: 'failed',
        errors: errors
    };
};

var validateSchema = exports.validateSchema = function validateSchema(schema) {
    return function (req, res, next) {
        var _schema$validate = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        }),
            error = _schema$validate.error;

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    };
};