const express = require('express');
const signatureController = require('../Controller/signatureController.js');

const router = express.Router();

router.post('/api/saveSignature', signatureController);

module.exports = router;
