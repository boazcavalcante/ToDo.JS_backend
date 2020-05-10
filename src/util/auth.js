const jwt = require('jsonwebtoken');
const auth = require('./auth.json');

module.exports.sign = data =>
  jwt.sign(data, auth.secret, { expiresIn: 86400 });

module.exports.verify = token =>
  jwt.verify(token, auth.secret, (err, decoded) => err ? 0 : decoded);