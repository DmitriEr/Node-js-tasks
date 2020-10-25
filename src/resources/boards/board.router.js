const router = require('express').Router();
const { toResponse } = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  try {
    const boards = await boardsService.getAll();
    res.status(200).json(boards);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).json(toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const board = await boardsService.save(req.body);
    res.status(200).send(toResponse(board));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).send(board);
  } catch (e) {
    res.status(404).send(e.messgae);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await boardsService.remove(req.params.id);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(404);
  }
});

module.exports = router;
