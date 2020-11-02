const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../middlewear/error-catch');

router.route('/').get(
  catchErrors(async (req, res) => {
    const users = await usersService.getAll();
    res.status(200).json(users.map(User.toResponse));
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const user = await usersService.get(req.params.id);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404);
    }
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(200).json(User.toResponse(user));
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const user = await usersService.update(req.params.id, req.body);
    if (user) {
      res.status(200).json(User.toResponse(user));
    } else {
      res.status(404);
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const user = await usersService.remove(req.params.id);
    if (user) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  })
);

module.exports = router;
