const tokenValidate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
 return res.status(401)
    .json({ message: 'Token não encontrado' }); 
}
  
  if (authorization.length !== 16 || !typeof authorization === 'string') {
 return res.status(401)
    .json({ message: 'Token inválido' }); 
}

  return next();
};

const nameValidate = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
 return res.status(400)
    .json({ message: 'O campo "name" é obrigatório' }); 
}
  
  if (name.length < 3) {
 return res.status(400)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' }); 
}

  return next();
};

const ageValidate = (req, res, next) => {
  const { age } = req.body;

  if (!age) {
 return res.status(400)
    .json({ message: 'O campo "age" é obrigatório' }); 
}
  
  if (typeof age !== 'number' || age < 18 || !Number.isInteger(age)) {
 return res.status(400)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' }); 
}

  return next();
};

const talkValidate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
 return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' }); 
}

  return next();
};

const watchedAtValidate = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (!watchedAt) {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' }); 
}
  
  if (!dateRegex.test(watchedAt)) {
 return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' }); 
}

  return next();
};

const rateValidate = (req, res, next) => {
  const { talk: { rate } } = req.body;
  const min = 1;
  const max = 5;

  if (rate === undefined) {
 return res.status(400)
    .json({ message: 'O campo "rate" é obrigatório' }); 
}
  
  if (!Number.isInteger(rate) || rate < min || rate > max) {
 return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' }); 
}

  return next();
};

module.exports = {
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
};