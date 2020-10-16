const router = require('express').Router();
const Task = require('./task.model');
const tasksService = require('./task.sevice');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getByBoardID(req.boardId);
  res.json(tasks);
});

router.route('/:id').get(async (req, res) => {
  const task = await tasksService.get(req.params.id);
  if (task) {
    res.status(200).send(task);
  } else {
    res.sendStatus(404);
  }
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(
    new Task({ ...req.body, boardId: req.boardId })
  );
  res.status(200).send(task);
});

router.route('/:id').put(async (req, res) => {
  const task = await tasksService.updateOne(req.params.id, req.body);
  res.status(200).send(task);
});

router.route('/:id').delete(async (req, res) => {
  const taskId = await tasksService.removeOne(req.params.id);
  if (taskId) {
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

module.exports = router;
