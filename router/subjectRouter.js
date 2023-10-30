const express = require('express');
const subjectController = require('../controller/subjectController');
const RouterSubject = express.Router();
RouterSubject.get('/getsubject', subjectController.getSubject);
module.exports = RouterSubject;