const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const create = user => usersRepo.create(user);

const get = id => usersRepo.get(id);

const update = (id, data) => usersRepo.update(id, data);

const remove = async id => {
  await taskService.deleteUsers(id);
  return usersRepo.remove(id);
};

module.exports = { getAll, create, get, update, remove };
