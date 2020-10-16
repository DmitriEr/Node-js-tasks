const DB = require('../../common/dataBase');

const Type = 'Users';

const getAll = async () => DB.getAllEntities(Type);

const get = async id => {
  const user = DB.getEntity(Type, id);

  if (!user) {
    throw new Error(`User ${id} don't found`);
  }

  return user;
};

const remove = async id => {
  const user = await DB.removeEntity(Type, id);

  if (!user) {
    throw new Error(`User ${id} don't found`);
  }

  return true;
};

const create = async user => DB.createEntity(Type, user);

const update = async (id, user) => {
  const dataUser = await DB.updateEntity(Type, id, user);

  if (!dataUser) {
    throw new Error(`User ${id} doesn't exist`);
  }

  return user;
};

module.exports = { getAll, get, remove, create, update };
