const User = require('./user.model');

const getAll = () => User.find({});

const get = async id => User.findOne({ _id: id });

const create = async user => User.create(user);

const update = async (id, user) => User.updateOne({ _id: id }, user);

const remove = async id => (await User.deleteOne({ _id: id })).deletedCount;

const getPasswordByUser = async (login, password) =>
  User.findOne({ login, password });

const postLogin = async ({ login, password }) => {
  const user = await User.findOne({ login });

  if (!user) {
    return { status: 403, result: 'No user exist' };
  }

  const compare = User.comparePassword(password, user);

  if (!compare) {
    return { status: 400, result: 'Invalid login or password' };
  }

  const token = User.generateAuthToken(user);

  return { status: 200, result: { token } };
};

module.exports = {
  getAll,
  create,
  get,
  update,
  remove,
  getPasswordByUser,
  postLogin
};
