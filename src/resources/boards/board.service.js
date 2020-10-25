const boardsRepo = require('./board.db.repository');
const taskService = require('../tasks/task.sevice');

const getAll = () => boardsRepo.getAll();

const get = id => boardsRepo.get(id);

const remove = async id => {
  const tasks = await taskService.getByBoardID(id);

  if (tasks) {
    taskService.removeAll(tasks.map(task => task.id));
  }

  return boardsRepo.remove(id);
};

const save = board => boardsRepo.save(board);

const update = (id, board) => boardsRepo.update(id, board);

module.exports = { getAll, get, remove, save, update };
