const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.sevice');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const remove = async id => {
  const tasks = await taskService.getByUserID(id);

  if (tasks) {
    await taskService.removeAll(tasks, { userId: null });
  }

  return usersRepo.remove(id);
};

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

module.exports = { getAll, get, remove, save, update };
