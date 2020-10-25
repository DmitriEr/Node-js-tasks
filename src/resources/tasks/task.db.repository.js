const { Task } = require('./task.model');

const getAll = async () => Task.find({});

const get = async id => Task.findById(id);

const save = async board => Task.create(board);

const remove = async id => Task.deleteOne({ _id: id });

const update = async (id, task) => Task.updateOne({ _id: id }, task);

module.exports = { getAll, get, save, remove, update };
