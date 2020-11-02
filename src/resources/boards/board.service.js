const boardsRepo = require('./board.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();

const create = board => boardsRepo.create(board);

const get = id => boardsRepo.get(id);

const update = (id, board) => boardsRepo.update(id, board);

const remove = async id => {
  await taskService.deleteByBoard(id);
  return boardsRepo.remove(id);
};

module.exports = { getAll, create, get, update, remove };
