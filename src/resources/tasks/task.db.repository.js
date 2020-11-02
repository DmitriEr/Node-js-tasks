const Task = require('./task.model');

const getAll = () => Task.find({});

const get = async boardId => Task.find({ boardId });

const getByBoard = async (boardId, taskId) => Task.findOne({ _id: taskId });

const create = async (boardId, task) => {
  task.boardId = boardId;
  return Task.create(task);
};

const deleteByBoard = async boardId =>
  (await Task.deleteMany({ boardId })).deletedCount;

const update = async (boardId, taskId, data) =>
  Task.updateOne({ _id: taskId }, data);

const remove = async taskId =>
  (await Task.deleteOne({ _id: taskId })).deletedCount;

const deleteUsers = async userId => {
  return Task.updateMany({ userId }, { userId: null });
};

module.exports = {
  get,
  create,
  getAll,
  getByBoard,
  deleteByBoard,
  update,
  remove,
  deleteUsers
};
