const DB = require('../../common/dataBase');

const Type = 'Tasks';

const getAll = async () => DB.getAllEntities(Type);

const get = async id => DB.getEntity(Type, id);

const remove = async id => {
  await DB.removeEntity(Type, id);
  return true;
};

const create = async task => DB.createEntity(Type, task);

const update = async (id, task) => DB.updateEntity(Type, id, task);

module.exports = { getAll, get, remove, create, update };
