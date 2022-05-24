const express = require('express');
const authController = require('../Controller/authController.js');

const router = express.Router();
router.post('/api/signup', authController.signup);
router.post('/api/login', authController.login);
router.post('/api/update', authController.update);
router.post('/api/webhook', authController.updateWebhook);
module.exports = router;
