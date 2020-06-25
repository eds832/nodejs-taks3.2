'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.userUpdateSchema = exports.userCreateSchema = undefined;

var _joi = require('@hapi/joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userCreateSchema = exports.userCreateSchema = _joi2.default.object().keys({
    login: _joi2.default.string().alphanum().min(3).max(30).required(),
    password: _joi2.default.string().alphanum().min(5).max(30).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: _joi2.default.number().integer().min(4).max(130).required()
});

var userUpdateSchema = exports.userUpdateSchema = _joi2.default.object().keys({
    login: _joi2.default.string().alphanum().min(3).max(30).required(),
    password: _joi2.default.string().alphanum().min(5).max(30).regex(/^(?=.*[a-zA-Z])(?=.*[0-9])/).required(),
    age: _joi2.default.number().integer().min(4).max(130).required(),
    isDeleted: _joi2.default.boolean().required()
});