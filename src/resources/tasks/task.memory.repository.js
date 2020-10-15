const DB = require('../../common/dataBase');
const TASK_NAME = 'Tasks';

const getAll = async () => DB.getAllEntities(TASK_NAME);

module.exports = { getAll };
