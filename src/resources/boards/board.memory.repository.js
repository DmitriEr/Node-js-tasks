const DB = require('../../common/dataBase');

const Type = 'Boards';

const getAll = async () => DB.getAllEntities(Type);

const get = async id => DB.getEntity(Type, id);

const remove = async id => DB.removeEntity(Type, id);

const create = async board => DB.createEntity(Type, board);

const update = async (id, board) => {
  await DB.updateEntity(Type, id, board);
  return board;
};

module.exports = { getAll, get, remove, create, update };
