const usersRepo = require('./user.memory.repository');
const taskService = require('../tasks/task.sevice');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = async id => {
  const tasks = await taskService.getByUserID(id);

  if (tasks) {
    await taskService.updateAll(tasks, { userId: null });
  }

  return usersRepo.remove(id);
};

const create = user => usersRepo.create(user);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, create, update };
