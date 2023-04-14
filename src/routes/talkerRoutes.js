const express = require('express');

const getTalkers = require('../utils/getTalkers');

const router = express.Router();

const errorMessage = { message: 'Pessoa palestrante não encontrada' };

// requirement 01
router.get('/', async (_req, res) => {
  const allTalkers = await getTalkers.getAll();
  res.status(200).json(allTalkers);
});

// requirement 02
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const chosenTalker = await getTalkers.getById(Number(id));

  if (!chosenTalker) {
    return res.status(404).json(errorMessage);
  }

  return res.status(200).json(chosenTalker);
});

module.exports = router;