const auth = require('../util/auth');
const pw = require('../util/password');
const model = require('../models/users');

exports.create = async (req, res) => {
  const created = await model.create({
    name: req.body.name,
    email: req.body.email,
    password: await pw.hash(req.body.password)
  });

  if (!created) return res.status(400).json({ error: "Invalid or existing user" });

  return res.status(201).json({ message: "User created" });
}

exports.login = async (req, res) => {
  const user = await model.getOne({ email: req.body.email });

  if (!user) return res.status(400).json({ error: "User not found" });

  if (!await pw.compare(req.body.password, user.password))
    return res.status(400).json({ error: "Invalid password" });

  user.password = undefined;

  return res.status(200).json({ user, token: auth.sign({ id: user.id }) });
}

exports.update = async (req, res) => {
  if (
    !req.body.name ||
    !req.body.email ||
    !req.body.password
  ) return res.status(400).json({ error: 'Invalid information provided' });

  if (req.body.email) {
    const user = await model.getOne({ email: req.body.email });

    if (user && user.id !== req.userId)
      return res.status(400).json({ error: 'Email already in use' });
  }

  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: (!!req.body.password) && await pw.hash(req.body.password),
  }

  const updated = model.update(req.userId, newUser);

  if (!updated) return res.status(400).json({ error: 'Could not update user' });

  return res.status(200).json({ message: 'User updated' });
}

exports.delete = async (req, res) => {
  const deleted = model.delete(req.userId);

  if (!deleted) return res.status(500).json({ error: 'Could not delete user' });

  return res.status(200).json({ message: 'User deleted' });
}