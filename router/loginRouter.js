const express = require('express');
const RouterLogin = express.Router();
const loginController = require('../controller/loginController');
RouterLogin.post('/login', loginController.loginfunc);

module.exports = RouterLogin;
