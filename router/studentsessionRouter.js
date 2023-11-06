const express = require('express');
const studentsessionController = require('../controller/studentsessionController');
const loginMiddleware = require('../middleware/loginMiddleware');
const RouterStudentChoice = express.Router();
RouterStudentChoice.post('/join-student',//loginMiddleware.userProfile, 
studentsessionController.joiningstudent);
module.exports = RouterStudentChoice;