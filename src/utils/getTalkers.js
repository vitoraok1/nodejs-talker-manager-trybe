const fs = require('fs').promises;
const { join } = require('path');

const readData = async () => {
  const dir = '../talker.json';

  try {
    const content = await fs.readFile(join(__dirname, dir), 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    return null;
  }
};

// requirement 01
const getAll = async () => {
  const allTalkers = await readData();

  if (allTalkers === null) {
    return [];
  }
  return allTalkers;
};

// requirement 02
const getById = async (id) => {
  const allTalkers = await readData();
  const chosenTalker = allTalkers.find((talker) => talker.id === id);

  return chosenTalker;
};

module.exports = {
  getAll,
  getById,
};