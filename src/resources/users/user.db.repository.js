const { User } = require('./user.model');

const getAll = async () => User.find({});

const get = async id => User.findById(id);

const save = async user => User.create(user);

const remove = async id => User.deleteOne({ _id: id });

const update = async (id, user) => User.updateOne({ _id: id }, user);

module.exports = { getAll, save, get, remove, update };
