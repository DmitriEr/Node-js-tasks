const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Boards.push(new Board());
DB.Boards.push(new User());

const getAllEntities = type => DB[type];

const getEntity = (type, id) => DB[type].find(item => item.id === id);

const removeEntity = (type, id) => {
  const newEntities = DB[type].filter(item => item.id !== id);

  if (newEntities.length < DB[type].length) {
    DB[type] = newEntities;
  }
};

const createEntity = (type, entity) => {
  DB[type].push(entity);
  return entity;
};

const updateEntity = (type, id, data) => {
  const result = DB[type].find(item => item.id === id);

  if (!result) {
    throw new Error("User don't update");
  }

  const entity = { ...result, ...data };
  const entities = DB[type].filter(item => item.id !== id);
  entities.push(entity);
  DB[type] = entities;
  return entity;
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  createEntity,
  updateEntity
};
