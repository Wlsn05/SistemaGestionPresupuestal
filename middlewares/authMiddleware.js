const jwt = require('jsonwebtoken');

const autenticacionJWT = (req, res, next) => {
  const token = req.headers['authorization'] || '';
  try {
    req.user = jwt.verify(token, 'clave_secreta');
  } catch (e) {
    req.user = null;
  }
  next();
};

module.exports = autenticacionJWT;
