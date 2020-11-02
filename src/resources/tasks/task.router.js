const router = require('express').Router();
const taskService = require('./task.service');
const Task = require('./task.model');
const { catchErrors } = require('../middlewear/error-catch');

router.route('/:boardId/tasks').get(
  catchErrors(async (req, res) => {
    const tasks = await taskService.get(req.params.boardId);
    res.status(200).json(tasks.map(Task.toResponse));
  })
);

router.route('/:boardId/tasks/:taskId').get(
  catchErrors(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getByBoard(boardId, taskId);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      res.sendStatus(404);
    }
  })
);

router.route('/:boardId/tasks').post(
  catchErrors(async (req, res) => {
    const task = await taskService.create(req.params.boardId, req.body);
    res.json(Task.toResponse(task));
  })
);

router.route('/:boardId/tasks/:taskId').put(
  catchErrors(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.update(boardId, taskId, req.body);
    if (task) {
      res.status(200).json(Task.toResponse(task));
    } else {
      res.sendStatus(404);
    }
  })
);

router.route('/:boardId/tasks/:taskId').delete(
  catchErrors(async (req, res) => {
    const task = await taskService.remove(req.params.taskId);
    if (task) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
