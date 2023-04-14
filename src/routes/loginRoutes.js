const express = require('express');
const newToken = require('../utils/newToken');

const { emailValidate, passwordValidate } = require('../middlewares/loginValidate');

const router = express.Router();

// requirement 03
router.post('/', emailValidate, passwordValidate, (_req, res) => {
  const generateToken = newToken();
  res.status(200).json({ token: generateToken });
});

module.exports = router;