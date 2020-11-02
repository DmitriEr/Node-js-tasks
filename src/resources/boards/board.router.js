const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const { catchErrors } = require('../middlewear/error-catch');

router.route('/').get(
  catchErrors(async (req, res) => {
    const boards = await boardsService.getAll();
    res.status(200).json(boards.map(Board.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      res.sendStatus(404);
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const board = await boardsService.create(req.body);
    res.status(200).json(Board.toResponse(board));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    if (board) {
      res.status(200).json(Board.toResponse(board));
    } else {
      res.sendStatus(404);
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    if (await boardsService.remove(req.params.id)) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
