const Board = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => Board.findOne({ _id: id });

const create = async board => Board.create(board);

const update = async (id, board) => Board.updateOne({ _id: id }, board);

const remove = async id => (await Board.deleteOne({ _id: id })).deletedCount;

module.exports = { getAll, get, create, update, remove };
