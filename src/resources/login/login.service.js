const usersRepo = require('../users/user.db.repository');

const postUser = user => usersRepo.postLogin(user);

module.exports = { postUser };
