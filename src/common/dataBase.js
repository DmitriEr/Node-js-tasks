const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

const getAllEntities = type => DB[type];

const getEntity = (type, id) => DB[type].find(item => item.id === id);

const removeEntity = (type, id) => {
  const newEntities = DB[type].filter(item => item.id !== id);

  if (newEntities.length < DB[type].length) {
    DB[type] = newEntities;
  }
};

const saveEntity = (type, entity) => {
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
  saveEntity,
  updateEntity
};
