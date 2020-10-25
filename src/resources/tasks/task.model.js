const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'tasks', versionKey: false }
);

const toResponse = task => {
  const { id, title, order, description, columnId, userId, boardId } = task;
  return { id, title, order, description, columnId, userId, boardId };
};

module.exports = {
  Task: mongoose.model('tasks', Task),
  toResponse
};
