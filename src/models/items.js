const connection = require('../database/connections');

exports.list = async () => await connection('items').select('*');

exports.getAll = async conditions => await connection('items')
  .where(conditions).select('*');

exports.getOne = async conditions => await connection('items')
  .where(conditions).select('*').first();

exports.exists = async conditions => !! await this.getOne(conditions);

exports.create = async item => {

  if (
    !item.title ||
    !item.done ||
    !item.user_id ||
    await this.exists({ title: item.title })
  ) return false;

  return !!await connection('items').insert(item);
}

exports.update = async (id, item) => {
  return !!await connection('items').where({ id }).update(item);
}

exports.delete = async id => {
  return !!await connection('items').where({ id }).delete();
}