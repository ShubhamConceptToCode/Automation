const express = require('express');
const payment = require('../Controller/payment');

const router = express.Router();
router.post('/checkOut', payment);

module.exports = router;
