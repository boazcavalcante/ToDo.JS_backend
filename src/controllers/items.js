const model = require('../models/items');

exports.create = async (req, res) => {

  const created = await model.create({
    title: req.body.title,
    done: req.body.done,
    user_id: req.userId
  });

  if (!created) return res.status(400).json({ error: "Invalid or existing item" });

  return res.status(201).json({ message: "Item created" });
}

exports.update = async (req, res) => {
  if (!req.body.id || (!req.body.title && !req.body.done))
    return res.status(400).json({ error: 'Invalid information provided' });

  if (req.body.title) {
    const item = await model.getOne({ title: req.body.title, user_id: req.userId });

    if (item) return res.status(400).json({ error: 'Title already in use' });
  }

  const newItem = {
    title: req.body.title,
    done: req.body.done,
  }

  const updated = await model.update(req.body.id, newItem);

  if (!updated) return res.status(400).json({ error: 'Could not update item' });

  return res.status(200).json({ message: 'Item updated' });
}

exports.delete = async (req, res) => {
  const deleted = await model.delete(req.body.id);

  if (!deleted) return res.status(500).json({ error: 'Could not delete item' });

  return res.status(200).json({ message: 'Item deleted' });
}

exports.list = async (req, res) => {
  const list = await model.getAll({ user_id: req.userId });

  if (!list) return res.status(500).json({ error: 'Could not list items' });

  return res.status(200).json({ items: list });
}