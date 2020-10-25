const tasksRepo = require('./task.db.repository');

const getAll = () => tasksRepo.getAll();

const getByUserID = async id => {
  const task = await tasksRepo.getAll();
  return task.filter(item => item.userId === id);
};

const getByBoardID = async id => {
  const task = await tasksRepo.getAll();
  return task.filter(item => item.boardId === id);
};

const updateAll = (tasks, data) => {
  tasks.forEach(task => {
    const newTask = { ...task, ...data };
    tasksRepo.update(task.id, newTask);
  });
};

const removeAll = arrId => arrId.forEach(id => tasksRepo.remove(id));

const get = id => tasksRepo.get(id);

const save = board => tasksRepo.save(board);

const update = (id, task) => tasksRepo.update(id, task);

const remove = id => tasksRepo.remove(id);

module.exports = {
  getAll,
  get,
  save,
  update,
  remove,
  getByUserID,
  updateAll,
  getByBoardID,
  removeAll
};
