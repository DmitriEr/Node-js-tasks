const DB = require('../../common/dataBase');
const BOARD_NAME = 'Boards';

const getAll = async () => DB.getAllEntities(BOARD_NAME);

module.exports = { getAll };
