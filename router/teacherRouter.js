const express = require('express');
const teacherController = require('../controller/teacherController');
const RouterTeacher = express.Router();
RouterTeacher.post('/select-subjects',teacherController.selectsubjects);
module.exports = RouterTeacher;