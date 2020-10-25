const router = require('express').Router();
const { toResponse, Task } = require('./task.model');
const tasksService = require('./task.sevice');

router.route('/').get(async (req, res) => {
  try {
    const tasks = await tasksService.getAll();
    res.status(200).json(tasks.map(toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const task = await tasksService.get(req.params.id);
    res.status(200).json(toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const boardId = await req.boardId;
    const newTask = await tasksService.save(new Task({ ...req.body, boardId }));
    res.status(200).json(toResponse(newTask));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const task = await tasksService.update(req.params.id, req.body);
    res.status(200).json(toResponse(task));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await tasksService.remove(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
