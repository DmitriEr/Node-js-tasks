const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  try {
    const users = await usersService.getAll();
    res.status(200).json(users.map(toResponse));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').get(async (req, res) => {
  try {
    const user = await usersService.get(req.params.id);
    res.status(200).json(toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/').post(async (req, res) => {
  try {
    const user = await usersService.save(req.body);
    res.status(200).json(toResponse(user));
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').put(async (req, res) => {
  try {
    const user = await usersService.update(req.params.id, req.body);
    res.status(200).json(user);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

router.route('/:id').delete(async (req, res) => {
  try {
    await usersService.remove(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(404).send(e.message);
  }
});

module.exports = router;
