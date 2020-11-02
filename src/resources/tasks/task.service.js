const taskRepo = require('./task.db.repository');

const get = boardId => taskRepo.get(boardId);

const getAll = () => taskRepo.getAll();

const getByBoard = (boardId, taskId) => taskRepo.getByBoard(boardId, taskId);

const create = (boardId, task) => taskRepo.create(boardId, task);

const deleteByBoard = boardId => taskRepo.deleteByBoard(boardId);

const update = (boardId, taskId, data) =>
  taskRepo.update(boardId, taskId, data);

const remove = taskId => taskRepo.remove(taskId);

const deleteUsers = userId => taskRepo.deleteUsers(userId);

module.exports = {
  get,
  getAll,
  getByBoard,
  create,
  deleteByBoard,
  update,
  remove,
  deleteUsers
};
