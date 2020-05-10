const { celebrate, Segments, Joi } = require('celebrate');
const auth = require('./util/auth');

exports.createUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
});

exports.login = celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  })
});

exports.updateUser = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
});

exports.deleteUser = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
});


exports.createItem = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    done: Joi.string().required(),
  })
});

exports.updateItem = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }).unknown(),
});

exports.deleteItem = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    id: Joi.string().required(),
  }).unknown(),
});


exports.listItems = celebrate({
  [Segments.HEADERS]: Joi.object({ authorization: Joi.string().required() }).unknown(),
});

exports.auth = (req, res, next) => {
  const authorization = req.headers.authorization;

  const parts = authorization.split(' ');

  if (parts.length !== 2) return res.status(401).json({ error: "Token error" });

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) return res.status(401).json({ error: "Malformed token" });

  const decoded =  auth.verify(token);

  if (!decoded) return res.status(401).json({ error: "Invalid token" });

  req.userId = decoded.id;
  
  next();
}