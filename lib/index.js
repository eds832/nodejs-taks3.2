'use strict';

require('dotenv/config');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _userRouter = require('./routes/userRouter');

var _userRouter2 = _interopRequireDefault(_userRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use(_express2.default.json());

app.use('/users', _userRouter2.default);

app.use(function (req, res) {
    res.status(404).send('Not Found');
});

var port = process.env.PORT || 5000;

app.listen(port, function () {
    console.log('Server is running on PORT ' + port);
});