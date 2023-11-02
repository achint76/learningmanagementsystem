const express = require('express');
const trainingsessionController = require('../controller/trainingsessionController');
const RouterSession = express.Router();
RouterSession.post('/schedule-session',trainingsessionController.schedulesession);
module.exports = RouterSession;