const express = require('express');
const userController = require('../controller/userController');
const loginMiddleware = require('../middleware/loginMiddleware');
const RouterUser = express.Router();


RouterUser.post('/logout',loginMiddleware.userProfile, userController.updateSessionLogout);
RouterUser.post('/teacher-approval',loginMiddleware.userProfile, userController.statusapprove);
module.exports = RouterUser;