const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'boards', versionKey: false }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = {
  Board: mongoose.model('boards', Board),
  toResponse
};
