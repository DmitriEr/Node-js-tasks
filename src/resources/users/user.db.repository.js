const User = require('./user.model');

const getAll = () => User.find({});

const get = async id => User.findOne({ _id: id });

const create = async user => User.create(user);

const update = async (id, user) => User.updateOne({ _id: id }, user);

const remove = async id => (await User.deleteOne({ _id: id })).deletedCount;

const getPasswordByUser = async (login, password) =>
  User.findOne({ login, password });

module.exports = { getAll, create, get, update, remove, getPasswordByUser };
