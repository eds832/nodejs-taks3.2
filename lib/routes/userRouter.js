'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userController = require('../controllers/userController');

var _userController2 = _interopRequireDefault(_userController);

var _schemas = require('../schemas/schemas');

var _validator = require('../schemas/validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userRouter = _express2.default.Router();

userRouter.post('/', (0, _validator.validateSchema)(_schemas.userCreateSchema), _userController2.default.saveUser);
userRouter.get('/:id', _userController2.default.getUser);
userRouter.get('/', _userController2.default.getUsers);
userRouter.put('/:id', (0, _validator.validateSchema)(_schemas.userUpdateSchema), _userController2.default.updateUser);
userRouter.delete('/:id', _userController2.default.removeUser);

exports.default = userRouter;