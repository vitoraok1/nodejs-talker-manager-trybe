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

const passwordValidate = (req, res, next) => {
  const { password } = req.body;

  if (!password) {
 return res.status(400)
    .json({ message: 'O campo "password" é obrigatório' }); 
}
  
  if (password.length < 6) {
 return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' }); 
}

  return next();
};

module.exports = {
  emailValidate,
  passwordValidate,
};