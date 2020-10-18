const Board = require('../resources/boards/board.model');
const User = require('../resources/users/user.model');
const Task = require('../resources/tasks/task.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

DB.Users.push(new User());
DB.Boards.push(new Board());
DB.Tasks.push(new Task());

const getAllEntities = type => DB[type];

const getEntity = (type, id) => DB[type].find(entity => entity.id === id);

const removeEntity = (type, id) => {
  const newEntities = DB[type].filter(entity => entity.id !== id);

  if (newEntities.length < DB[type].length) {
    DB[type] = newEntities;
    return true;
  }
  return false;
};

const createEntity = (type, entity) => {
  DB[type].push(entity);
  return entity;
};

const updateEntity = (type, id, data) => {
  const result = DB[type].find(entity => entity.id === id);
  if (!result) {
    return;
  }
  const newEntity = { ...result, ...data };
  const newEntities = DB[type].filter(entity => entity.id !== id);
  newEntities.push(newEntity);
  DB[type] = newEntities;
  return newEntity;
};

module.exports = {
  getAllEntities,
  getEntity,
  removeEntity,
  createEntity,
  updateEntity
};
