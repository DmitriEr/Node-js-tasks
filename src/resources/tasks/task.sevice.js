const tasksRepo = require('./task.memory.repository');

const get = id => tasksRepo.get(id);

const getByUserID = async id => {
  const task = await tasksRepo.getAll();
  return task.filter(item => item.userId === id);
};

const getByBoardID = async id => {
  const task = await tasksRepo.getAll();
  return task.filter(item => item.boardId === id);
};

const create = task => tasksRepo.create(task);

const updateOne = (id, task) => tasksRepo.update(id, task);

const updateAll = (tasks, data) => {
  tasks.forEach(task => {
    const newTask = { ...task, ...data };
    tasksRepo.update(task.id, newTask);
  });
};

const removeOne = id => tasksRepo.remove(id);

const removeAll = arrId => arrId.forEach(id => tasksRepo.remove(id));

module.exports = {
  get,
  getByUserID,
  getByBoardID,
  create,
  updateOne,
  updateAll,
  removeOne,
  removeAll
};
