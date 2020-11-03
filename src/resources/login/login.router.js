const router = require('express').Router();
const loginService = require('./login.service');

router.route('/').post(async (req, res) => {
  const user = await loginService.postUser(req.body);
  res.status(user.status).json(user.result);
});

module.exports = router;
