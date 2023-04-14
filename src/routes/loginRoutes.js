const express = require('express');
const newToken = require('../utils/newToken');

const router = express.Router();

// requirement 03
router.post('/', (_req, res) => {
  const generateToken = newToken();
  res.status(200).json({ token: generateToken });
});

module.exports = router;