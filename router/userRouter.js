const express = require('express');
const userController = require('../controller/userController');
const loginMiddleware = require('../middleware/loginMiddleware');
const RouterUser = express.Router();

//RouterUser.post('/add-user', loginMiddleware.userProfile, userController.createUser);
RouterUser.post('/logout',loginMiddleware.userProfile, userController.updateSessionLogout);
RouterUser.post('/teacher-approval', userController.statusapprove);
module.exports = RouterUser;