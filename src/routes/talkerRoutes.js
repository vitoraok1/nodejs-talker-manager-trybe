const express = require('express');

const getTalkers = require('../utils/getTalkers');

const router = express.Router();

// requirement 01
router.get('/', async (req, res) => {
  const allTalkers = await getTalkers.getAll();
  res.status(200).json(allTalkers);
});

module.exports = router;