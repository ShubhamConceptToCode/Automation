const express = require('express');
const getUserController = require('../Controller/getUserController');

const router = express.Router();

router.post('/user', getUserController.getUserData);
router.post('/userCard', getUserController.getCardData)

module.exports = router;