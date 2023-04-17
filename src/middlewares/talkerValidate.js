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

  next();
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

  next();
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

  next();
};

const talkValidate = (req, res, next) => {
  const { talk } = req.body;

  if (!talk) {
 return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' }); 
}

  next();
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

  next();
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

  next();
};

const rateRouteValidate = (req, res, next) => {
  const { rate } = req.body;
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

  next();
};

const rateQueryValidate = (req, res, next) => {
  const { rate } = req.query;
  const rateToNumber = Number(rate);

  if (rate && (!Number.isInteger(rateToNumber) || rateToNumber < 1 || rateToNumber > 5)) {
    return res.status(400)
      .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  next();
};

const dateQueryValidate = (req, res, next) => {
  const { date } = req.query;
  const regexDate = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

  if (date && !regexDate.test(date)) {
    return res.status(400)
      .json({ message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }

  next();
};

module.exports = {
  tokenValidate,
  nameValidate,
  ageValidate,
  talkValidate,
  watchedAtValidate,
  rateValidate,
  rateQueryValidate,
  dateQueryValidate,
  rateRouteValidate,
};