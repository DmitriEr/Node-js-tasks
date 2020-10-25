const { Board } = require('./board.model');

const getAll = async () => Board.find({});

const get = async id => Board.findById(id);

const save = async board => Board.create(board);

const remove = async id => Board.deleteOne({ _id: id });

const update = async (id, board) => Board.updateOne({ _id: id }, board);

module.exports = { getAll, save, get, remove, update };
