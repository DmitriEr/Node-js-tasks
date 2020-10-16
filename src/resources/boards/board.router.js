const router = require('express').Router();
const Board = require('./board.model');
const boardsService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/:id').get(async (req, res) => {
  try {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(Board.toResponse(board));
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.route('/').post(async (req, res) => {
  const board = await boardsService.create(
    new Board({
      id: req.body.id,
      title: req.body.title,
      columns: req.body.columns
    })
  );
  res.status(200).send(Board.toResponse(board));
});

module.exports = router;
