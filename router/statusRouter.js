const express = require('express');
const RouterStatus = express.Router();
const approvedstatusController = require('../controller/approvedstatusController');

RouterStatus.post('/send-mail', approvedstatusController.approvalmail);

module.exports = RouterStatus;