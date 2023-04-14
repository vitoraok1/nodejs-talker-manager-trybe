const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const getTalkers = require('../utils/getTalkers');
const { tokenValidate, 
  nameValidate, 
  ageValidate, 
  talkValidate, watchedAtValidate, rateValidate } = require('../middlewares/talkerValidate');

const router = express.Router();
const talkersPath = path.resolve(__dirname, '../talker.json');

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

// requirement 05
router.post('/', tokenValidate, 
  nameValidate, ageValidate, talkValidate, watchedAtValidate, rateValidate, async (req, res) => {
  const allTalkers = await getTalkers.getAll();
  const properties = req.body;

  const addTalker = {
    id: allTalkers[allTalkers.length - 1].id + 1,
    ...properties,
  };

  const allTalkersStringify = JSON.stringify([...allTalkers, addTalker], null, 2);
  await fs.writeFile(talkersPath, allTalkersStringify);

  res.status(201).json({ ...addTalker });
});

module.exports = router;