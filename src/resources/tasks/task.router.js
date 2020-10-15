const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.sevice');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll();
  res.json(tasks.map(Task.toResponse));
});

module.exports = router;
