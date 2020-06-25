'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _UserService = require('../services/UserService');

var _UserService2 = _interopRequireDefault(_UserService);

var _uuid = require('uuid');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bad = 'Unfortunately, something went a wrong way... Bad luck. Try one more time.';

var UserController = function () {
    function UserController() {
        _classCallCheck(this, UserController);
    }

    _createClass(UserController, null, [{
        key: 'saveUser',
        value: async function saveUser(request, response) {
            var userId = (0, _uuid.v4)();
            var userLogin = request.body.login;
            var userPassword = request.body.password;
            var userAge = request.body.age;
            var isUserDeleted = false;
            try {
                var user = await _UserService2.default.saveUser({ id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
                response.status(201).send(user);
            } catch (err) {
                console.error(err);
                response.status(500).send(bad);
            }
        }
    }, {
        key: 'getUser',
        value: async function getUser(request, response) {
            var id = request.params.id;
            try {
                var user = await _UserService2.default.getUser(id);
                if (user) {
                    response.send(user);
                } else {
                    response.status(404).send();
                }
            } catch (err) {
                console.error(err);
                response.status(500).send(bad);
            }
        }
    }, {
        key: 'updateUser',
        value: async function updateUser(request, response) {
            var userId = request.params.id;
            var userLogin = request.body.login;
            var userPassword = request.body.password;
            var userAge = request.body.age;
            var isUserDeleted = request.body.isDeleted;
            try {
                var user = await _UserService2.default.updateUser(userId, { id: userId, login: userLogin, password: userPassword, age: userAge, isDeleted: isUserDeleted });
                if (user) {
                    response.send(user);
                } else {
                    response.status(404).send();
                }
            } catch (err) {
                console.error(err);
                response.status(500).send(bad);
            }
        }
    }, {
        key: 'getUsers',
        value: async function getUsers(request, response) {
            var loginSubstring = String(request.body.loginSubstring);
            var limit = parseInt(request.body.limit, 10);
            try {
                if (loginSubstring && limit && limit >= 0) {
                    response.send((await _UserService2.default.getAutoSuggestUsers(loginSubstring, limit)));
                } else {
                    response.send((await _UserService2.default.getAllUsers()));
                }
            } catch (err) {
                console.error(err);
                response.status(500).send(bad);
            }
        }
    }, {
        key: 'removeUser',
        value: async function removeUser(request, response) {
            var id = request.params.id;
            try {
                var user = await _UserService2.default.removeUser(id);
                if (user) {
                    response.send(user);
                } else {
                    response.status(404).send();
                }
            } catch (err) {
                console.error(err);
                response.status(500).send(bad);
            }
        }
    }]);

    return UserController;
}();

exports.default = UserController;
;