const DB = require('../../common/dataBase');
const USER_NAME = 'Users';

const getAll = async () => DB.getAllEntities(USER_NAME);

const get = async id => {
  const user = DB.getEntity(USER_NAME, id);
  if (!user) {
    console.error(`User ${id} doesn't exist`);
    return false;
  }
  return user;
};

const remove = async id => {
  if (!(await DB.removeEntity(USER_NAME, id))) {
    console.error(`User ${id} doesn't exist`);
    return false;
  }
  return true;
};

const create = async user => DB.createEntity(USER_NAME, user);

const update = async (id, user) => {
  const entity = await DB.updateEntity(USER_NAME, id, user);
  if (!entity) {
    throw new Error(`User ${id} doesn't exist`);
  }
  return user;
};

module.exports = { getAll, get, remove, create, update };
