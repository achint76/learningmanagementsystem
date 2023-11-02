const express = require('express');
const subscriptionController = require('../controller/subscriptionController');
const RouterSubscription = express.Router();
RouterSubscription.post('/subscribe', subscriptionController.subscribeteacher);
module.exports = RouterSubscription;