const emailValidate = (req, res, next) => {
  const { email } = req.body;
  const emailRegex = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

  if (!email) {
 return res.status(400)
    .json({ message: 'O campo "email" é obrigatório' }); 
}

  if (!emailRegex.test(email)) {
 return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' }); 
}

  return next();
};

module.exports = emailValidate;