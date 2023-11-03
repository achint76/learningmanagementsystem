const express = require('express');
const subscriptionController = require('../controller/subscriptionController');
const loginMiddleware = require('../middleware/loginMiddleware')
const RouterSubscription = express.Router();
RouterSubscription.post('/subscribe',loginMiddleware.userProfile, subscriptionController.subscribeteacher);
module.exports = RouterSubscription;