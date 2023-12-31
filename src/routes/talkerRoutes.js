const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const getTalkers = require('../utils/getTalkers');
const { tokenValidate, 
  nameValidate, 
  ageValidate, 
  talkValidate, 
  watchedAtValidate, 
  rateValidate, 
  rateQueryValidate, 
  dateQueryValidate,
  rateRouteValidate } = require('../middlewares/talkerValidate');

const router = express.Router();
const talkersPath = path.resolve(__dirname, '../talker.json');

const errorMessage = { message: 'Pessoa palestrante não encontrada' };

// requirement 01
router.get('/', async (_req, res) => {
  const allTalkers = await getTalkers.getAll();
  res.status(200).json(allTalkers);
});

// requirement 11
router.patch('/rate/:id', tokenValidate, rateRouteValidate, async (req, res) => {
  const { rate } = req.body;
  const { id } = req.params;
  const allTalkers = await getTalkers.getAll();
  const findTalker = allTalkers.find((talker) => talker.id === Number(id));

  findTalker.talk.rate = rate;
  const updateTalkers = JSON.stringify([...allTalkers, findTalker], null, 2);
  await fs.writeFile(talkersPath, updateTalkers);

  return res.status(204).end();
});

// requirement 08
router.get('/search', tokenValidate, rateQueryValidate, dateQueryValidate, async (req, res) => {
  const { q, rate, date } = req.query;
  const allTalkers = await getTalkers.getAll();
  let filteredTalker = allTalkers;

  if (q) {
    filteredTalker = filteredTalker
      .filter((talker) => talker.name.toLowerCase().includes(q.toLowerCase()));
  }
  if (rate) {
    filteredTalker = filteredTalker
      .filter((talker) => talker.talk.rate === Number(rate));
  }
  if (date) {
    filteredTalker = filteredTalker
      .filter((talker) => talker.talk.watchedAt === date);
  }
  return res.status(200).json(filteredTalker);
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

// requirement 06
router.put('/:id', tokenValidate, 
  nameValidate, ageValidate, talkValidate, watchedAtValidate, rateValidate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const allTalkers = await getTalkers.getAll();

  const index = allTalkers.findIndex((talker) => talker.id === Number(id));

  // Como o método findIndex retorna -1 caso não ache o índice do primeiro array 
  // que contenha o mesmo id passado por parâmetro, é feita a condicional nesse ponto para retornar o status de erro 404.
  if (index === -1) {
    return res.status(404).json(errorMessage);
  }

  allTalkers[index] = { ...allTalkers[index], name, age, talk: { watchedAt, rate } };
  const updateTalkers = JSON.stringify(allTalkers, null, 2);
  await fs.writeFile(talkersPath, updateTalkers);

  return res.status(200).json(allTalkers[index]);
});

// requirement 07
router.delete('/:id', tokenValidate, async (req, res) => {
  const { id } = req.params;
  const allTalkers = await getTalkers.getAll();

  const filteredTalkers = allTalkers.filter((talker) => talker.id !== Number(id));
  const updateTalkers = JSON.stringify(filteredTalkers, null, 2);
  await fs.writeFile(talkersPath, updateTalkers);

  res.status(204).end();
});

module.exports = router;