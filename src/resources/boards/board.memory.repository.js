const DB = require('../../common/dataBase');
const BOARD_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(BOARD_NAME);

const get = async id => DB.getEntity(BOARD_NAME, id);

const create = async board => DB.createEntity(BOARD_NAME, board);

const update = async (id, board) => DB.updateEntity(BOARD_NAME, id, board);

const remove = async id => DB.removeEntity(BOARD_NAME, id);

module.exports = { getAll, get, create, remove, update };
