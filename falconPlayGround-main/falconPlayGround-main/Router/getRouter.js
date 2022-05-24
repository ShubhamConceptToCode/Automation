const express = require('express');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../Model/userModel.js');

const router = express.Router();
router.post('/', async (req, res) => {
  try {
    if (!req.body.token) {
      res.status(401).send({
        status: 'error',
        message: 'not authorized'
      });
    }
    const decoded = await promisify(jwt.verify)(req.body.token, process.env.JWT_SECRET);
    const user = await User.findOne({ id: decoded.id });
    res.status(200).send({
      status: 'success',
      name: user.name,
      email: user.email
    });
  } catch (err) {
    res.status(401).send({
      status: 'error',
      message: err.message
    });
  }
});

module.exports = router;
