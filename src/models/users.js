const connection = require('../database/connections');
const uniqueId = require('../util/uniqueId');

exports.list = async () => await connection('users').select('*');

exports.getAll = async conditions => await connection('users')
  .where(conditions).select('*');

exports.getOne = async conditions => await connection('users')
  .where(conditions).select('*').first();

exports.exists = async conditions => !! await this.getOne(conditions);

exports.create = async user => {

  if (
    !user.name ||
    !user.email ||
    !user.password ||
    await this.exists({ email: user.email })
  ) return false;

  user.id = uniqueId();

  return !!await connection('users').insert(user);
}

exports.update = async (id, user) => {
  return !!await connection('users').where({ id }).update(user);
}

exports.delete = async id => {
  return !!await connection('users').where({ id }).delete();
}